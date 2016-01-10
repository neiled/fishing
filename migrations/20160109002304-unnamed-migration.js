'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('users',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      name: {type: Sequelize.STRING},
      email: {type: Sequelize.STRING},
      twitterId: {type: Sequelize.STRING},
      gitHubId: {type: Sequelize.STRING},
      coins: {type: Sequelize.INTEGER, defaultValue: 0}
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
