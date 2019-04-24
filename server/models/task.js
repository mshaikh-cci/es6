'use strict';
module.exports = (sequelize, DataTypes) => {
  const task = sequelize.define('task', {
    tname: DataTypes.STRING,
    tdesc: DataTypes.STRING,
    tduedate: DataTypes.DATE
  }, {});
  task.associate = function(models) {
    // associations can be defined here
    task.belongsTo(models.user, {
      foreignKey: 'userid',
      onDelete: 'CASCADE',
    })
  };
  return task;
};