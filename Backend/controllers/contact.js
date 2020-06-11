var mysql = require('mysql');

var nodemailer = require('nodemailer');

const Sequelize = require('sequelize');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
  });
exports.createContact = (req, res, next) => {
  const path = 'mysql://root:@localhost:3306/mydb';
  const sequelize = new Sequelize(path, { operatorsAliases: false ,
    logging: false,
    define: {
        timestamps: false
    }});
   console.log(req.body.contact);
   const contactObject = JSON.parse(req.body.contact);
   var email=contactObject.email;
   var mdp="Informatic2019";
   var subject=contactObject.subject;
   var message=contactObject.message;
   /*console.log(email);
   console.log(mdp);
   console.log(subject);
   console.log(message);*/
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: email,
      pass: mdp
    }
  });
  
  var mailOptions = {
    from: email,
    to: email,
    subject: subject,
    text: message
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
    /*let Cart = sequelize.define('carts', {
        idThing: Sequelize.INTEGER,
        quantite:Sequelize.STRING,
        total:Sequelize.STRING,
        
      });
  const cart = Cart.build({ idThing:cartObject.idThing });
cart.save().then(() => {
    console.log('new task saved');
}).finally(() => {
  res.status(201).json({ message: 'Objet enregistré !'});
    sequelize.close();
});*/
}  