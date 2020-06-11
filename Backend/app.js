const express=require('express');
const bodyParser=require('body-parser');
var mysql = require('mysql');
require('dotenv').config();
const cors = require('cors');
const { StreamChat } = require('stream-chat');
const path2 = require('path');
const stuffRoutes = require('./routes/stuff');
const cartRoutes = require('./routes/cart');
const contactRoutes = require('./routes/contact');
const reviewRoutes = require('./routes/review');
const serviceRoutes = require('./routes/service');
const buysRoutes = require('./routes/buys');
const optionsRoutes = require('./routes/option');
const employeeRoutes = require('./routes/employee');
const userRoutes = require('./routes/user');
const feedbackRoutes=require('./routes/feedback');

const app=express();
const Sequelize = require('sequelize');

const path = 'mysql://root:@localhost:3306/mydb';
const sequelize = new Sequelize(path, { operatorsAliases: false ,
  logging: false,
  define: {
      timestamps: false
  }});

sequelize.authenticate().then(() => {
  console.log('Connection established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
}).finally(() => {
  ;
});
let Think = sequelize.define('thinks', {
  title: Sequelize.STRING,
  description:Sequelize.STRING,
  price:Sequelize.STRING,
  imageUrl:Sequelize.STRING,
  type:Sequelize.STRING,
  status:Sequelize.STRING,
  stock:Sequelize.STRING,
 qualite:Sequelize.INTEGER,
  userId:Sequelize.STRING
});
let Cart = sequelize.define('carts', {
  idThing: Sequelize.INTEGER,
  quantite:Sequelize.STRING,
  total:Sequelize.STRING,
  
});
let Review = sequelize.define('reviews', {
  idThing: Sequelize.INTEGER,
  author:Sequelize.STRING,
  review:Sequelize.STRING ,
  rating:Sequelize.INTEGER,
  date:Sequelize.STRING

});
let Buys = sequelize.define('buys', {
  name: Sequelize.STRING,
  type:Sequelize.STRING,
  adresse:Sequelize.STRING,
  total:Sequelize.INTEGER,
  day:Sequelize.INTEGER,
  id_user:Sequelize.INTEGER
});
/*let Chart = sequelize.define('charts', {
  name: Sequelize.STRING,
  valeurs: DataTypes.INTEGER
});*/
let Service = sequelize.define('services', {
  name: Sequelize.STRING,
  type:Sequelize.STRING,
 image:Sequelize.STRING 
});
let Option = sequelize.define('options', {
  name: Sequelize.STRING,
 image:Sequelize.STRING ,
 id_service:Sequelize.INTEGER
});
let Employee = sequelize.define('employees', {
  name: Sequelize.STRING,
 image:Sequelize.STRING ,
 designation:Sequelize.STRING,
 abbr:Sequelize.STRING,
 featured:Sequelize.BOOLEAN,
 description:Sequelize.STRING,
 email:Sequelize.STRING,
 mdp:Sequelize.STRING,
 id_service:Sequelize.INTEGER
 
});
let Feedback = sequelize.define('feedbacks', {
  firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    telnum: Sequelize.INTEGER,
    email: Sequelize.STRING,
    agree:Sequelize.BOOLEAN,
    contacttype: Sequelize.STRING,
    message: Sequelize.STRING,
    id_leader:Sequelize.STRING,
    emailLeader:Sequelize.STRING,
    mdpLeader:Sequelize.STRING
 
});
Feedback.sync().then(() => {
  console.log('New table created');
}).finally(() => {
  sequelize.close();
})
/*var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!"); 
});*/
  /*var sql = "CREATE TABLE `users`(`id` int(11) NOT NULL AUTO_INCREMENT,  `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });*/
  


//app.use(cors)//rod belek
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  app.use(bodyParser.urlencoded({ extended: false}));
  app.use(bodyParser.json());
  

  app.use('/images', express.static(path2.join(__dirname, 'images')));
  app.use('/api/stuff', stuffRoutes);
  app.use('/api/cart', cartRoutes);
  app.use('/api/review', reviewRoutes);
 app.use('/api/contact', contactRoutes);
 app.use('/api/feedback',feedbackRoutes)
 app.use('/api/buys', buysRoutes);
 app.use('/api/service', serviceRoutes);
 app.use('/api/option', optionsRoutes);
 app.use('/api/employee', employeeRoutes);
  app.use('/api/auth', userRoutes);
module.exports=app;