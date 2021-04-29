const router = require("express").Router();
const plasmaModel = require("../../models/plasma");

router.get("/list", (req, res) => {
    plasmaModel.find({documentType: "receiver"})
                    .then(docs => {
                        return res.send(docs);
                    })
                    .catch(err => {
                        console.error(err);
                        return res.sendStatus(500);
                    })
})

router.post("/new", (req, res) => {
    const receiver_details = {
        documentType: "receiver",
        name: req.body.name,
        contact: req.body.contact
    };

    plasmaModel.create(receiver_details)
                    .then(doc => {
                        console.log("Added new receiver: ", doc);
                        return res.sendStatus(204);
                    })
                    .catch(err => {
                        console.error(err);

                        return res.sendStatus(500);
                    })
})

module.exports = router;
