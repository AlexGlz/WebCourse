const request = require("request");
const credentials = require('./credentials.js')

const getClimaCiudad = function(city){
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/"'+city+'".json?access_token=' + credentials.MAPBOX_TOKEN

	request({url:url, json:true}, function(error,response){
			//console.log(response.body.features[0]);
			const latitud = response.body.features[0].geometry.coordinates[1];
			const longitud = response.body.features[0].geometry.coordinates[0];
			//console.log(latitud+','+longitud);
			getClimaCoord(latitud,longitud);
	});
}

const getClimaCoord = function(latitud,longitud){
	const url = 'https://api.darksky.net/forecast/'+credentials.DARK_SKY_SECRET_KEY+'/'+latitud+','+longitud+'?units=si'
	request({url:url, json:true}, function(error,response){
		const data = response.body;
		//console.log(data);
		const temperatura = data.currently.temperature;
		const probLluvia = (data.currently.precipProbability)*100 + "%";
		const status = data.hourly.summary;
		console.log(status+' Current temperature: '+temperatura+'°C. '+'Precipitation probability: '+probLluvia);
	});

}

//getClimaCiudad("Juarez");
//getClimaCiudad("Torreon");
//getClimaCiudad("Mexico City"); 
//getClimaCiudad("Saltillo");
getClimaCiudad("Monterrey");

