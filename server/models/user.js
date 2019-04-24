'use strict';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import constants from '../utils/constants'


export default(sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  user.associate = models => {
    // associations can be defined here
    user.hasMany(models.task, {
      foreignKey: 'userid',
      as: 'userid',
    });
  };

  //user functions
  user.prototype.authenticateUser = function(password) {
    return bcrypt.compareSync(password, this.password);
  }

  user.prototype._hashPassword = function(password){
    return bcrypt.hashSync(password, 8);
  },

  user.prototype.createToken = function() {
    return jwt.sign(
      {
        _id: this.id,
      },
      constants.JWT_SECRET,
      // expiresIn = Math.floor(Date.now() / 1000) + (60 * 60), //1 hour of expiration
     // {expiresIn : Math.floor(Date.now() / 1000) + (60 * 60) }
     {expiresIn:300} //5 minutes
    );
  },

  user.prototype.toAuthJSON = function() {
    return {
      // _id: this._id,
      token: 'JWT' +' '+ this.createToken(),
      // ...this.toJSON(),
    };
  },

  user.prototype.toJSON = function() {
    return {
      _id: this.id,
      name: this.name,
      username: this.username,
      email: this.email
    };
  }

  return user;
};