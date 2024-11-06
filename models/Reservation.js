const {DataTypes} = require('sequelize')
const database = require('../database')
const User = require('./User')
const Room = require('./Room')

const Reservation = database.define('reservation',{
    data:DataTypes.DATE,
    duration:DataTypes.INTEGER
})

User.belongsToMany(Room, {through: Reservation})
Room.belongsToMany(User, {through: Reservation})

module.exports = Reservation