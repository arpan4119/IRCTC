const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('irctc', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Database connection error:', err));

module.exports = sequelize;
