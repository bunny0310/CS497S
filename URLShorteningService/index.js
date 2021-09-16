const express = require("express");
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const longToShort = new Map();
const shortToLong = new Map();

app.get('/', (req, res, next) => {
    return res.status(200).json({"msg": "working"});
})

app.post('/shorten', (req, res, next) => {
    try {
        const body = req.body;
        const url = body['url'];
        let hash = "";
        if (longToShort.has(url)) {
            hash = longToShort.get(url);
        }
        else {
            if (body['hash'] == undefined) {
            const existingHashes = new Set(shortToLong.keys());
            do {
                const consumer = body['url'] + Date.now();
                hash = crypto.createHash('sha256').update(consumer).digest('base64').substring(0, 7);
            } while (existingHashes.has(hash));
            } else {
                hash = body['hash'];
            }
            longToShort.set(body["url"], hash);
            shortToLong.set(hash, body["url"]);
        }
        return res.status(200).json({"msg": "success", "data": hash});
    } catch (err) {
        console.log(err);
        return res.status(500).json({"msg": err, "data": null});
    }
});

app.listen(5000, '0.0.0.0', () => {
    console.log('running');
})
