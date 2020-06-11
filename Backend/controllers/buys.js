var mysql = require('mysql');
const fs = require('fs');
const Sequelize = require('sequelize');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
  });
exports.createBuys = (req, res, next) => {
  const path = 'mysql://root:@localhost:3306/mydb';
  const sequelize = new Sequelize(path, { operatorsAliases: false ,
    logging: false,
    define: {
        timestamps: false
    }});
   console.log(req.body.buys);
   const buysObject = JSON.parse(req.body.buys);
   
   let Buys = sequelize.define('buys', {
    name: Sequelize.STRING,
    type:Sequelize.STRING,
    adresse:Sequelize.STRING,
    total:Sequelize.INTEGER,
    day:Sequelize.STRING,
    id_user:Sequelize.INTEGER 
  });

  const buys = Buys.build({ name:buysObject.name,type:buysObject.type ,adresse:buysObject.adresse,total:buysObject.total,day:buysObject.date,id_user:buysObject.id_user});
  
buys.save().then(() => {
    console.log('new task saved');
}).finally(() => {
  res.status(201).json({ message: 'Objet enregistré !'});
    sequelize.close();
});
}  

exports.getAllBuys= (req, res, next) => {
  con.query('SELECT * FROM buys', (err, rows, fields) => {
      if (!err){
        
      res.send(rows);
      }
      else
      console.log(err);
      })
}
exports.getBySprice= (req, res, next) => {
  con.query('SELECT Sum(total) FROM buys', (err, rows, fields) => {
      if (!err){
        
      res.send(rows);
      }
      else
      console.log(err);
      })
    }

    exports.getBySomme= (req, res, next) => {
      
      con.query('SELECT DISTINCT name,(SUM(total)*100/(select Sum(total) FROM buys )) as y FROM buys Group By name', (err, rows, fields) => {
          if (!err){
            
          res.send(rows);
          }
          else
          console.log(err);
          })
        }
        exports.getSingleBuy= (req, res, next) => {
          let id=req.params.id
            let sql = `SELECT * FROM buys WHERE id=` + id ;
          
          con.query(sql, (error, results, fields) => {
          if (error) {
            return console.error(error.message);
          }
          console.log(results);
          res.send(results[0]);
          });
          }
          
        exports.getByDate= (req, res, next) => {
      
          con.query('SELECT day,adresse,(SUM(total)) as y FROM buys Group By day,adresse', (err, rows, fields) => {
              if (!err){
                
              res.send(rows);
              }
              else
              console.log(err);
              })
            }