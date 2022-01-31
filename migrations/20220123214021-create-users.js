'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.createTable("users", {
     id: {
       allowNull: false,
      //  autoIncrement: true,
       primaryKey: true,
       type: Sequelize.UUID,
       defaultValue: Sequelize.UUIDV4,
     },
     createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    deletedAt: {
      type: Sequelize.DATE,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
   });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("users");
  }
};
