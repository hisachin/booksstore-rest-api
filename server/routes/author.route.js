const express = require('express')
const router = express.Router()

const authors = require('../controller/authors.controller.js')


//get all books
router.get('/',authors.findAuthors)

//get single book by id
router.get('/:authorid',authors.findSingleAuthor)

//add new Book
router.post('/',authors.addAuthor)

//update single user by id

// router.put('/:userid',users.updateSingleUser)

// //delete single user by id

// router.delete('/:userid',users.deleteSingleUser)

module.exports = router