const express = require('express')
const router = express.Router()

const multer = require('multer')
const storage =  multer.diskStorage({
	destination: function(req,file,cb){
		cb(null,'./public/upload/')
	},
	filename: function(req,file,cb){
		cb(null,file.originalname)
	}
})

const fileFilter = function(req,file,cb){
	if(file.mimetype === 'text/csv'){
		cb(null,true)
	}else{
		cb(null,false)
	}
}

const uploadFile = multer({
	storage: storage,
	fileFilter: fileFilter
}) 

const upload = require('../controller/upload.controller.js')


//get all books
router.post('/',uploadFile.single('booksfile'),upload.uploadFile)

module.exports = router