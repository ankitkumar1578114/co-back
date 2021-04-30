const hospital = require("../../models/hospital");

const router = require("express").Router();

router.get("/list/:city", (req, res) => {
    const city = req.params.city;

    hospital.find({city: city}).lean().exec()
            .then(docs => {
                console.log(`Total hospitals in ${city}: ${docs.length}`);

                res.setHeader("Content-Type", "application/json;charset=utf-8");
                return res.status(200).send(docs);
            })
            .catch(err => {
                console.error("Hospital list", err);

                return res.sendStatus(500);
        })
})

router.get("/list", (_, res) => {
    hospital.find({}).lean().exec()
            .then(docs => {
                console.log(`TOTAL hospitals: ${docs.length}`);

                return res.send(docs);
            })
            .catch(err => {
                console.error("Hospital list", err);

                return res.sendStatus(500);
        })
})

router.post("/new", (req, res) => {
    const hospital_details = {
        name: req.body.name,
        bedsAvailable: req.body.bedsAvailable,
        address: req.body.address,
        city: req.body.city
    }

    hospital.create(hospital_details)
                .then(_doc => {
                    console.log("Created entry for hospital: ", hospital_details);

                    return res.sendStatus(204);
                })
                .catch(err => {
                    console.error("/hospital/new", err);

                    return res.sendStatus(500);
                })
})

module.exports = router;
