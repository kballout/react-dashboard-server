const express = require('express')
const cookies = require('cookie-parser')
require('dotenv').config()
var cors = require('cors')
const app = express()

app.use(cors({origin: 'http://localhost:3000', credentials: true}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookies())

const mongoose = require('mongoose')


const authRoutes = require('./routes/authRoutes')

app.use('/auth', authRoutes)


//connect db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log('connected to db'))

app.listen(3001, () => {
    console.log('server started on port 3001');
})