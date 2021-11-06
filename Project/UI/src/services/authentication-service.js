import {
    generateRSAKey, 
    publicKeyString,
    decrypt,
 } from "cryptico";
import axios from  "axios";
 import {randomBytes, createHash} from "crypto";

 export const generateOneTimes = () => {
	let oneTimes = [];
	let hash = "";
	let randString = randomBytes(256).toString('ascii');
	for (let i = 0, hash = randString; i < 50; ++i) {
		hash = createHash('sha256').update(hash).digest('ascii');
		oneTimes.push(hash);
	}
	const myStorage = window.localStorage;
    const obj = {hashes: oneTimes};
    myStorage.setItem("locchat-hashes", JSON.stringify(obj));
}

export const createKey = (secret = "") => {
	const key = generateRSAKey(secret !== "" ? secret : crypto.randomBytes(256).toString('ascii'), 2048);
	const pubKey = publicKeyString(key);
    window.localStorage.setItem("locchat-pubKey", pubKey);
    window.localStorage.setItem("locchat-key", key);
}

export const login = () => {
    const storage = window.localStorage;
    const pubKey = localStorage.getItem("locchat-pubKey");
    const key = localStorage.getItem("locchat-key");
	if (!pubKey) {
        return false;
    }
	// console.log('initiating login with server by sending public key');
	var response = axios.get(`http://localhost/authentication_service/login`, {params: {pubKey: pubKey}})
		.then(result => {
			// console.log('received encrypted random string');
			var EncrRandString = result.data.EncrRandString;
			// console.log('Decrypting encrypted random string... this will prove that I own the public key');
			var decrypt_result = decrypt(EncrRandString, key);
			var rString;
			if (decrypt_result) {
				console.log('decrypted encrypted random string');
				rString = decrypt_result.plaintext;
			}else {
                return false;
			}
			// console.log('Hashing a cryptographically random string 50 times, and sending the 50th one to the server along with my proof');
			generateOneTimes();
            const hashes = storage.getItem('locchat-hashes');
            hashes = JSON.parse(hashes);
            const arr = hashes["hashes"];
            const hash = arr.pop();
			var response2 = axios.get(`http://localhost/authentication_service/prove`, {params: {pubKey: pubKey, proof: rString, hash: hash}})
				.then(result2 => {
					// console.log('Server accepted proof of identity and saved the hash corresponding to the chain of one-time passwords');
					return true;
				}).catch(error => {
					// console.log(`proof ${error}`);
					return false;
				});
		}).catch(error => {
			// console.log(`verification ${error}`);
			return false;
		});
        return false;
}

export const auth = () => {
    if (!isLoggedIn()) {
        return false;
    }
    const storage = window.localStorage;
    const pubKey = storage.getItem("locchat-pubKey");
    const hashes = storage.getItem('locchat-hashes');
    hashes = JSON.parse(hashes);
    const arr = hashes["hashes"];
    const hash = arr.pop();
	var response = axios.get(`http://localhost/authentication_service/auth`, {params: {pubKey: pubKey, hash: hash}})
		.then(result => {
			console.log('server verified my identity');
			return true;
		}).catch(error => {
			return false;
		});
    return false;
}

export const isLoggedIn = () => {
    const storage = window.localStorage;
    return storage.getItem("locchat-pubKey") !== null && storage.getItem("locchat-key") !== null && storage.getItem("locchat-hashes") !== null 
}