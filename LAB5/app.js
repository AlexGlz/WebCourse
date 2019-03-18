const clima = require('./functions.js')

//getClimaCiudad("Juarez");
//getClimaCiudad("Torreon");
//getClimaCiudad("Mexico City"); 
//getClimaCiudad("Saltillo");
clima.getClimaCiudad("Monterrey", function(error, response){
	if(error){
		console.log(error);
	}else{
		message = response.status+' Current temperature: '+response.temperatura+'°C. '+'Precipitation probability: '+response.probLluvia;
		console.log(message);
	}
});

