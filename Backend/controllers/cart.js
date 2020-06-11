var mysql = require('mysql');
const fs = require('fs');
const Sequelize = require('sequelize');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
  });
exports.createCart = (req, res, next) => {
  const path = 'mysql://root:@localhost:3306/mydb';
  const sequelize = new Sequelize(path, { operatorsAliases: false ,
    logging: false,
    define: {
        timestamps: false
    }});
   console.log(req.body.cart);
   const cartObject = JSON.parse(req.body.cart);
    let Cart = sequelize.define('carts', {
        idThing: Sequelize.INTEGER,
        quantite:Sequelize.STRING,
        total:Sequelize.STRING

      });
  const cart = Cart.build({ idThing:cartObject.idThing });
cart.save().then(() => {
    console.log('new task saved');
}).finally(() => {
  res.status(201).json({ message: 'Objet enregistré !'});
    sequelize.close();
});
}  

exports.modifyCart= (req, res, next) => {
  const thingObject = req.file ?
    {
      ...JSON.parse(req.body.cart),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    const cartObject=JSON.parse(thingObject['cart']);
    let id = req.params.id;
   
    con.query(
      'UPDATE carts SET quantite = ? ,total= ? Where ID = ?',
      [cartObject.quantite,cartObject.total, cartObject.id],
      (err, result) => {
        if (err) throw err;
    
        console.log(`Changed ${result.changedRows} row(s)`);
        res.send(result);
      }
    );
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