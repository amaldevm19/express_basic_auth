var express = require("express");
var router = express.Router();
const usersController = require("../controllers/usersController");
const userMiddleware = require("../middlewares/userMiddleware");

/* GET */
router.get("/login", usersController.getLoginPage);
router.get("/register", usersController.getRegisterPage);
router.get("/account/:id", usersController.getAccountPage);
router.get("/logout", usersController.logoutUserFunction);

// POST
router.post("/login", usersController.loginUserFunction);
router.post(
  "/register",
  userMiddleware.registerValidation,
  usersController.registerUserFunction
);

module.exports = router;
