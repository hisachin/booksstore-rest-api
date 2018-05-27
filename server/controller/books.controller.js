const Books = require('../model/books.model.js')
const Authors = require('../model/author.model.js')

exports.findBooks = function(req, res) {
    // Retrieve and return all book from the database.
    Books.find(function(err, books){
        if(err) {
            console.log(err)
            res.status(500).send({message: "Some error occurred while retrieving books."})
        } else {
            res.status(200).send(books)
        }
    })
}

exports.addBooks = function(req, res) {

    if(!req.body.title || req.body.title === "" || req.body.title === " "){
        return res.status(200).send({status: false, message: "Book title can not be empty"})
    }

    if(!req.body.description || req.body.description === "" || req.body.description === " "){
        return res.status(200).send({status: false,message: "Book description can not be empty"})
    }

    if(!req.body.isbn || req.body.isbn === "" || req.body.isbn === " "){
        return res.status(200).send({status: false,message: "Book ISBN can not be empty"})
    }

    if(!req.body.price || req.body.price === "" || req.body.price === " "){
        return res.status(200).send({status: false,message: "Book price can not be empty"})
    }

    Authors.findById(req.body.author,function(err,author){
        if(err) {
            console.log(err)
            if(err.kind === 'ObjectId') {
                return res.status(200).send({status: false,message: "Author not found with id " + req.body.author + ". Please add this author first."})                
            }
            return res.status(200).send({status:false,message: "Error retrieving author with id " + req.body.author})
        } 

        if(!author) {
            return res.status(200).send({status:false,message: "Author not found with id " + req.body.author+ ". Please add this author first."})            
        }else{
            //create book instance
            var book = new Books({
                title: req.body.title, 
                description: req.body.description,
                isbn: req.body.isbn,
                price: req.body.price,
                author: req.body.author,
                publisher: req.body.publisher,
                language: req.body.language,
                genre: req.body.genre,
                pages: req.body.pages,
                edition: req.body.edition
            })

            //save book into database
            book.save(function(err, data) {
                if(err) {
                    console.log(err)
                    res.status(500).send({status: false,message: "Some error occurred while inserting the book."})
                } else {
                    res.status(201).send({status: true,message: "Book added successfully."})
                }
            })
        }
    })
}

exports.findSingleBook = function(req, res) {
    // Find a single book with a bookid
    Books.findById(req.params.bookid, function(err, book) {
        if(err) {
            console.log(err)
            if(err.kind === 'ObjectId') {
                return res.status(200).send({status: false,message: "Book not found with id " + req.params.bookid})                
            }
            return res.status(200).send({status:false,message: "Error retrieving book with id " + req.params.bookid})
        } 

        if(!book) {
            return res.status(200).send({status:false,message: "Book not found with id " + req.params.bookid})            
        }

        res.status(200).send({status:true,message:book})
    })
}

exports.updateSingleBook = function(req, res) {
    // Update a book identified by the bookid in the request
    Books.findById(req.params.bookid, function(err, book) {
        if(err) {
            console.log(err)
            if(err.kind === 'ObjectId') {
                return res.status(404).send({status:false,message: "Book not found with id " + req.params.bookid})                
            }
            return res.status(500).send({status:false,message: "Error in finding book with id " + req.params.bookid})
        }

        if(!book) {
            return res.status(404).send({status:false,message: "Book not found with id " + req.params.bookid})            
        }

        if(!req.body.title || req.body.title === "" || req.body.title === " "){
        return res.status(200).send({status: false, message: "Book title can not be empty"})
        }

        if(!req.body.description || req.body.description === "" || req.body.description === " "){
            return res.status(200).send({status: false,message: "Book description can not be empty"})
        }

        if(!req.body.isbn || req.body.isbn === "" || req.body.isbn === " "){
            return res.status(200).send({status: false,message: "Book ISBN can not be empty"})
        }

        if(!req.body.price || req.body.price === "" || req.body.price === " "){
            return res.status(200).send({status: false,message: "Book price can not be empty"})
        }

        book.title = req.body.title
        book.description = req.body.description
        book.isbn = req.body.isbn
        book.price = req.body.price
        book.author = req.body.author
        book.publisher = req.body.publisher
        book.language = req.body.language
        book.genre = req.body.genre
        book.pages = req.body.pages
        book.edition = req.body.edition

        book.save(function(err, data){
            if(err) {
                res.status(500).send({status:false,message: "Could not update book with id " + req.params.bookid})
            } else {
                res.status(200).send({status:true,message:"Details updated successfully"})
            }
        })
    })
}

exports.deleteSingleBook = function(req, res) {
    // Delete a note with the specified noteId in the request
    Books.findByIdAndRemove(req.params.bookid, function(err, book) {
        if(err) {
            console.log(err)
            if(err.kind === 'ObjectId') {
                return res.status(404).send({status:false,message: "Book not found with id " + req.params.bookid})                
            }
            return res.status(500).send({status:false,message: "Could not delete book with id " + req.params.bookid})
        }

        if(!book) {
            return res.status(404).send({status:false,message: "Book not found with id " + req.params.bookid})
        }

        res.status(200).send({status:true,message: "Book deleted successfully!"})
    })
}