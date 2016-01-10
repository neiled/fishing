"use strict";

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    twitterId: DataTypes.STRING,
    gitHubId: DataTypes.STRING,
    coins: DataTypes.INTEGER
  } );

  return user;
};
