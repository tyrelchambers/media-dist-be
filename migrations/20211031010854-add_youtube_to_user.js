'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Users", "youtubeAccessToken", {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("Users", "youtubeRefreshToken", {
        type: Sequelize.STRING
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Users", "youtubeAccessToken"),
      queryInterface.removeColumn("Users", "youtubeRefreshToken")
    ])
  }
};
