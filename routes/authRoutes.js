const express = require('express')
const StoredSession = require('../models/StoredSession')
const authClient = require('../modules/authClient')
const router = express.Router()
const { getSession, getUserData } = require('../modules/sessions')
require('dotenv').config()


router.get('/login', (req, res) => {
    console.log('attempt to login');
    res.status(200).json({redirect: `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.DASHBOARD_URL}/auth&response_type=code&scope=identify guilds&prompt=none` })
})

router.post('/code', async (req, res) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.setHeader('Content-Type', 'application/json');
    try{
        console.log('try auth');
        const code = JSON.parse(req.body.data)
        let result = await getSession(code)
        if(result){
            res.cookie('code', code);
            let data = await getUserData(result)
            res.status(200).json({msg: true, data})
        } else{
            res.status(401).json({msg: false})
        }
    }
    catch{
        res.status(401).json({msg: false})
    }
});

module.exports = router