const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const SALT_WORK_FACTOR = 10;
const UserSchema = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  isAdmin: { type: Boolean, default: false },
  password: { type: String, required: true },
});

UserSchema.pre("save", function (next) {
  let user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePasword, cb) {
  bcrypt.compare(candidatePasword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// first parameter for mongoose.model should be a string ; "User"
module.exports = mongoose.model("User", UserSchema);
