const express = require('express')
const cookies = require('cookies')
require('dotenv').config()
var cors = require('cors')
const app = express()
app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.use(cookies.express('a','b','c'))
const authRoutes = require('./routes/authRoutes')
const { json } = require('stream/consumers')
//
app.use('/auth', authRoutes)

app.listen(3001, () => {
    console.log('server started on port 3001');
})