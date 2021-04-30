const router = require("express").Router();
const supplier = require("../../models/supplier");

router.post('/new', function (req, res) {
    let obj = req.body.obj;
    console.log(obj)
    // {nameOfSupplier:"ankit Kumar",addressOfSupplier:"kabir Nagar",contact:"454",rate:45 ,maxSupply:45 }
    const data = new supplier(obj)
    data.save(function (err, data) {
        if (err) return res.send(err)
        else { res.send("Success") }
    })
})

router.get('/list', function (req, res) {
    // {nameOfSupplier:"ankit Kumar",addressOfSupplier:"kabir Nagar",contact:"454",rate:45 ,maxSupply:45 }
    supplier.find({}, function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
})

module.exports = router;
