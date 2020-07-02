const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('./.db/customers.db');

let sql = `SELECT Firstname firstName,
                  Lastname lastName,
                  Email email
            FROM customers
            WHERE City = ?
            ORDER BY FirstName`;

let sql_2 = `SELECT * FROM customers ORDER BY Firstname`;


db.each(sql, ['Bangalore'], (err, row) => {
  if (err) {
    throw err;
  }
  console.log(`${row.firstName} ${row.lastName} - ${row.email}`);
});

db.all(sql_2, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
        console.log(rows);
    });
  });

  

// close the database connection
db.close();