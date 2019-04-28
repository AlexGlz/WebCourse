const Person = require('../models/person')

const postPeople = function(req,res){
	var person = new Person(req.body);
	person.save().then(function(){
		res.send(person)
	}).catch(function(error){
		return res.status(400).send(error)
	})
	
}

const getPeople = function(req,res){
		Person.find({}).then(function(people){
			res.send(people)
		}).catch(function(error){
			res.status(500).send(error)
		})
	}

const getPerson = function(req,res){
		const _id = req.params.id;
		Person.findById(_id).then(function(person){
			if(!person){
				return res.status(404).send()
			}
			return res.send(person)
		}).catch(function(error){
			return res.status(500).send(error)
		})
	}

const updatePerson = function(req,res){
		const _id = req.params.id;
		Person.findByIdAndUpdate(_id, req.body).then(function(person){
			if(!person){
				return res.status(404).send()
			}
			return res.send(person)
		}).catch(function(error){
			return res.status(500).send(error)
		})
	}

const deletePerson = function(req,res){
		const _id = req.params.id;
		Person.findByIdAndDelete(_id).then(function(person){
			if(!person){
				return res.status(404).send()
			}
			return res.send(person)
		}).catch(function(error){
			return res.status(500).send(error)
		})
	}
module.exports = {
	postPeople:postPeople,
	getPeople:getPeople,
	getPerson:getPerson,
	updatePerson:updatePerson,
	deletePerson:deletePerson
}
