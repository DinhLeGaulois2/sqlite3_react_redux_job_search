const bcrypt = require('bcrypt-nodejs');
var Promise = require("bluebird");

module.exports = function (sequelize, Sequelize) {
  var UserSchema = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  // new version: V4
  UserSchema.prototype.validatePwd = function (candidatePwd, cb) {
    bcrypt.compare(candidatePwd, this.password, (err, isMatch) => {
      if (err) cb(err)
      if (isMatch)
        return cb(null, this)
      else 
        return cb(null, false)
    })
  }

  UserSchema.beforeCreate(function (model, options) {
    SALT_WORK_FACTOR = 12;
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return reject(err);
        bcrypt.hash(model.password, salt, null, function (err, hash) {
          if (err) return cb(err);
          model.password = hash;
          return resolve(model, options);
        })
      });
    })
  })

  return UserSchema;
}