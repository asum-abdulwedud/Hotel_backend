const { DataTypes } = require('sequelize')
const database = require('../database')


const User = database.define('user', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    password: DataTypes.STRING,
})

module.exports = User