var express = require("express");
var router = express.Router();
/*
    Model
*/
const { Counter } = require("../Model/Counter");
const { User } = require("../Model/User");

const setUpload = require("../Util/upload.js");

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

router.post("/namecheck", (req, res) => {

    User.findOne({ displayName: req.body.displayName }).exec().then((doc) => {

        let check = true;

        if (doc) {
            check = false;
        }
        res.status(200).json({ success: true, check });

    }).catch((err) => {
        res.status(400).json({ success: false })
    })
})

router.post("/profile/image", setUpload("mern-react-community/user"), (req, res, next) => {

    console.log(res.req);
    res.status(200).json({ success: true, filePath: res.req.file.location })
})

router.post("/profile/update", (req, res) => {

    let temp = {
        photoURL: req.body.photoURL
    }

    console.log(temp);

    User.updateOne({ uid: req.body.uid }, { $set: temp }).exec().then(() => {

        res.status(200).json({ success: true })

    }).catch((err) => {

        res.status(400).json({ success: false })
    })

})


module.exports = router;