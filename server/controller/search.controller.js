const Books = require('../model/books.model.js')

exports.searchBooks = function(req, res) {
    // Delete a note with the specified noteId in the request
    queryCondition = {}
    
    if(req.query.title){
    	queryCondition.title = req.query.title
    }

    if(req.query.isbn){
    	queryCondition.isbn = req.query.isbn
    }

    if(req.query.publisher){
    	queryCondition.publisher = req.query.publisher
    }

    if(req.query.genre){
    	queryCondition.genre = req.query.genre
    }

    Books.find(queryCondition,function(err,books){
    	if(err){
    		console.log(err)
    		res.status(500).send({status:false,message: "Some error occurred while retrieving books."})
    	}else{
    		res.status(200).send({status:true,message:books})
    		
    	}
    })
}