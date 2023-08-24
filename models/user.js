'use strict';

const {hashSync} = require("bcrypt");

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Role}) {

      this.hasOne(Role,{foreignKey:"UserId"});

      User.addHook('afterCreate', async (user, options) => {
        await Role.create({
          role:"default",
          UserId:user.id
        });
      });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {type:DataTypes.STRING,unique:true},
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    paranoid:true,
    hooks: {
      beforeCreate: (user, options) => {
        {
          if(user.password && user.password.length)
          user.password = hashSync(user.password, 10);
        }
      },
      beforeUpdate(user, options) {
        if(user.password && user.password.length)
          user.password = hashSync(user.password, 10)
      }
    },
  });

  return User;
};
