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

// to fetch latest password for login check
app.get("/getPassword", (req, res) => {
  pool.getConnection(function (err, connection) {
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
        connection.release();
      }
    );
  });
});

// to post new password (change)
app.post("/postPassword", (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    if (req.query.password) {
      connection.query(
        `INSERT INTO admin (password)
        VALUES (${req.query.password})`,
        function (err, result, fields) {
          if (err) res.send(err);
          if (result) {
            console.log("result: " + JSON.stringify(result));
            res.send(result);
          }
          if (fields) console.log("fields: " + JSON.stringify(fields));
          connection.release();
        }
      );
    } else {
      console.log("Missing a parameter");
    }
  });
});

// to fetch all products in_order sequence
app.get("/getProducts", (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      `SELECT *
      FROM products
      ORDER BY in_order ASC`,
      function (err, result, fields) {
        if (err) res.send(err);
        if (result) {
          console.log("result: " + JSON.stringify(result));
          res.send(result);
        }
        connection.release();
      }
    );
  });
});

// to post new product (& tab/grid)
app.post("/postProduct", (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    if (
      req.query.product_name &&
      req.query.product_image &&
      req.query.mast_image &&
      req.query.in_order
    ) {
      connection.query(
        `INSERT INTO products 
        (product_name, product_image, mast_image, in_order)
        VALUES
        (${req.query.product_name}, ${req.query.product_image}, ${req.query.mast_image}, ${req.query.in_order})`,
        function (err, result, fields) {
          if (err) res.send(err);
          if (result) {
            console.log("result: " + JSON.stringify(result));
            res.send(result);
          }
          if (fields) console.log("fields: " + JSON.stringify(fields));
          connection.release();
        }
      );
    } else {
      console.log("Missing a parameter");
    }
  });
});
