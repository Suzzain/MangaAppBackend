var usermodel= require('../models/usermodel');
const bcrypt = require('bcrypt');
var saltRounds = 10;

function validator(req,res,next){
// console.log(req.body)
	usermodel.Users.findOne({
		where: { username: req.body.username }
	})
		.then(function (result) {
			console.log(result.dataValues);
			if (result.dataValues != '') {
				next({ "status": 409, "message": 'Username already exists' })
			}
		})
		.catch(function (err) {
			next();
		})
}


function hashGenerator(req,res,next){
	req.body.password
	bcrypt.hash(req.body.password, saltRounds)
	.then(function(hash){
		console.log(hash);
		req.hashvalue = hash;
		next();
	})
.catch(function(err){
	console.log(err)
	next()
// console.log(err)
})
}

function registeruser(req,res,next){
console.log(req.body)
usermodel.Users.create({
	username: req.body.username,
	password: req.hashvalue,
	usertype:'user'
	
})
.then(function(result){

	next();
})
.catch(function(err){
	next({"status":500, "message":"Something Went Wrong"});
	console.log(err);
	
});
}

function getuser(req, res, next){

		usermodel.Users.findAll({
			 attributes: ['id', 'username']
    })
		.then(function (result) {
            
            res.json(result);

        })
        .catch(function (err) {
            // res.json(err);
        })
	}

module.exports={
	registeruser,
	hashGenerator,
	getuser,
	validator
}