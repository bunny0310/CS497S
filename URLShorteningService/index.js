const express = require("express");
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const longToShort = new Map();
const shortToLong = new Map();

app.post('/shorten', (req, res, next) => {
    try {
        const body = req.body;
        const url = body['url'];
        let hash = "";
        if (longToShort.has(url)) {
            hash = longToShort.get(url);
        }
        else {
            const existingHashes = new Set(shortToLong.keys());
            if (body['hash'] == undefined) {
                do {
                    const consumer = body['url'] + Date.now();
                    hash = crypto.createHash('md5').update(consumer).digest('base64').substring(0, 7);
                } while (existingHashes.has(hash));
            } else {
                if (existingHashes.has(body['hash'])) {
                    return res.status(400).json({"msg": "hash already exists", "data": null});
                }
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

app.get('/:hash', (req, res, next) => {
    const hash = req.params['hash'];
    if (hash == undefined || !new Set(shortToLong.keys()).has(hash)) {
        return res.status(400).json({"msg": "hash not found or is not provided"});
    }
    res.redirect(shortToLong.get(hash));
});

app.listen(5000, '0.0.0.0', () => {
    console.log('running');
})
