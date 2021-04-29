const router = require("express").Router();

router.use((_,res) => {
    throw Error("NOT YET IMPLEMENTED"); // will be handled by the error handler
})

module.exports = router;
