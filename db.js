const Sequelize = require('sequelize');

const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:helloworld@localhost:5432/postgres';
const sequelize = new Sequelize(databaseUrl);

sequelize
    .sync()                                             //This method will sync the data in your database with the schema you are about to create
    .then(() => console.log('Databse schema updated'))  //message confirming the database schema has been updated.
    .catch(console.error)

module.exports = sequelize;