const express = require('express');
const cryptico = require('cryptico');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

let oneTimePasswords = {};
let key = undefined;
let pubKey = undefined;

function generateOneTimes(){
	oneTimes = [];
	var hash = hash;
	let randString = crypto.randomBytes(256).toString('ascii');
	for (let i = 0, hash = randString; i < 50; ++i) {
		hash = crypto.createHash('sha256').update(hash).digest('ascii');
		oneTimes.push(hash);
	}
	return oneTimes;
}


app.post('/createKey', (req, res) => {
	if (req.body['secret']) {
		key = cryptico.generateRSAKey(req.body['secret'], 2048);
	} else {
		key = cryptico.generateRSAKey(crypto.randomBytes(256).toString('ascii'), 2048);
	}
	res.sendStatus(201);
	pubKey = cryptico.publicKeyString(key);
	console.log(`\nPublic key:\n${pubKey}`);
});

app.get('/login', (req, res) => {
	if (!key) return res.status(403).json({'msg': 'First generate a key using /createKey'});
	
	console.log('initiating login with server by sending public key');
	var response = axios.get(`http://localhost/authentication_service/login`, {params: {pubKey: pubKey}})
		.then(result => {
			console.log('received encrypted random string');
			var EncrRandString = result.data.EncrRandString;
			console.log('Decrypting encrypted random string... this will prove that I own the public key');
			var decrypt_result = cryptico.decrypt(EncrRandString, key);
			var rString;
			if (decrypt_result) {
				console.log('decrypted encrypted random string');
				rString = decrypt_result.plaintext;
			}else {
				res.status(500).send(`Failed to decrypt Encrypted Random String`);
				return;
			}
			console.log('Hashing a cryptographically random string 50 times, and sending the 50th one to the server along with my proof');
			oneTimePasswords.pubKey = generateOneTimes();
			var response2 = axios.get(`http://localhost/authentication_service/prove`, {params: {pubKey: pubKey, proof: rString, hash: oneTimePasswords.pubKey.pop()}})
				.then(result2 => {
					console.log('Server accepted proof of identity and saved the hash corresponding to the chain of one-time passwords');
					res.sendStatus(200);
				}).catch(error => {
					console.log(`proof ${error}`);
					res.sendStatus(500);
				});
		}).catch(error => {
			console.log(`verification ${error}`);
			res.sendStatus(500);
		});
});

app.get('/auth', (req, res) => {
	console.log('Sending a one time password that will hash into the server\'s stored password');
	var response = axios.get(`http://localhost/authentication_service/auth`, {params: {pubKey: pubKey, hash: oneTimePasswords.pubKey.pop()}})
		.then(result => {
			console.log('server verified my identity');
			res.sendStatus(200);
		}).catch(error => {
			res.status(500).send(error);
		});
});
	
// app.get('/create', (req, res) => {
// 	console.log('sending post to authorization service for signature verification');
// 	var response = axios.post(`http://localhost/authentication_service/create`, {'msg': cryptico.encrypt(crypto.createHash('sha256').update('a'), {params: {pubKey: pubKey}})
// 		.then(result => {
// 			console.log('server verified my identity');
// 			res.sendStatus(200);
// 		}).catch(error => {
// 			res.status(500).send(error);
// 		});
// });

app.listen(6000, () => {
	console.log('mock running');
});