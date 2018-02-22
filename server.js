const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express(); //we can now use `express` as a function with bracket because weve declared instantianted it up here, app var serve as the Route:: in laravel see below example
var currentYear = new Date().getFullYear();

app.set('view engine', 'hbd');
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text, extra) => {
	return text.toUpperCase();
});

//whenever u use app.use we r trying to register a function below middlware serve as a directory
app.use(express.static(__dirname + '/public')); //allows the files in public directory to be accessible in the browser automatically by the file name
//below is another middleware example if u dont call on the next method in the middleware scope, d app wont continue
//this middleware monitors every activities on the app

//middleware for 404 page or bad request


app.use((req, res, next) => { //on the req obj, we have access to every request coming like, http and so on
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err){
			console.log('Unable to append activities to server.log file');
		}
	});
	next();
});

app.use((req, res, next) => {
	res.render('maintenance.hbs');
});

app.get('/', (req, res) => {
	//get() basically takes two param one: the url two the function u want to execute, also: the second param
		 // of get takes two args 1: request two: response..the first arg (req) is the request coming to tho url 
		 	// '/' and the also store tons of request coming ing e.g headers we use, body and response (res) basically
		 		//for responding to the http request like sending http status code bak to the request, sending data back to the request or url and many more
	// res.send('<h1>Hello Welcome to Express Js</h1>');
	// res.send({
	// 	name: 'Nurudeen',
	// 	likes: [
	// 		'Drivind',
	// 		'Coding',
	// 		'Gaming'
	// 	]
	// });

	res.render('home.hbs', {
		pageTitle: 'Home page',
		welcomeMessage: 'Welcome to Node.Js App'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Oops page couldnt be found'
	});
});

//for the app to be able to run on the web browser, we need to bind the application to a port by listening to the port: see below
app.listen(8080, () => {
	console.log('Server is up and running on port 8080');
});