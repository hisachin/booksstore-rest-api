const mongoose = require('mongoose')

const authorSchema = mongoose.Schema(
	{
    	name: {
    		type:String, 
    		required : true,
    		trim:true
    	},
    	profile_image:{
    		type:String
    	}
	}, 
	{
    	timestamps: true
	}
)

module.exports = mongoose.model('Author', authorSchema)