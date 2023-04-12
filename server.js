if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express')
const app = express()
const expressEjsLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index') 
const authorRouter = require('./routes/authors')

app.set('view engine', 'ejs')
app.set('views', './views')
app.set('layout', 'layouts/layout')   
app.use(expressEjsLayouts) 
app.use(express.static('public')) 
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
})
.then(db => console.log('Connected to Mongoose'))
.catch(err => console.log(err));

app.use('/', indexRouter)
app.use('/authors', authorRouter) 
 
app.listen(process.env.PORT || 3000)