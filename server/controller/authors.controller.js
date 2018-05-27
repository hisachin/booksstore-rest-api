const Authors = require('../model/author.model.js')

exports.findAuthors = function(req, res) {
    // Retrieve and return all author from the database.
    Authors.find(function(err, authors){
        if(err) {
            console.log(err)
            res.status(500).send({message: "Some error occurred while retrieving authors."})
        } else {
            res.status(200).send(authors)
        }
    })
}

exports.addAuthor = function(req, res) {
    // Create and Save a new author

    if(!req.body.name || req.body.name === "" || req.body.name === " "){
        return res.status(200).send({status: false, message: "Author name can not be empty"})
    }
    
    //create author instance
    var author = new Authors({
        name: req.body.name
    })

    //save author into database
    author.save(function(err, data) {
        if(err) {
            console.log(err)
            res.status(500).send({status: false,message: "Some error occurred while inserting the author."})
        } else {
            res.status(200).send({status: true,message: "Author added successfully."})
        }
    })
}

exports.findSingleAuthor = function(req, res) {
    // Find a single author with a authorid
    Authors.findById(req.params.authorid, function(err, author) {
        if(err) {
            console.log(err)
            if(err.kind === 'ObjectId') {
                return res.status(200).send({status: false,message: "Author not found with id " + req.params.authorid})                
            }
            return res.status(200).send({status:false,message: "Error retrieving author with id " + req.params.authorid})
        } 

        if(!author) {
            return res.status(200).send({status:false,message: "Author not found with id " + req.params.authorid})            
        }

        res.status(200).send({status:true,message:author})
    })
}