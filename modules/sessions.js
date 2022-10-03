const StoredSession = require('../models/StoredSession')
const authClient = require('./authClient')
const bot = require('../bot')

const getSession = async (code) => {
    let session = await StoredSession.findById(code)
    if(!session){
        console.log('creating new session');
        const key =  await authClient.getAccess(code.toString())
        session = saveSession(code, key)
        return session
    }
    else{
        console.log('found session: ' + session);
        if(authClient.checkValidity(session.accessToken).expired){
            console.log('refreshing session');
            session = refreshSession(session)
            return session
        } else{
            return session
        }
    }
}

const saveSession = async (code, token) => {
    let userID = await authClient.getUser(token)
    console.log(userID);
    //remove any existing codes
    await StoredSession.deleteMany({userID: userID.id})
    const session = new StoredSession({
        _id: code,
        accessToken: token,
        userID: userID.id
    })
    try {
        await session.save()
        return session
    } catch (error) {
        console.log(error);
    }
}

const refreshSession = async (session) => {
    let newToken = authClient.refreshToken(session.accessToken.toString())
    let newSession = StoredSession.findOneAndUpdate(session.code, {
        accessToken: newToken
    },{new: true})
    return newSession
}


const getUserData = async(session) => {
    let authUser = await authClient.getUser(session.accessToken)
    let authGuilds = await authClient.getGuilds(session.accessToken)
    const guilds = []
    let isManager, guild
    for(const id of authGuilds.keys()){
        isManager = authGuilds.get(id).permissions.includes('MANAGE_GUILD')
        guild = bot.guilds.cache.get(id)
        if(guild && isManager){
            guilds.push(guild)
        }
    }
    return {authUser, guilds}
    
}

module.exports.getSession = getSession
module.exports.getUserData = getUserData
