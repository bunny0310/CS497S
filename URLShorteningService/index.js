const express = require("express");

const app = express();

app.get('/', (req, res, next) => {
    return res.status(200).json({"msg": "working"});
})

app.listen(5000, () => {

})