const router = require("express").Router();
const requestModel = require("../models/request");

// get list of all active requests
router.get('/list', (req, res) => {
    requestModel.find({}).exec()
                    .then(docs => {
                        return res.send(docs);
                    })
                    .catch(err => {
                        console.error(err);
                        return res.sendStatus(500);
                    })
})

// after request fulfilled, then the request will need to be removed
router.delete('/remove/:req_id', (req, res) => {
    const id = req.params.req_id;

    requestModel.findByIdAndDelete(id)
        .then(doc => {
            console.log(`Deleted request id: ${id} successfully`);
            return res.sendStatus(204);
        })
        .catch(err => {
            console.error(err);
            return res.sendStatus(500);
        })
})

// new requester
router.post('/new', (req, res) => {
    const new_request = {
        // todo: What fields should be here ?
        requesterName: req.body.name
    };

    throw Error("TODO");
})

module.exports = router;
