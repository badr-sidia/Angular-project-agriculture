var mysql = require('mysql');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var md5 = require("MD5");
var atob = require('atob');
var Cryptr = require('cryptr'),
cryptr = new Cryptr('myTotalySecretKey');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
  });
exports.signup = (req, res, next) => {
  var email= req.body.email;
  var password= req.body.password;
  let errors = [];
  //Check required fields
  
  if(errors.length>0){

  }else{
      if(email){
          con.query('SELECT * FROM users WHERE email = ?', [email], 
          (error, results, fields)=>{
              if (results.length>0){
                  res.send('Email exists');
              }else{
                  res.send('Reg success')
                  bcrypt.hash(password, 10, (err, hash)=> {
                      if(err)throw err;
                      password = hash;
                      con.query('INSERT INTO users( email, password) VALUES( "'+email+'", "'+password+'")',
                     [email, password]);
                    });
              }
          });
          }else{
              res.send('Enter Email');
          };
  }
    
};

exports.login = (req, res, next) => {
  
  var email=req.body.email;
  var password= req.body.password;
 	
  con.query('SELECT * FROM users WHERE email = ? ',[email], function (error, results, fields) {
    if(results != ""){
      
      bcrypt.compare(req.body.password, results[0].password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        res.status(200).json({
          userId: results[0].id,
          token: jwt.sign(
            { userId: results[0].id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
          )
          });
        
      }).catch(error => res.status(500).json({ error }));
			
    }
  });
  };
  exports.getSingleUser= (req, res, next) => {
    let id=req.params.id
      let sql = `SELECT * FROM users WHERE id=` + id ;
    
    con.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
    res.send(results[0]);
    });
    }
      

