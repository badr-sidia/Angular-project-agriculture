var mysql = require('mysql');

var nodemailer = require('nodemailer');

const Sequelize = require('sequelize');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
  });
exports.createFeedback = (req, res, next) => {
  const path = 'mysql://root:@localhost:3306/mydb';
  const sequelize = new Sequelize(path, { operatorsAliases: false ,
    logging: false,
    define: {
        timestamps: false
    }});
   //console.log(req.body.contact);
   const feedbackObject = JSON.parse(req.body.feedback);
   console.log(feedbackObject)
   var emailLeader=feedbackObject.emailLeader;
   var email=feedbackObject.email
   var mdp=feedbackObject.mdpLeader;
  var subject="jjjjjjjjjj";
   var message=feedbackObject.message;
   /*console.log(email);
   console.log(mdp);
   console.log(subject);
   console.log(message);*/
  var transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: emailLeader,
      pass: mdp
    }
  });
  
  var mailOptions = {
    from: emailLeader,
    to: emailLeader,
    subject:subject,
    text: message
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
    
}  