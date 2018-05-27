const express = require('express')
const router = express.Router()

const books = require('../controller/books.controller.js')


//get all books
router.get('/',books.findBooks)

//get single book by id
router.get('/:bookid',books.findSingleBook)

//add new Book
router.post('/',books.addBooks)

//update single book by id
router.put('/:bookid',books.updateSingleBook)

//delete single book by id
router.delete('/:bookid',books.deleteSingleBook)

module.exports = router