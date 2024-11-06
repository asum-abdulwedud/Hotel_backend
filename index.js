const express = require('express')
const app = express()

const database = require('./database')
const Reservation = require('./models/Reservation')
const User = require('./models/User')
const Room = require('./models/Room')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')

app.use(cors('localhost:3000'))

database.sync()

app.use(express.json())


app.post('/register', async (req, res) => {
    const { first_name, last_name, email, phone_number, password } = req.body
    await User.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone_number: phone_number,
        password: bcryptjs.hashSync(password)
    })
    res.json({ success: true })
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    let user = await User.findOne({
        where: {
            email: email
        }
    })
    if (!user) return res.json({ success: false })
    let correct = bcryptjs.compareSync(password, user.password)
    if (!correct) return res.json({ success: false })
    let token = jwt.sign(user.id, 'asum@123')
res.json({success: true, token:token})

})


app.post('/create-room', async (req,res)=>{
    const{code, price,level,type} =req.body
    await Room.create({
        code:code,
        price:price,
        level:level,
        type:type
    })
    res.json({success:true})
})
//PATH TO FETCH ALL AVALIABLE ROOMS
app.get('/all-rooms', async(req,res) =>{
    let rooms =await Room.findAll({
        order:[['createdAt','desc']]
    })
    res.json(rooms)
})



app.post('/reserv', async (req,res)=>{
    const {roomId, duration, date} = req.body

    const token = req.headers['authorization'].split(' ')[1]

    const userId = jwt.verify(token, 'asum@123')
    await Reservation.create({
        userId: userId,
        roomId:roomId,
        duration:duration,
        data:date
    })
    res.json({success:true})
})


app.get('/all-reservs', async (req,res)=>{
    let reservs = await Reservation.findAll({
        order: [['createdAt', 'desc']]
    })
    res.json(reservs)
})

app.get('/my-reservs', async(req,res)=>{
    const token = req.headers['authorization'].split(' ')[1]
    const userId = jwt.verify(token, 'asum@123')
    let user = await User.findByPk(userId)
    let rooms = await user.getRooms()
    res.json(rooms)
})

app.listen(4000, () => console.log('server is runing'))