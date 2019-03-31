const clima = require('./functions.js')

//getClimaCiudad("Juarez");
//getClimaCiudad("Torreon");
//getClimaCiudad("Mexico City"); 
//getClimaCiudad("Saltillo");


const express = require('express')
const path = require('path')
const app = express()


const port = 3000

//console.log(path.join(__dirname,'public'))
const publicDir = path.join(__dirname,'public')

app.use(express.static(publicDir))

//app.get('/',function(req, res){
//	res.send('<h1>Hola mundo!</h1>');
//});


app.get("/weather", function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*');
	if(!req.query.search){
		return res.send({
			error: 'Favor de colocar una ciudad a buscar'
		})
	}
	clima.getClimaCiudad(req.query.search, function(error, response){
		if(error){
			return res.send({
				error: error
			})
		}else{
			message = response.status+' Current temperature: '+response.temperatura+'°C. '+'Precipitation probability: '+response.probLluvia;
			return res.send({
				location: response.ciudad,
				weather: message,
			})
		}
	});
})

app.get("*",function(req,res){
	res.send({
		error: "Esta ruta no existe"
	})
});

app.listen(port, function(){
	console.log('up and running')
})