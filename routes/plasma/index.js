const router = require("express").Router();
const donerRouter = require("./doner");
const receiverRouter = require("./receiver");

// for new receiver request, the route is "/reciever/new"

router.use("/doner", donerRouter);
router.use("/reciever", receiverRouter);

module.exports = router;
