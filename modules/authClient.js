const OAuthClient = require('discord-oauth2')

const client = new OAuthClient({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: `${process.env.DASHBOARD_URL}/auth`,
})

module.exports = client;