var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var expressValidator = require('express-validator');
var wakanda = require('wakanda-node');
var todoRouter = require('./routers/todo');

app.use(express.static(process.env.MODE === 'DEV'? 'public':'dist'));
app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(methodOverride());

wakanda.init({
	remote: {
		host: process.env.WAKANDA_HOSTNAME || 'localhost',
		port: process.env.WAKANDA_PORT || '80',
		secure: process.env.WAKANDA_SECURE=='true'
	}
}).then(function(ds) {
	global.ds = ds;
	app.use('/task', todoRouter);
}).catch(function (e) {
	console.log(e)
});

var server = app.listen(process.env.PORT, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('App listening at http://%s:%s', host, port);
});