const {DataTypes} = require('sequelize')
const database = require('../database')


const Room = database.define('room',{
    code:DataTypes.STRING,
    price:DataTypes.DECIMAL,
    level:DataTypes.INTEGER,
    type:DataTypes.STRING
})

module.exports = Room