var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "toktokchiang-temp.cm1v4ooucggd.ap-southeast-1.rds.amazonaws.com",
  user: "admin",
  password: "password",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to RDS DB");
  connection.end();
});
