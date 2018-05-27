const express = require('express')
const router = express.Router()

const search = require('../controller/search.controller.js')


//get all books
router.get('/books',search.searchBooks)

module.exports = router