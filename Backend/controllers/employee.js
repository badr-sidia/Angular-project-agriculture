var mysql = require('mysql');
const fs = require('fs');
const Sequelize = require('sequelize');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
  });
exports.createEmployee = (req, res, next) => {
  const path = 'mysql://root:@localhost:3306/mydb';
  const sequelize = new Sequelize(path, { operatorsAliases: false ,
    logging: false,
    define: {
        timestamps: false
    }});
    
    const employeeObject = JSON.parse(req.body.employee);
    console.log(employeeObject.featured)
    employeeObject.image=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   
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
    
  const employee = Employee.build({ name:employeeObject.name,image:employeeObject.image,designation:employeeObject.designation,abbr:employeeObject.abbr,featured:employeeObject.featured,description:employeeObject.description,id_service:employeeObject.id_service,email:employeeObject.email,mdp:employeeObject.mdp});
employee.save().then(() => {
    console.log('new task saved');
}).finally(() => {
  res.status(201).json({ message: 'Objet enregistré !'});
    sequelize.close();
});
              
}
exports.getAllEmployees= (req, res, next) => {
    let id = req.params.id;
    
    let sql = `SELECT * FROM employees WHERE id_service=` + id ;
 
con.query(sql, (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(results);
  res.send(results);
});
}
exports.getFeaturedEmployee= (req, res, next) => {
  
  let sql = `SELECT * FROM employees WHERE featured=` + 1 ;

con.query(sql, (error, results, fields) => {
if (error) {
  return console.error(error.message);
}
console.log(results);
res.send(results[0]);
});
}
exports.getSingleEmployee= (req, res, next) => {
let id=req.params.id
  let sql = `SELECT * FROM employees WHERE id=` + id ;

con.query(sql, (error, results, fields) => {
if (error) {
  return console.error(error.message);
}
console.log(results);
res.send(results[0]);
});
}

exports.deleteEmployee= (req, res, next) => {
  
  let id = req.params.id;
  con.query(
    'DELETE FROM employees WHERE id = ?', [id], (err, result) => {
      if (err) throw err;
  
      console.log(`Deleted ${result.affectedRows} row(s)`);
      res.send(result);
    }
  );
}



