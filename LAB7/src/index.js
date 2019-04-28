const express = require('express');
const app = express()

const port = process.env.PORT || 3000
const router = require('./routes')


require('./db/mongoose')


app.use(express.json()); //parsea a json
app.use(router);
app.listen(port, function(){
	console.log('Server up and running on port: ' + port)
})


