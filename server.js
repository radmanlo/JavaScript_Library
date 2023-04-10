if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express')
const app = express()
const expressEjsLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressEjsLayouts)
app.use(express.static('public')) 

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
}).catch(err => {
    console.error(err.stack)
    process.exit(1)
    })
const db = mongoose.connection
db.on('erro', error => console.error( error))
db.once('open', () => console.log('Connected to Mongoose')) 

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)  