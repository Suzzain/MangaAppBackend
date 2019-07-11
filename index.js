var express= require('express');
var application= new express();
var bodyParser= require('body-parser');

const usermodel = require('./models/usermodel');
var usercontroller= require('./controller/usercontroller');
var authcontroller= require('./controller/authcontroller');

application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: true }));


application.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'content-type');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type','application/json');
	next();
})

application.post('/registers'

// ,usercontroller.validation
,usercontroller.validator
,usercontroller.hashGenerator
,usercontroller.registeruser,function(req,res,next){
console.log(req.body);
	res.status(201);
	res.send({"message":"User was registered successfully"});
	// res.status(201);
	// res.send({"message":"okay"})
});

application.get('/registers', usercontroller.getuser, function(req, res, next) {
	// console.log(req.params.id);
})

application.post('/verify', authcontroller.validation, authcontroller.check, authcontroller.jwtTokenGen, authcontroller.sendUserData,
function(req, res, next) {
res.status(200);
res.send(
			{
				"message": "Login success !",
				"token": req.genToken,
				"result": result
			}
		);



	});

application.use(function(err, req, res, next) {

	res.status(err.status);
	res.send({
		"message": err.message
	});

	console.log(err.status);
	console.log(err.message);
})

// console.log('app running')

const port = process.env.PORT;
application.listen(port, () => console.log(`server of port ${port} is working`));
module.exports = application;