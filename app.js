const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

mysql = require("mysql");
pool = mysql.createPool({
  connectionLimit: 10,
  host: "toktokchiang-temp.cm1v4ooucggd.ap-southeast-1.rds.amazonaws.com",
  user: "admin",
  password: "password",
  database: "toktokchiang-temp",
});

// create a GET route api called api
app.get("/api", (req, res) => {
  const data = [
    { id: 1, message: "First message" },
    { id: 2, message: "Second message" },
    { id: 3, message: "Third message" },
  ];
  res.json(data);
});

// create a hello world api
let helloWorld = "<h1>Hello world!</h1>";
app.get("/", (req, res) => {
  res.send(helloWorld);
});

//
app.get("/getPassword", (req, res) => {
  pool.getConnection(function (err, connection) {
    console.log("Connected to RDS DB");
    if (err) throw err;
    connection.query(
      `SELECT password
      FROM admin
      ORDER BY id DESC
      LIMIT 1`,
      function (err, result, fields) {
        if (err) res.send(err);
        if (result) {
          console.log("pw: " + result[0].password);
          res.send(result);
        }
        //if (fields) console.log(fields);
        connection.release();
      }
    );
  });
});
