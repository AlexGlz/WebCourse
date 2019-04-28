
const mongoose = require('mongoose');
const validator = require('validator');


const User  = mongoose.model('User', {
	name:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true,
		validate(value){
			if(!validator.isEmail(value)){
				throw new Error('Email invalido');
			}
		}
	},
	password:{
		type: String,
		required: true
		//Validate password Lenght
	},
	is_admin:{
		type: Boolean,
		required: true
	}
})

module.exports = User;