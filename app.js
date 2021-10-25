const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

const mysql = require("mysql");
pool = mysql.createPool({
  connectionLimit: 10,
  host: "toktokchiang-temp.cm1v4ooucggd.ap-southeast-1.rds.amazonaws.com",
  user: "admin",
  password: "password",
  database: "toktokchiang-temp",
  timeout: 4000,
});

// constructor for api return
function api_response(success, status, message, data) {
  this.success = success; // bool
  this.status = status; // int
  this.message = message; // str
  this.data = data; // obj
}

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

// to fetch latest password for login check [temp]
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

// to hash passwords with 32-bit integer math
const hashCode = (str) => {
  var hash = 0;
  if (str.length == 0) {
    return hash;
  }
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    hash = (hash << 5) - hash + c;
    hash = hash & hash;
  }
  return hash;
};

/* to get bool on checking hashed password
{
  "password": str //raw
}
*/
app.get("/checkPassword", (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const inputPwHashed = hashCode(req.query.password);
    connection.query(
      `SELECT password
      FROM admin
      ORDER BY id DESC
      LIMIT 1`,
      function (err, result, fields) {
        if (err) res.send(false);
        if (result) {
          console.log(
            "input: " + inputPwHashed + " stored: " + result[0].password
          );
          res.send(inputPwHashed == result[0].password);
        }
        connection.release();
      }
    );
  });
});

// latest hashed password: ult!m@T3

/* to post new password (change)
{
  "password": str // raw
}
*/
app.post("/postPassword", (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const hashedPw = hashCode(req.query.password);
    if (req.query.password) {
      connection.query(
        `INSERT INTO admin (password)
        VALUES ('${hashedPw}')`,
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

// to fetch all products (& tabs/grids) in_order sequence
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

/* to post new product (& tab/grid)
{
  "product_name": str,
  "product_image": str,
  "mast_image": str, // img for home page masthead
  "in_order": int
}
*/
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
        ('${req.query.product_name}', '${req.query.product_image}', '${req.query.mast_image}', '${req.query.in_order}')`,
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

/* to toggle active status of product/tab
{
  "id": int
}
*/
app.post("/toggleProductActive", (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    if (req.query.id) {
      connection.query(
        `UPDATE products
        SET active = (IF(active = '1', '0', '1'))
        WHERE id = '${req.query.id}'`,
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
