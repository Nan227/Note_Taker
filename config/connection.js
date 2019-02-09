require("dotenv").config();
var mysql = require("mysql");

var db;

// Sets up db to connect locally or on JAWSDB if deployed
if (process.env.JAWSDB_URL) {
  db = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.mySQLP,
    database: "notetaker_db"
  });
}

db.connect(function (err) {
  if (err) {
    throw err;
  }
    console.log("Connection is " + db.threadId);
})
module.exports = db;
