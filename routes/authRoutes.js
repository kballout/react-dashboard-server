const express = require('express')
const authClient = require('../modules/authClient')
const router = express.Router()
require('dotenv').config()

router.get('/login', (req, res) => {
    console.log('attempt to login');
    res.status(200).json({redirect: `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.DASHBOARD_URL}/auth&response_type=code&scope=identify guilds&prompt=none` })
})

router.post('/code', async (req, res) => {
    try{
        console.log('try auth');
        const code = JSON.parse(req.body.data)
        const key =  await authClient.getAccess(code.toString()).then((resp) => {
            console.log(resp);
        }).catch((err) => {console.log(err);})
        console.log(key);
        if(key){
            res.cookie.set('key', key);
            console.log(key);
            res.status(200).json({msg: true})
        }
    }
    catch{
        res.status(401).json({msg: false})
    }
});

module.exports = router