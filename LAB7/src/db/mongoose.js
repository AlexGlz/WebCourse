const mongoose = require('mongoose');
const connectionURL = ''

mongoose.connect(connectionURL,{
	useNewUrlParse: true,
	useCreateIndex: true
})

