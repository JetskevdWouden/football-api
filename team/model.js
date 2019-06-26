const Sequelize = require('sequelize');
const db = require('../db')

const Team = db.define(
    'team',
    {
        name: {
            type: Sequelize.STRING,         //determines the name of the column that will be added to the table
            field: 'team_name'
        }
    },
    { tableName: 'football_teams' }
)

module.exports = Team