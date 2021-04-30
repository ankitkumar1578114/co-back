const router = require("express").Router();
const customerRouter = require("./customer");
const supplierRouter = require("./supplier");


router.use("/customer", customerRouter);
router.use("/supplier", supplierRouter);


router.get("/list", (_, res) => {

    res.send("hii")
})

router.post("/new", (req, res) => {

})

module.exports = router;
