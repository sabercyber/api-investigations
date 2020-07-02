//jshint esversion:6

var express = require('express')
var bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose();

var app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })

// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
  res.send('welcome, ' + JSON.stringify(req.body))
  var data = {
    Firstname: req.body.Firstname,
    Lastname: req.body.Lastname,
    Email: req.body.Email,
    City : req.body.City
}

console.log(data)
console.log(req.body)


})

// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
  // create user in req.body
  var data = {
    Firstname: req.body.Firstname,
    Lastname: req.body.Lastname,
    Email: req.body.Email,
    City : req.body.City
}

console.log(data)


let db = new sqlite3.Database('./.db/customers.db'); 
    var sql ='INSERT INTO customers (Firstname, Lastname, Email, City) VALUES (?,?,?,?)'
    var params =[data.Firstname, data.Lastname, data.Email, data.City]
    db.run(sql, params, function (err) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        else {
            res.status(200).json({"Status": "POSTED"})
        }
        
    }
    
    );
    db.close();
  
})



app.get('/api/info', function (req, res) {
   
    console.log(req.query.Firstname)
    
    
    // open the database
    let db = new sqlite3.Database('./.db/customers.db'); 
    let sql_2 = `SELECT * FROM customers ORDER BY Firstname`;
    
    db.all(sql_2, [], (err, rows) => {
        if (err) {
          throw err;
        }
      
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.send((JSON.stringify(rows)) + '\n')
        
      });
      
      
    // close the database connection
     db.close();
  }
)


app.post('/api/create-db', jsonParser, function (req, res)
{

  // create user in req.body
  
  
  let jsonData = req.body
  let db_name = jsonData.dbname
  let table_list = jsonData.dbtable 

  
  let values = ""
  
  let db_path = "./.db/"+db_name+".db"
  let db = new sqlite3.Database(db_path); 
  
  for (let i =0 ; i < jsonData.dbtable.length;i++)
  {
     values = jsonData.dbtable[i]
   //setup up access 
   
   let columns = ""
   for (let j = 0 ;j < jsonData[values].length;j++ )
    {
      columns += " "+ jsonData[values][j].value_name + "  " + jsonData[values][j].value_type 
      if (j < jsonData[values].length - 1)
        columns += ","
   //console.log(values)
   //console.log(jsonData[values][j].value_name + " : " + jsonData[values][j].value_type )
    }
    
  
  
  let db_table = " CREATE TABLE IF NOT EXISTS " + values + " ("+ columns + ");" 
  console.log(db_table)

    
    
    db.run(db_table) 
    //reset the columns
    columns = ""
    
}
    db.close();
    
res.sendStatus(200)
}
)



// POST /api/users gets JSON bodies
app.post('/api/cart_data', jsonParser, function (req, res) {
  // create user in req.body
  var data = {
    card_id: req.body.cart_id,
    PV_voltage: req.body.Solar_Panel_Voltage,
    Inverter_voltage: req.body.Inverter_Voltage,
    Load_voltage : req.body.Load_Voltage
}

console.log(req.body)
let db = new sqlite3.Database('./.db/information.db'); 
    var sql ='INSERT INTO cart_data (cart_id, Solar_Panel_Voltage, Inverter_Voltage, Load_Voltage) VALUES (?,?,?,?)'
    var params =[data.card_id, data.PV_voltage, data.Inverter_voltage, data.Load_voltage]
    db.run(sql, params, function (err) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        else {
            res.status(200).json({"Status": "POSTED"})
        }
        
    }
    
    );
    db.close();
  
})

//get all cart data
app.get('/api/cart_info', function (req, res) {
   
  console.log(req.query.cart_id)
    
  // open the database
  let db = new sqlite3.Database('./.db/information.db'); 
  let sql_2 = `SELECT * FROM cart_data ORDER BY cart_id`;
  
  db.all(sql_2, [], (err, rows) => {
      if (err) {
        throw err;
      }
    
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.send((JSON.stringify(rows)) + '\n')
      
    });
    
    
  // close the database connection
   db.close();
}
)

//get all career info
app.get('/api/career_info', function (req, res) {
   
  
    
  // open the database
  let db = new sqlite3.Database('./.db/career_info.db'); 
  let sql_1 = `SELECT * FROM personal_data`;
  
  db.all(sql_1, [], (err, rows) => {
      if (err) {
        throw err;
      }
    
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.send((JSON.stringify(rows)) + '\n')
      
    });
    
    
  // close the database connection
   db.close();
}
)

//get all career info
app.post('/api/update_career_person_data', jsonParser, function (req, res) {
  // create user in req.body
  var data = {
    name: req.body.name,
    experience: req.body.experience,
    languages: req.body.languages,
    experience_summary : req.body.experience_summary
}

console.log(data)
let db = new sqlite3.Database('./.db/career_info.db'); 
    var sql ='INSERT INTO personal_data (name, experience, languages, experience_summary) VALUES (?,?,?,?)'
    var params =[data.name, data.experience, data.languages, data.experience_summary]
    db.run(sql, params, function (err) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        else {
            res.status(200).json({"Status": "POSTED"})
        }
        
    }
    
    );
    db.close();
    
  
})

app.listen(9990, function() {
 console.log("server running on 9990")
}
)





