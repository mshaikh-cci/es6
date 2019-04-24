'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tname: {
        type: Sequelize.STRING
      },
      tdesc: {
        type: Sequelize.STRING
      },
      tduedate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userid:{
        type:Sequelize.INTEGER,        
        onDelete:'CASCADE',        
        references:{          
          model:'users',          
          key:'id',          
          as:'userid'        
         }},
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tasks');
  }
};