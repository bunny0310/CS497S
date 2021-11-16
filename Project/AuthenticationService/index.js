const express = require('express');
const cryptico = require('cryptico');
const crypto = require('crypto');

const app = express();
let keyStrings = {};
let oneTimes = {};

function genRandString(length) { // Generate a cryptographically random string of length bytes
	return crypto.randomBytes(length).toString('ascii');
}

function verifyHash(res, pubKey, hash) {
	if (!(oneTimes.pubKey)) return res.status(401).json({'msg': 'Could not find pubKey, relogin using /login then /prove'});
	if (oneTimes.pubKey.T < 1) return res.status(401).json({'msg': 'Please relogin using /login and /prove'});

	let Hhash = crypto.createHash('sha256').update(hash).digest('ascii'); // Hash of given hash
	if (Hhash === oneTimes.pubKey.hash) {
		oneTimes.pubKey.T--; // Decrease number of one time passcodes remaining
		oneTimes.pubKey.hash = hash; // Save this new hash as what's required for the next hash
		res.sendStatus(200);
		if (oneTimes.pubKey.T < 1) delete oneTimes.pubKey;
		return;
	} else {
		res.sendStatus(401).json({'msg': 'Hash of hash did not match record'});
		return delete oneTimes.pubKey; // Force re-login
	}
}

app.get('/login', (req, res) => {
	let date = new Date();
	let start = date.getTime();
	if (!('pubKey' in req.query)) return res.status(400).json({'msg': `Please provide 'pubKey'`});

	let pubKey = req.query.pubKey // Just to make things shorter/cleaner
	let rString = genRandString(256 - 11); // Max message size based on 2048 bit (256 byte) RSA with 11 byte headers
	keyStrings.pubKey = rString; // Save the key pair for later verification
	let EncrRandString = cryptico.encrypt(rString, pubKey).cipher // Encrypted the random string using the client provided pubKey
	if (EncrRandString) { // Encryption didn't fail
		return res.status(200).json({'EncrRandString': EncrRandString});
	}else {
		return res.sendStatus(500);
	}
});

app.get('/prove', (req,res) => {
	if (!('pubKey' in req.query)) return res.status(400).json({'msg': `Please provide 'pubKey'`});
	if (!('proof' in req.query)) return res.status(400).json({'msg': `Please provide your 'proof'`});

	let pubKey = req.query.pubKey // Just to make things shorter
	let DrString1  = req.query.proof // Decryption of client provided proof that may equal saved rString
	if (!(keyStrings.pubKey)) return res.status(401).json({'msg': 'Either your verification request expired or was never created'});

	if (keyStrings.pubKey === DrString1){
		if (!(req.query.hash)) {
			res.status(400).json({'msg': 'Verified, but no hash for one time passwords provided'});
		}else{
			delete keyStrings.pubKey; // Delete to prevent random string reuse
			oneTimes.pubKey = {'T': 50, 'hash': req.query.hash}; // Save hash for later comparision
			return res.sendStatus(200);
		}
	} else {
		res.sendStatus(401);
		delete keyStrings.pubKey; // Delete the random string for this public key to prevent unlimited tries
	}
});

app.get('/auth', (req, res) => {
	const pubKey = req.query.pubKey;
	const hash = req.query.hash;
	if (!(pubKey)) return res.status(400).json({'msg': 'Please provide a pubKey'});
	if (!(hash)) return res.status(400).json({'msg': 'Please provide your one time hash'});	
	return verifyHash(res, pubKey, hash);
});

// app.post('/create', (req, res) => {
// 	const pubKey = req.query.pubKey;
// 	const sig = req.query.msg;
// 	if (!(pubKey)) return res.status(400).json({'msg': 'Please provide a pubKey'});
// 	if (!(sig)) return res.status(400).json({'msg': `{'sig': Signature} required`});
	
// 	let decryption = cryptico.decrypt(msg, pubKey);
// 	if (!(decryption.publicKeyString)) return res.status(401).json({'msg': 'msg was not signed'});
// 	if (decryption.publicKeyString == pubKey) return res.status(200);
// });

app.listen(5000, '0.0.0.0', () => {
	console.log('running');
});