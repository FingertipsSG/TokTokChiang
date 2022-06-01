var mysql = require("mysql");
var con = mysql.createConnection({
  host: "toktokchiang-temp.cm1v4ooucggd.ap-southeast-1.rds.amazonaws.com",
  user: "admin",
  password: "password",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to RDS DB");
  con.end();
});
