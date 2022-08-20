var express = require("express");
var router = express.Router();
/*
    Model
*/
const { Counter } = require("../Model/Counter");
const { User } = require("../Model/User");

router.post("/register", (req, res) => {
    console.log(req.body);

    let temp = req.body;
    Counter.findOne({ name: "counter" }).then((doc) => {
        temp.userNum = doc.userNum;

        const userData = new User(req.body);
        userData.save().then(() => {

            Counter.updateOne({ name: "counter", $inc: { userNum: 1 } }).then(() => {
                res.status(200).json({ success: true });
            })

        })
    }).catch((err) => {

        console.log(err);
        res.status(400).json({ success: false });

    })
})

module.exports = router;