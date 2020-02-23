const bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {

    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false,
      len: [8]
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      len: [1],
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [8]
    }
  });

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  }

  User.beforeCreate (function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
  });
  return User;
};
