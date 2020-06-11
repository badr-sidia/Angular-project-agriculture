var mysql = require('mysql');
const fs = require('fs');
const Sequelize = require('sequelize');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
  });
exports.createService = (req, res, next) => {
  const path = 'mysql://root:@localhost:3306/mydb';
  const sequelize = new Sequelize(path, { operatorsAliases: false ,
    logging: false,
    define: {
        timestamps: false
    }});
    //console.log(req.body.service);
    const serviceObject = JSON.parse(req.body.service);
    console.log(serviceObject)
   serviceObject.image=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   console.log(serviceObject.image)
    let Service = sequelize.define('services', {
        name: Sequelize.STRING,
        type:Sequelize.STRING,
       image:Sequelize.STRING  
      });
  
  const service = Service.build({ name:serviceObject.name,type: serviceObject.type,image:serviceObject.image});
service.save().then(() => {
    console.log('new task saved');
}).finally(() => {
  res.status(201).json({ message: 'Objet enregistré !'});
    sequelize.close();
});
           
}
exports.getAllService= (req, res, next) => {
    con.query('SELECT * FROM services', (err, rows, fields) => {
        if (!err){
          
        res.send(rows);
        }
        else
        console.log(err);
        })
}
exports.getOneService= (req, res, next) => {
  let id = req.params.id; // pass argument to query
let sql = `SELECT * FROM services WHERE id=` + id ;

con.query(sql, (error, results, fields) => {
if (error) {
  return console.error(error.message);
}
console.log(results);
res.send(results[0]);
});
}

exports.deleteService= (req, res, next) => {
  
  let id = req.params.id;
  con.query(
    'DELETE FROM services WHERE id = ?', [id], (err, result) => {
      if (err) throw err;
  
      console.log(`Deleted ${result.affectedRows} row(s)`);
      res.send(result);
    }
  );
}