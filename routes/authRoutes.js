const express = require('express')
const StoredSession = require('../models/StoredSession')
const authClient = require('../modules/authClient')
const { setHeaders } = require('../modules/middleware')
const router = express.Router()
const { getSession, getUserData, endSession } = require('../modules/sessions')
require('dotenv').config()


router.get('/login', (req, res) => {
    console.log('attempt to login');
    res.status(200).json({redirect: `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.DASHBOARD_URL}/auth&response_type=code&scope=identify guilds&prompt=none` })
})

router.post('/code', setHeaders, async (req, res) => {
    try{
        console.log('try auth');
        const code = JSON.parse(req.body.data)
        let result = await getSession(code)
        if(result === 'relogin'){
            await endSession(code)
            res.clearCookie('code')
            res.status(401).json({msg: 'relogin'})
        }
        else if(result && result !== 'relogin'){
            res.cookie('code', code);
            let data = await getUserData(result)
            if(data){
                res.status(200).json({msg: 'success', data})
            } else{
                res.status(401).json({msg: 'failed to get user data'})
            }
        } else if(!result){
            res.status(401).json({msg: 'relogin'})
        }
    }
    catch{
        res.status(401).json({msg: 'error'})
    }
});

router.post('/logout', setHeaders, async (req, res) => {
    const code = req.cookies['code']
    await endSession(code)
    res.clearCookie('code')
    res.status(200).json({msg: true})
})

module.exports = router