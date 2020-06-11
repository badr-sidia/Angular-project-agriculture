var mysql = require('mysql');
const fs = require('fs');
const Sequelize = require('sequelize');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
  });
exports.createOption = (req, res, next) => {
  const path = 'mysql://root:@localhost:3306/mydb';
  const sequelize = new Sequelize(path, { operatorsAliases: false ,
    logging: false,
    define: {
        timestamps: false
    }});
    
    const optionObject = JSON.parse(req.body.option);
    optionObject.image=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   
    let Option = sequelize.define('options', {
        name: Sequelize.STRING,
       image:Sequelize.STRING ,
       id_service:Sequelize.INTEGER
      });
  
  const option = Option.build({ name:optionObject.name,image:optionObject.image,id_service:optionObject.id_service});
option.save().then(() => {
    console.log('new task saved');
}).finally(() => {
  res.status(201).json({ message: 'Objet enregistré !'});
    sequelize.close();
});
              
}
exports.getAllOptions= (req, res, next) => {
    let id = req.params.id;
    console.log(id)
    let sql = `SELECT * FROM options WHERE id_service=` + id ;
 
con.query(sql, (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(results);
  res.send(results);
});
}
exports.getOneThing= (req, res, next) => {
    let id = req.params.id; // pass argument to query
let sql = `SELECT * FROM thinks WHERE id=` + id ;
 
con.query(sql, (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(results);
  res.send(results[0]);
});
}

/*con.query(sql, (error, results, fields) => {
if (error) {
  return console.error(error.message);
}
console.log(results);
res.send(type);
});
}*/

exports.getOneThingbystatus= (req, res, next) => {
  
  let status = req.params.qualite; // pass argument to query
let sql = `SELECT * FROM thinks WHERE qualite=` + status ;

con.query(sql, (error, results, fields) => {
if (error) {
  return console.error(error.message);
}
console.log(results);
res.send(results[0]);
});
}

