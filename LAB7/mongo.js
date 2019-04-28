const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID

const id = new ObjectID()
console.log(id.getTimestamp())

const connectionURL = 'mongodb+srv://admin:armonia@cluster0-45riz.mongodb.net/test?retryWrites=true';

const database = 'clase';

MongoClient.connect(connectionURL, {useNewUrlParser: true},
	function(error,client){
		if(error){
			console.log(error);
		}else{
			console.log('YAY');
			const db = client.db(database);
			/*db.collection('users').insertOne({
				name: 'Alex',
				age: 11111,
				gender: 'M'
			}, function(error, result){
				if(error){
					console.log(error);
				}else{
					console.log(result.ops);
				}
			})*/

			/*db.collection('users').insertMany([
		 	{
		 		name: 'Enrique',
		 		age: 21,
		 		gender: 'M'
		 	},
		 	{
		 		name: 'Juan Pablo',
		 		age: 21,
		 		gender: 'M'
		 	}
		 	], function(error, result){
		 	if(error){
		 		console.log(error)
		 	}
		 	console.log(result.ops)
		 })
		 */
		 /*db.collection('users').findOne({
		 	name: "Alex"
		 }, function(error,user){
		 	if(error){
		 		console.log('no encontre');
		 	}else{
		 		console.log(user);
		 	}
		 })
		}*/
		/*
		db.collection('users').find({
		 	name: 'Alex', //and
		 	age: {  $gt: 22} //greater than
		 }).toArray( function(error,users){
		 	console.log(users)
		 });*/
		 
		 ///UPDATE
		 /*
		 db.collection('users').updateOne({
		 	_id: new ObjectID('5ca68b3b8183b23c5cae3ad1'),
		 },{
		 	$set: {
		 		name: "Alex2"
		 	},
		 	$inc:{
		 		age:1
		 	}
		 },function(error,update){
		 	if(error){
		 		console.log(error);
		 	}
		 	console.log(update);
		 })

		 db.collection('users').deleteMany({
		 	name: 'Alex'
		 }, function(error,ok){
		 	if(error){
		 		console.log(ok);
		 	}
		 	console.log(ok);
		 });
		 */	
	}
}); 