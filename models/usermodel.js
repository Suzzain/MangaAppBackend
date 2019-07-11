var db= require('../config/database')

const Users= db.sequelize.define('Users',{
	username:{
		type:db.Sequelize.STRING,
		allowNull:false
	},

	password:{
		type:db.Sequelize.STRING,
		allowNull:false
	},

	usertype: {
    	type: db.Sequelize.STRING,
    	allowNull: false
  }
},

{
	freezeTableName:true,
	tableName:'users'
}

);
Users.sync({force:false})
.then(function(result){
	console.log(result);

})
.catch(function(err){
	console.log(err)
})
module.exports={
	Users
}
