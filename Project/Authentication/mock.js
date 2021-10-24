const express = require('express');
const cryptico = require('cryptico');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/test', (req, res) => {
	const port = req.query.port;
	const key = cryptico.generateRSAKey(req.body['secret'], 2048);

	const pubKey = cryptico.publicKeyString(key)
	console.log(`\nPublic key:\n${pubKey}`);
	var response = axios.get(`http://localhost:${port}/verify`, {params: {pubKey: pubKey}})
		.then(result => {
			var ErString = result.data.ErString;
			var decrypt_result = cryptico.decrypt(ErString, key);
			var rString;
			if (decrypt_result) {
				rString = decrypt_result.plaintext;
			}else {
				res.status(500).send(`Failed to decrypt ErString`);
			}
			var response2 = axios.get(`http://localhost:${port}/prove`, {params: {pubKey: pubKey, proof: rString}})
				.then(result2 => {
					console.log(`successfully verified self`);
					res.sendStatus(200);
				}).catch(error => {
					console.log(`proof error`);
					res.sendStatus(500);
				});
		}).catch(error => {
			console.log(`verification ${error}`);
			res.sendStatus(500);
		});
});

app.listen(6000, () => {
	console.log('stubs running');
});