import {
    generateRSAKey, 
    publicKeyString,
    decrypt,
 } from "cryptico";
import axios from  "axios";
 import {randomBytes, createHash} from "crypto";
import { baseUrl } from "./posts-webservice";

export const pubKeyName = "locchat-pubKey";
export const hashesName = "locchat-hashes";
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

export const createKey =  async (secret = "") => {
    return new Promise((resolve) => {
        const key =  generateRSAKey(secret !== "" ? secret : randomBytes(256).toString('ascii'), 2048);
        const pubKey = publicKeyString(key);
        window.localStorage.setItem(pubKeyName, pubKey);
        resolve(key);
    });
}

export const login = async () => {
    if (isLoggedIn()) {
        return true;
    }
    const storage = window.localStorage;
    const key = await createKey();
    const pubKey = storage.getItem(pubKeyName);
    // console.log('initiating login with server by sending public key');
    const result =  await axios.get(`http://${baseUrl}/authentication_service/login`, {params: {pubKey: pubKey}});
    // console.log('received encrypted random string');
    var EncrRandString = result.data.EncrRandString;
    // console.log('Decrypting encrypted random string... this will prove that I own the public key');
    var decrypt_result = decrypt(EncrRandString, key);
    var rString;
    if (decrypt_result) {
        // console.log('decrypted encrypted random string');
        rString = decrypt_result.plaintext;
    }else {
        throw new Error("Cannot decrypt the string");
    }
    // console.log('Hashing a cryptographically random string 50 times, and sending the 50th one to the server along with my proof');
    generateOneTimes();
    let hashes = storage.getItem(hashesName);
    hashes = JSON.parse(hashes);
    const arr = hashes["hashes"];
    const hash = arr.pop();
    try {
        await axios.get(`http://${baseUrl}/authentication_service/prove`, {params: {pubKey: pubKey, proof: rString, hash: hash}});
    }
    catch (err) {
        console.log(err);
        throw new Error(err);
    }
     return true;
}

export const auth = () => {
    if (!isLoggedIn()) {
        return false;
    }
    const storage = window.localStorage;
    const pubKey = storage.getItem(pubKeyName);
    const hashes = storage.getItem(hashesName);
    hashes = JSON.parse(hashes);
    const arr = hashes["hashes"];
    const hash = arr.pop();
	var response = axios.get(`http://${baseUrl}/authentication_service/auth`, {params: {pubKey: pubKey, hash: hash}})
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
    return storage.getItem(pubKeyName) !== null && storage.getItem(hashesName) !== null 
}

export const clearMemory = () => {
    const storage = window.localStorage;
    storage.removeItem(hashesName);
    storage.removeItem(pubKeyName);
}

export const getPublicKey = () => {
    const storage = window.localStorage;
    return storage.getItem(pubKeyName);
}