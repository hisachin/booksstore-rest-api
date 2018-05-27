const fs = require('fs')
const csv = require('fast-csv')

const Books = require('../model/books.model.js')
const Authors = require('../model/author.model.js')

exports.uploadFile = function(req, res) {
    //upload file
    console.log(req.file.path)
    var path = req.file.path
    fs.exists(path,function(exists){
        if(exists){

            var stream = fs.createReadStream(path)

            csv.fromStream(stream, {
                headers : [
                            "title",
                            "description",
                            "isbn",
                            "price",
                            "author",
                            "publisher",
                            "language",
                            "genre"
                        ]
                }
            ).on("data", function(data){
                if(!data.title || data.title === "" || data.title === " "){
                    return res.status(200).send({status: false, message: "Book title can not be empty"})
                }

                if(!data.description || data.description === "" || data.description === " "){
                    return res.status(200).send({status: false,message: "Book description can not be empty"})
                }

                if(!data.isbn || data.isbn === "" || data.isbn === " "){
                    return res.status(200).send({status: false,message: "Book ISBN can not be empty"})
                }

                if(!data.price || data.price === "" || data.price === " "){
                    return res.status(200).send({status: false,message: "Book price can not be empty"})
                }

                //create book instance
                var book = new Books({
                            title: data.title, 
                            description: data.description,
                            isbn: data.isbn,
                            price: data.price,
                            author: data.author,
                            publisher: data.publisher,
                            language: data.language,
                            genre: data.genre,
                            pages: data.pages,
                            edition: data.edition
                });
                //save book into database
                book.save(function(err, data) {
                    if(err) {
                        console.log(err)
                    } else {
                        console.log('book added successfully')
                    }
                });
            }).on('end',function(){
                res.status(200).send({status:true,message:'File uploaded successfully.'})
            });

        }else{
            res.status(400).send({status:false,message:'File does not exists or upload properly. Please Try Again.'})
        }
    });
}