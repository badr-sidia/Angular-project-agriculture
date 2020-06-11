var Sequelize = require('sequelize');
	
			// db config
			var config = require('./database.json')[env];
			var password = config.password ? config.password : null;
	
			// initialize database connection
			var sequelize = new Sequelize(
				config.database,
				config.user,
				config.password, {
					dialect: config.driver,
					logging: console.log,// permet de voir les logs de sequelize
					define: {
						timestamps: false
					}
				}
			);
	
			sequelize
				.authenticate()
				.then(function(err) {
					console.log('Connection has been established successfully.');
				}, function(err) {
					console.log('Unable to connect to the database:', err);
				});
	
			module.exports = sequelize;
	
			
	
			{
			  "dev": {
			    "driver": "",// votre base de donnée (mysql…)
			    "user": "",
			    "database": "  ",
			    "password": ""
			  },
	
			  "production": {
			    "driver": "",
			    "user": "",
			    "database": " ",
			    "password": ""
			  }
			}