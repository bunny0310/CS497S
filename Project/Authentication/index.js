const express = require('express');
const cryptico = require('cryptico');
const crypto = require('crypto');
const { reset } = require('nodemon');

const app = express();
let keyStrings = {}

function gRString(length) { // Generate a cryptographically random string of length bytes
	return crypto.randomBytes(length).toString('ascii');
}

app.get('/verify', (req, res) => {
	console.log('verify starting') // TODO Delete since only for debugging
	if (!('pubKey' in req.query)) {
		res.status(400).send(`Please provide 'pubKey'`);
	} else {
		let pubKey = req.query.pubKey // Just to make things shorter
		let rString = gRString(256 - 11); // Max message size based on 2048 bit (256 byte) RSA with 11 byte headers
		keyStrings.pubKey = rString; // Save the key pair for later verification
		let ErString = cryptico.encrypt(rString, pubKey).cipher // Encrypt the random string using the client provided pubKey
		if (ErString) { // Encryption didn't fail
			res.status(201).send({'ErString': ErString});
		}else {
			res.sendStatus(500);
		}
	}
});

app.get('/prove', (req,res) => {
	if (!('pubKey' in req.query)) {
		res.status(400).send(`Please provide 'pubKey'`);
	} else if (!('proof' in req.query)) {
		res.status(400).send(`Please provide your 'proof'`);
	}
	// else if (!('hash' in req.query)) {
	// 	res.send(`Please provide the 100th hash of your private key`, 400);
	// }  // TODO
	else {
		let pubKey = req.query.pubKey // Just to make things shorter
		let DrString1  = req.query.proof // Decryption of client provided proof that may equal saved rString
		if (!(keyStrings.pubKey)) {
			res.send(`Either your verification request expired or was never created`, 400);
			return;
		} 
		if (keyStrings.pubKey === DrString1){
			res.sendStatus(201);
		} else {
			res.sendStatus(401);
			// delete keyStrings.pubKey; // TODO uncomment this; it's only commented for debugging
		}
	}
});

app.listen(5000, () => {
	console.log('running');
});