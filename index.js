var config = require('./config');

const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

const express = require('express')
const app = express()
const port = config.port

const tenentId = config.tenentId
const clientId = config.clientId
const clientSecret = config.clientSecret
const redirectUrl = config.redirectUrl
const requstScope = config.scope

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', function (req, res) {
    res.render('index', { tenentId, clientId, redirectUrl, requstScope});
});

app.get('/auth', function (req, res) {
    console.log('Authorization response')
    console.log(req.query)
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('scope', requstScope);
    params.append('code', req.query.code);
    params.append('redirect_uri', redirectUrl);
    params.append('grant_type', 'authorization_code');
    params.append('client_secret', clientSecret);
    fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
        method: 'POST',
        body: params
    })
    .then(resp => resp.json())
    .then(json =>{
        console.log('Token response')
        console.log(json)
        const meta = {
            'Authorization': `Bearer ${json.access_token}`
          };
        const headers = new fetch.Headers(meta);
        fetch('https://graph.microsoft.com/v1.0/me', {headers})
            .then(r => r.json())
            .then(json => console.log(json));
        res.render('get-object-id', {access_token: json.access_token})
    })
})

app.listen(port, () => console.log(`Go to http://localhost:${port}/ to start!`))