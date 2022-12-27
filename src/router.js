var express = require("express")
const router = express.Router();
var controller = require("./controllers/DefaultController.js").controller;

router.get('/',function(req,res){
    res.render("pages/home/index");
});

router.post('/api', controller)


module.exports = router;
