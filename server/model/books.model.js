const mongoose = require('mongoose')

const bookSchema = mongoose.Schema(
	{
    	title: {
    		type:String, 
    		required : true,
    		trim:true
    	},
    	description: {
    		type:String, 
    		required : true,
    		trim:true
    	},
    	isbn:{
    		type:Number,
    		required: true,
    		trim:true,
            unique:true
    	},
    	price:{
    		type:Number,
    		required: true,
    		trim:true
    	},
    	author: { 
	        type: mongoose.Schema.Types.ObjectId, 
	        ref: 'Author',
            required:false
	    },
    	publisher:{
    		type: String,
    		trim:true
    	},
    	language:{
    		type:String,
    		trim:true
    	},
    	genre:{
    		type:String,
    		required:true,
    		trim:true
    	},
    	pages:{
    		type:Number,
    		trim:true
    	},
    	edition:{
    		type:String,
    		trim:true
    	}
	}, 
	{
    	timestamps: true
	}
)

module.exports = mongoose.model('Books', bookSchema)