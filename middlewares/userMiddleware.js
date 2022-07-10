const { body, validationResult } = require("express-validator");
const { runMiddleware } = require("../helpers/middlewareHelper");

const userMiddleware = {
  isAuthenticated: (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      req.session.redirectUrl = req.originalUrl;
      req.flash("error", "Logged in users are only allowed");
      res.redirect("users/login");
    }
  },
  registerValidation: async (req, res, next) => {
    await runMiddleware(
      req,
      res,
      body("email")
        .isEmail()
        .withMessage("must be a Valid email ID")
        .normalizeEmail()
    );
    await runMiddleware(
      req,
      res,
      body("password")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 5 chars long")
        .matches(/\d/)
        .withMessage("Password must contain a number")
    );
    await runMiddleware(
      req,
      res,
      body("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords are not matching");
        }
        return true;
      })
    );
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const { errors } = result;
      console.log(errors);
      errors.forEach((element) => {
        console.log(element);
        req.flash(element.param, element.msg);
      });
      return res.redirect("/users/register");
    } else {
      next();
    }
  },
};

module.exports = userMiddleware;
