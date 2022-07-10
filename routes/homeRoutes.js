var express = require("express");
var router = express.Router();
const homeContoller = require("../controllers/homeController");

/* GET home page. */
router.get("/", homeContoller.getHomePage);

module.exports = router;
