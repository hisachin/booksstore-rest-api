const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path    = require('path');


//load routes
const books = require('./server/routes/books.route.js')
const authors = require('./server/routes/author.route.js')
const search = require('./server/routes/search.route.js')
const uploadFile = require('./server/routes/upload.route.js')

// create express app
const app = express()

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js')

mongoose.Promise = global.Promise

mongoose.connect(dbConfig.url)

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...')
    process.exit()
})

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database")
})

//defien routes
app.use('/api/v1/books',books)
app.use('/api/v1/authors',authors)
app.use('/api/v1/search',search)
app.use('/api/v1/uploads',uploadFile)


// define a simple route
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/server/view/index.html'));
})

// listen for requests
app.listen(4000, function(){
    console.log("Server is listening on port 4000")
})