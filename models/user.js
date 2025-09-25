'use strict';
const {
  Model
} = require('sequelize');
const { options } = require('../route');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, {foreignKey: "UserId"}
      )
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Isi username dulu yuk"},
        notEmpty: {msg : "Isi username dulu yuk"}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        notEmpty: {msg: "Email wajib diisi ya"},
        notNull: {msg: "Email wajib diisi ya"},
        
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Password diperlukan"},
        notEmpty: {msg: "Password diperlukan"},
        len: {
          args: [4, 255],
          msg: 'Password minimal 4 karakter dan maximal 255 karakter'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.role = 'STUDENT',
        user.password = bcrypt.hashSync(user.password, 10)
      }
    }

  });
  return User;
};