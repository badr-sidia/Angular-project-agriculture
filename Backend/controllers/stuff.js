var mysql = require('mysql');
const fs = require('fs');
const Sequelize = require('sequelize');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
  });
exports.createThing = (req, res, next) => {
  const path = 'mysql://root:@localhost:3306/mydb';
  const sequelize = new Sequelize(path, { operatorsAliases: false ,
    logging: false,
    define: {
        timestamps: false
    }});
    
    const thingObject = JSON.parse(req.body.thing);
    thingObject.imageUrl=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   
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
  
  const think = Think.build({ title:thingObject.title,description: thingObject.description ,price:thingObject.price,imageUrl:thingObject.imageUrl, type:thingObject.type,status:thingObject.status,stock:thingObject.stock,qualite:thingObject.qualite,userId:thingObject.userId});
think.save().then(() => {
    console.log('new task saved');
}).finally(() => {
  res.status(201).json({ message: 'Objet enregistré !'});
    sequelize.close();
});
              
}
exports.getAllStuff= (req, res, next) => {
    con.query('SELECT * FROM thinks', (err, rows, fields) => {
        if (!err){
          
        res.send(rows);
        }
        else
        console.log(err);
        })
}
exports.getAllStuffid= (req, res, next) => {
  con.query('SELECT id  FROM thinks', (err, rows, fields) => {
      if (!err){
        
      res.send(rows);
      }
      else
      console.log(err);
      })
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
exports.getOneThingbytype= (req, res, next) => {
  
  let type = req.params.type; // pass argument to query
//let sql = `SELECT * FROM thinks WHERE type=  type`  ;
con.query('SELECT * FROM thinks WHERE type = ?', [type], 
(err, results, fields)=>{
  if (!err){
    
  res.send(results);
  }
  else
  console.log(err);
  })
 ;
}
/*con.query(sql, (error, results, fields) => {
if (error) {
  return console.error(error.message);
}
console.log(results);
res.send(type);
});
}*/
exports.getOneThingbyqu= (req, res, next) => {
  
  let qualite = req.params.qualite; // pass argument to query
  let fruit=req.params.type;
console.log(fruit)
  con.query(
  'SELECT * FROM thinks WHERE qualite = ? AND type= ?',
  [qualite,fruit],
  (err, result) => {
    if (err) throw err;

    
    res.send(result);
  }
);

}

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

exports.getThingHprice= (req, res, next) => {
  
  let price = req.params.price; // pass argument to query
  
let sql = `SELECT * FROM thinks WHERE price >=` + price ;

con.query(sql, (error, results, fields) => {
if (error) {
  return console.error(error.message);
}
console.log(results);
res.send(results);
});
}
exports.getThingLprice= (req, res, next) => {
  
  let price = req.params.price; // pass argument to query
  
let sql = `SELECT * FROM thinks WHERE price <` + price ;

con.query(sql, (error, results, fields) => {
if (error) {
  return console.error(error.message);
}
console.log(results);
res.send(results);
});
}

exports.modifyThing= (req, res, next) => {
  const thingObject = req.file ?
    {
      ...JSON.parse(req.body.thing),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    let id = req.params.id;
    let title=req.body.title;
    let description=req.body.description;
    let price=req.body.price;
    let imageUrl=req.body.imageUrl;
    con.query(
      'UPDATE thinks SET title = ? ,description= ?,price= ?,imageUrl= ? ,type= ? ,status= ? ,stock= ?,qualite=? Where ID = ?',
      [thingObject.title,thingObject.description,thingObject.price,thingObject.imageUrl,thingObject.type,thingObject.status,thingObject.stock,thingObject.qualite, id],
      (err, result) => {
        if (err) throw err;
    
        console.log(`Changed ${result.changedRows} row(s)`);
        res.send(result);
      }
    );
}
exports.deleteThing= (req, res, next) => {
  
    let id = req.params.id;
    con.query(
      'DELETE FROM thinks WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
    
        console.log(`Deleted ${result.affectedRows} row(s)`);
        res.send(result);
      }
    );
}
