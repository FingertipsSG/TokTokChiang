const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
var db = require('./databaseConfig.js');
app.listen(port, () => console.log(`Listening on port ${port}`));

const mysql = require("mysql");
pool = mysql.createPool({
  connectionLimit: 10,
  host: "toktokchiang-temp.cm1v4ooucggd.ap-southeast-1.rds.amazonaws.com",
  user: "admin",
  password: "password",
  database: "toktokchiang",
  timeout: 4000,

  // connectionLimit: 10,
  // host: "localhost",
  // user: "root",
  // password: "ccxj081102",
  // database: "toktokchiang",
});

// constructor for api return
function api_response(success, data) {
  this.success = success; // bool
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

// to fetch latest password for login check [temp & insecure]
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
          res.json(result);
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
  "password": str // raw
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
          res.json({
            success: inputPwHashed == result[0].password,
          });
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
    if (req.query.password) {
      const hashedPw = hashCode(req.query.password);
      connection.query(
        `INSERT INTO admin (password)
        VALUES ('${hashedPw}')`,
        function (err, result, fields) {
          if (err) res.send(err);
          if (result) {
            console.log("result: " + JSON.stringify(result));
            res.json(result);
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
      // `SELECT * FROM products
      // WHERE deleted_at IS NULL
      // ORDER BY in_order ASC`,
      'SELECT * FROM products',
      function (err, result, fields) {
        if (err) res.send(err);
        if (result) {
          console.log("result: " + JSON.stringify(result));
          res.json(result);
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
  "in_order": int
}
*/
app.post("/postProduct", (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    if (
      req.query.product_name &&
      req.query.product_image &&
      req.query.in_order
    ) {
      connection.query(
        `INSERT INTO products 
        (product_name, product_image, in_order)
        VALUES
        ('${req.query.product_name}', '${req.query.product_image}', ${req.query.in_order})`,
        function (err, result, fields) {
          if (err) res.send(err);
          if (result) {
            console.log("result: " + JSON.stringify(result));
            res.json(result);
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

/* to toggle active status of a product/tab between active '1' and inactive '0'
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
            res.json(result);
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

/* to soft-delete a product/tab
{
  "id": int
}
*/
app.post("/deleteProduct", (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    if (req.query.id) {
      connection.query(
        `UPDATE products
        SET deleted_at = NOW()
        WHERE id = '${req.query.id}'`,
        function (err, result, fields) {
          if (err) res.send(err);
          if (result) {
            console.log("result: " + JSON.stringify(result));
            res.json(result);
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

// to fetch all slides for carousel on home page
app.get("/getSlides", (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      `SELECT * FROM slides
      WHERE deleted_at IS NULL
      ORDER BY in_order ASC`,
      function (err, result, fields) {
        if (err) res.send(err);
        if (result) {
          console.log("result: " + JSON.stringify(result));
          res.json(result);
        }
        if (fields) console.log("fields: " + JSON.stringify(fields));
        connection.release();
      }
    );
  });
});

/* to post new slide in carousel on home page 
{
  "image": str,
  "url": str, // optional, default empty
  "title": str, // optional, default empty
  "description": str, // optional, default empty
  "in_order": int
}
  */
app.post("/postSlide", (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    if (req.query.image && req.query.in_order) {
      let url =
        req.query.url == null ? "NULL" : "'" + String(req.query.url) + "'";
      let title =
        req.query.title == null ? "NULL" : "'" + String(req.query.title) + "'";
      let description =
        req.query.description == null
          ? "NULL"
          : "'" + String(req.query.description) + "'";

      connection.query(
        `INSERT INTO slides 
        (image, url, title, description, in_order)
        VALUES
        ('${req.query.image}', ${url}, ${title}, ${description}, ${req.query.in_order})`,
        function (err, result, fields) {
          if (err) res.send(err);
          if (result) {
            console.log("result: " + JSON.stringify(result));
            res.json(result);
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

/* to soft-delete a slide from carousel
{
  "id": int
}
*/
app.post("/deleteSlide", (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    if (req.query.id) {
      connection.query(
        `UPDATE slides
        SET deleted_at = NOW()
        WHERE id = '${req.query.id}'`,
        function (err, result, fields) {
          if (err) res.send(err);
          if (result) {
            console.log("result: " + JSON.stringify(result));
            res.json(result);
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

/* to fetch sections in_order sequence to a product page/tab
{
  "product_id": int
}
*/
app.get("/getSections", (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      `SELECT * FROM sections
      WHERE product_id = ${req.query.product_id}
      AND deleted_at IS NULL
      ORDER BY in_order ASC`,
      function (err, result, fields) {
        if (err) res.send(err);
        if (result) {
          console.log("result: " + JSON.stringify(result));
          res.json(result);
        }
        connection.release();
      }
    );
  });
});

/* to post new section to product page 
{
  "product_id": int, // FK [parent product]
  "content": str, // optional, default empty [HTML rich-text here]
  "image": str, // optional, default empty [background-image]
  "in_order": int
}
  */
app.post("/postSection", (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    if (req.query.product_id && req.query.in_order) {
      let content =
        req.query.content == null
          ? "NULL"
          : "'" + String(req.query.content) + "'";
      let image =
        req.query.image == null ? "NULL" : "'" + String(req.query.image) + "'";

      connection.query(
        `INSERT INTO sections 
        (product_id, content, image, in_order)
        VALUES
        (${req.query.product_id}, ${content}, ${image}, ${req.query.in_order})`,
        function (err, result, fields) {
          if (err) res.send(err);
          if (result) {
            console.log("result: " + JSON.stringify(result));
            res.json(result);
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

/* to soft-delete a slide from carousel
{
  "id": int
}
*/
app.post("/deleteSection", (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    if (req.query.id) {
      connection.query(
        `UPDATE sections
        SET deleted_at = NOW()
        WHERE id = '${req.query.id}'`,
        function (err, result, fields) {
          if (err) res.send(err);
          if (result) {
            console.log("result: " + JSON.stringify(result));
            res.json(result);
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
