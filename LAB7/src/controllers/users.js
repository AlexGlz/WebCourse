const User = require('../models/user')

const getUser = 
	function(req,res){
		const _id = req.params.id;
		User.findBy(_id).then(function(user){
			if(!user){
				return res.status(404).send()
			}
			return res.send(user)
		}).catch(function(error){
			return res.status(500).send(error)
		})
	}

const getUsers =
	function(req,res){
		User.find({}).then(function(users){
			res.send(users)
		}).catch(function(error){
			res.status(500).send(error)
		})
	}

const postUser = function(req,res){
	const user = new User(req.body)
	user.save().then(function(){
		return res.send(user);
	}).catch(function(error){	
		return res.status(400).send(error);
	})
}

module.exports = {
	getUser : getUser,
	getUsers: getUsers,
	postUser : postUser
}