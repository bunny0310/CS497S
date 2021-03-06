const express = require("express");
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const longToShort = new Map();
const shortToLong = new Map();

app.post('/shorten', (req, res, next) => {
    try {
        const body = req.body;
        const httpsTest = /^https?:\/\//;
        const url = body['url'];
        if (!httpsTest.test(url)) {
            return res.status(400).json({'msg': 'Improperly formed request. Please prepend "https://" or "http://"', 'data': null})
        }
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
                } while (hash.includes('/') || existingHashes.has(hash));
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
        return res.status(400).json({"msg": "hash not found or is not provided", data: null});
    }
    res.status(200).json({"msg": "success", "data": shortToLong.get(hash)});
});

app.listen(5000, '0.0.0.0', () => {
    console.log('running');
})
