const express = require('express')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const appRoute = require('./src/routes/route-todo')
app.use('/',appRoute)

app.listen(3000, () =>{
    console.log('Server Berjalan di Port : 3000')
})