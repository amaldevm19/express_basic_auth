const express = require("express");
const router = express.Router();
const restrictedController = require("../controllers/restrictedController");

router.get("/", restrictedController.getRestrictedPage);

module.exports = router;
