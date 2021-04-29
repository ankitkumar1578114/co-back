const router = require("express").Router();
const medicine = require("../../models/medicine");

router.get("/list/:medicine_name", (req, res) => {
    const medicine_name = typeof req.params.medicine_name === 'string' ? req.params.medicine_name: "null";

    medicine.find({medicineName: medicine_name}).lean().exec()
                .then(docs => {
                    console.log(`Recieved ${docs.length} medicines named ${medicine_name}`);

                    res.setHeader("Content-Type", "application/json;charset=utf-8");
                    return res.status(200).send(docs);
                })
                .catch(err => {
                    console.error("Medicine list", err);

                    return res.sendStatus(500);
                })
})

router.get("/list", (_, res) => {
    medicine.find({}).lean().exec()
                .then(docs => {
                    console.log(`Recieved TOTAL ${docs.length} medicines`);

                    return res.send(docs);
                })
                .catch(err => {
                    console.error("List medicine", err);

                    return res.sendStatus(500);
                })
})

router.post("/new", (req, res) => {
    const medicine_details = {
        medicineName: req.body.name || req.body.medicineName,
        quantity: req.body.quantity,
        pharmaAddress: req.body.pharmaAddress,
        pharmaContact: req.body.pharmaContact,
        city: req.body.city
    }

    medicine.create(medicine_details)
                .then(doc => {
                    console.log("Created entry for medicine: ", medicine_details);

                    return res.sendStatus(204);
                })
                .catch(err => {
                    console.error("New medicine", err);

                    return res.sendStatus(500);
                })
})

module.exports = router;
