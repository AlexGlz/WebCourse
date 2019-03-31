const credentials = require('./credentials.js')
const request = require("request");


const getClimaCiudad = function(city,callback){
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/"'+city+'".json?access_token=' + credentials.MAPBOX_TOKEN

	request({url:url, json:true}, function(error,response){
			//console.log(response);
			if(error){
				callback("Mapbox: Services not available", undefined);
			}else if(response.body.message){
				callback(response.body.message, undefined);
			}else if(response.body.features.length == 0){
				callback("City not found", undefined)
			}else{
				const city = response.body.features[0].text;
				const latitud = response.body.features[0].geometry.coordinates[1];
				const longitud = response.body.features[0].geometry.coordinates[0];
				//console.log(latitud+','+longitud);
				getClimaCoord(city,latitud,longitud,callback);
			}
	});
}

const getClimaCoord = function(city,latitud,longitud,callback){
	const url = 'https://api.darksky.net/forecast/'+credentials.DARK_SKY_SECRET_KEY+'/'+latitud+','+longitud+'?units=si'
	request({url:url, json:true}, function(error,response){
		//console.log(response.statusCode);
		if(error){
			callback("Darksky: Service not available")
		} else if(response.body.error){
			callback(response.body.error);
		} else if(response.statusCode == 403){
				callback("Darsky: Incorrect API KEY",undefined);
		} else{
			const data = response.body;
			//console.log(data);
			const temperatura = data.currently.temperature;
			const probLluvia = (data.currently.precipProbability)*100 + "%";
			const status = data.hourly.summary;

			const datosClima = {
				ciudad: city,
				temperatura: temperatura,
				probLluvia: probLluvia,
				status: status,
			}
			
			callback(undefined,datosClima);
		}
	});

}

module.exports = {
	getClimaCiudad: getClimaCiudad,
}