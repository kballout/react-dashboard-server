const StoredSession = require('../models/StoredSession')
const authClient = require('./authClient')
const bot = require('../bot')
const {PermissionsBitField} = require('discord.js')
const DB = require('../modules/mongodb')
const mongo = new DB()

const getSession = async (code) => {
    let session = await StoredSession.findById(code)
    if(!session){
        console.log('creating new session');
        try {
            const key =  await authClient.tokenRequest({
                scope: "identify guilds",
                code: code.toString(),
                grantType: "authorization_code"
            })
            session = saveSession(code, key)
            return session
        } catch (error) {
            session = null
            return session
        }
    }
    else{
        console.log('found session');
        if(parseFloat(session.expires) < Date.now()){
            console.log('refreshing session');
            session = await refreshSession(session)
            if(!session){
                session = 'relogin'
                return session
            }
            return session
        } else{
            return session
        }
    }
}

//For creating a brand new session
const saveSession = async (code, key) => {
    let userID 
    try {
       userID = await authClient.getUser(key.access_token)
    } catch (error) {
        return null
    }
    //remove any existing codes
    let oldSession = await StoredSession.findOne({userID: userID.id})
    if(oldSession){
        await endSession(oldSession._id)
    }
    const session = new StoredSession({
        _id: code,
        accessToken: key.access_token,
        userID: userID.id,
        refreshToken: key.refresh_token,
        expires: Date.now() + key.expires_in.toString() * 1000 - 10000
    })
    try {
        await session.save()
        return session
    } catch (error) {
        console.log(error);
    }
}

const refreshSession = async (session) => {
    let newToken
    try {
        newToken = await authClient.tokenRequest({refreshToken: session.refreshToken, grantType: 'refresh_token'})
    } catch (error) {
        console.log(error);
    }
    if(newToken != null){
        let newSession = StoredSession.findOneAndUpdate(session.code, {
            accessToken: newToken.access_token,
            expires: newToken.expires_in.toString()
        },{new: true})
        return newSession
    }
    //refresh token didnt work or expired
    return null
}


const getUserData = async(session) => {
    let authUser, authGuilds
    try {
        authUser = await authClient.getUser(session.accessToken)
        authGuilds = await authClient.getUserGuilds(session.accessToken)
    } catch (error) {
        console.log(error);
    }
    if(authUser && authGuilds){
        console.log('getting user data');
        const guilds = []
        let isManager, guild, permissions
        for(const next of authGuilds){
            guild = bot.guilds.cache.get(next.id)
            if(guild){
                permissions = new PermissionsBitField(next.permissions)
                isManager = permissions.has('ManageGuild')
                if(isManager){
                    guild['exists'] = await mongo.checkIfExists(guild.id)
                    const guildData = await mongo.getAllGuildData(guild.id)
                    guild['guildSettings'] = {}
                    guild['guildSettings'].general = {'general' : guildData.general}
                    guild['guildSettings'].programs = {'programs' : guildData.programs}
                    guild['guildSettings'].teams = {'teams' : guildData.teams}
                    guild['guildSettings'].stores = {'stores': guildData.stores}
                    guild['guildSettings'].emblems = {'emblems': guildData.emblems}
                    guilds.push(guild)
                }
            }
        }
        console.log('returning guilds');
        return {authUser, guilds}
    }
    return null
}

const endSession = async (code) => {
    //revoke token
    let session = await StoredSession.findById(code)
    if(session){
        const credentials = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')
        await authClient.revokeToken(session.accessToken, credentials)
    }
    await StoredSession.deleteOne({_id: code})
}

module.exports.getSession = getSession
module.exports.getUserData = getUserData
module.exports.endSession = endSession
