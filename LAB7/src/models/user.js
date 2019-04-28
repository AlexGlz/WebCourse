
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	age:{
		type: Number,
		required: true,
		validate(value){
			if(value<13){
				throw new Error('Edad es menor a 13');
			}
		}
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
		required: true,
		minlengh: 8,
		trim: true
	}
})

userSchema.pre('save',function(next){
	const user = this
	console.log("PRESAVING")
	next()
})

const User  = mongoose.model('User', userSchema)

module.exports = User;