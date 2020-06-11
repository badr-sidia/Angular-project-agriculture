var mysql = require('mysql');

const Sequelize = require('sequelize');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
  });
exports.createReview = (req, res, next) => {
  const path = 'mysql://root:@localhost:3306/mydb';
  const sequelize = new Sequelize(path, { operatorsAliases: false ,
    logging: false,
    define: {
        timestamps: false
    }});
   console.log(req.body.review);
   const reviewObject = JSON.parse(req.body.review);
   let Review = sequelize.define('reviews', {
    idThing: Sequelize.INTEGER,
    author:Sequelize.STRING,
    review:Sequelize.STRING ,
    rating:Sequelize.INTEGER,
    date:Sequelize.STRING
  });
  const review = Review.build({ idThing:reviewObject.idThing ,author:reviewObject.author,review:reviewObject.review,rating:reviewObject.rating,date:reviewObject.date});
review.save().then(() => {
    console.log('new task saved');
}).finally(() => {
  res.status(201).json({ message: 'Objet enregistré !'});
    sequelize.close();
});
}  

exports.getReviewByid= (req, res, next) => {
    let id = req.params.id; // pass argument to query
let sql = `SELECT * FROM reviews WHERE idThing=` + id ;
 
con.query(sql, (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(results);
  res.send(results);
});
}

exports.getAllCarts= (req, res, next) => {
  con.query('SELECT * FROM carts', (err, rows, fields) => {
      if (!err){
        
      res.send(rows);
      }
      else
      console.log(err);
      })
} 
exports.getThingbyrating= (req, res, next) => {
  let id = req.params.id; // pass argument to query
let sql = `SELECT idThing,avg(rating) as star FROM reviews Group by idThing` ;

con.query(sql, (error, results, fields) => {
if (error) {
  return console.error(error.message);
}
console.log(results);
res.send(results);
});
}         