const express = require("express");

const fastcsv = require("fast-csv");
const fs = require("fs");
var bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var cors = require("cors");
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.listen(port, () => console.log(`Listening on port ${port}`));

const userDB = require("../model/users.js");
const productsDB = require("../model/products.js");
const shopsDB = require("../model/shops.js");
const mysql = require("mysql");
const nodemailer = require("nodemailer");

const hash = require("../valiators/hash");
const csvParser = require("csv-parser");

app.use(urlencodedParser);

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: "toktokchiang-temp.cm1v4ooucggd.ap-southeast-1.rds.amazonaws.com",
//   user: "admin",
//   password: "password",
//   database: "toktokchiang",
//   timeout: 4000,
// });

//------------------------------USERS.JS-----------------------------------------------
//ADD USER
app.post("/addUser", (req, res) => {
  var username = req.body.uName;
  var password = req.body.uPass;
  var hashPW = hash(password);
  var email = req.body.uEmail;
  var role = req.body.uRole;

  console.log(username, hashPW, email, role);
  userDB.addUser(username, hashPW, email, role, function (err, result) {
    if (!err) {
      res.status(201);
      res.send(`{"userid": "${result.insertId}"}`);
      console.log(`{"userid":"${result.insertId}"}`);
    } else {
      console.log(err);
      res.status(500).send();
    }
  });
});

//DELETE USER
app.delete("/deleteUser", (req, res) => {
  const uid = req.body.uID;

  userDB.deleteUser(uid, function (err, result) {
    if (!err) {
      res.type("json");
      res.status(204).send({ Message: "Successfully deleted" });
    } else {
      console.log(err);
      res.status(500).send();
    }
  });
});

//GET EMAIL
app.get("/getEmail", (req, res) => {
  const email = req.query.email;
  userDB.getEmail(email, function (err, result) {
    // console.log("Result: " + result)
    if (result === null) {
      // console.log("dont exist");
      return res.status(401).json({ message: "Email not registered!" });
    }
    if (!err) {
      // console.log("correct email");
      return res.status(200).send();
    }
    return res.status(500).send();
  });
});

//INSERT PIN
app.post("/insertPIN", (req, res) => {
  const pin = req.body.pin;
  // console.log("PIN FROM REINSERT PIN API:  " + pin);
  userDB.addPin(pin, (err, result) => {
    if (!err) {
      // console.log("successflly added");
      return res.status(200).json(result);
    } else {
      // console.log("error");
      return res.status(500).send();
    }
  });
});

//DELETE PIN
app.delete("/deletePIN", (req, res) => {
  const pin = req.query.pin;
  // console.log("PIN FROM REDELETE PIN API: " + pin);
  userDB.deletePin(pin, (err, result) => {
    if (!err) {
      // console.log("successflly deleted");
      return res.status(200).json(result);
    } else {
      // console.log("error");
      return res.status(500).send();
    }
  });
});

//GET PIN
app.get("/getPIN", (req, res) => {
  const pin = req.query.pin;
  console.log("Checking database for pin : " + pin);
  userDB.getPin(pin, function (err, result) {
    // console.log("Result: " + result)
    if (result === null) {
      return res.status(401).json({ message: "Incorrect PIN/PIN expired!" });
    }
    if (!err) {
      return res.status(200).send({ message: pin });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  });
});

//UPDATE PASSWORD
app.patch("/updatePassword", (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  const hashPW = hash(password);
  console.log("checking for email: " + email);
  console.log("Checking database for password : " + password);
  console.log("hashed password: " + hashPW);
  userDB.updatePassword(hashPW, email, function (err, result) {
    // console.log("Result: " + result)
    // console.log("Error " + err);
    if (result === null) {
      return res.status(401).json({ message: "Update failed" });
    }
    if (!err) {
      return res.status(200).send();
    }
    return res.status(500).json({ message: "Internal Server Error" });
  });
});

//GET ALL USER
app.get("/getUsers", (req, res) => {
  const id = req.query.id;
  userDB.getUsers(id, function (err, result) {
    if (!err) {
      return res.status(200).json(result);
    } else {
      console.log(err);
      return res.status(500).send();
    }
  });
});

//LOGIN
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const hashedPw = hash(password);

  userDB.login(username, hashedPw, function (err, result) {
    if (result === null) {
      return res.status(401).json({ message: "Invalid Username or Password" });
    }
    if (!err) {
      return res.status(200).json(result);
    }
    return res.status(500).send({ message: "Internal Server Error" });
  });
});

// SEARCH Users
app.get("/searchUsers", function (req, res) {
  var searchQuery = req.query.searchQuery;
  userDB.searchUsers(searchQuery, function (err, result) {
    //
    if (!err) {
      res.type("json");
      res.status(200);
      res.send(result);
    } else {
      console.log(err);
      res.status(500).send();
    }
  });
});

//EDIT USERS
app.patch("/editUsers", (req, res) => {
  const username = req.body.uName;
  const password = req.body.uPass;
  const email = req.body.uEmail;
  const role = req.body.uRole;
  const id = req.body.id;

  userDB.editUser(username, password, email, role, id, (err, result) => {
    if (!err) {
      console.log(result.affectedRows);
      return res.status(200).json({ affectedRows: result.changedRows });
    } else {
      console.log(err);
      return res.status(500).send();
    }
  });
});
//----------------------------- PRODUCTS.JS ---------------------------------------
// GET PRODUCTS
app.get("/getProducts", (req, res) => {
  const shop = req.query.shop;

  productsDB.getProducts(shop, (err, result) => {
    if (!err) {
      return res.status(200).json(result);
    } else {
      console.log(err);
      return res.status(500).send();
    }
  });
});

// GET PRODUCTS - LAZY LOADING FOR FRONTEND
app.post("/getProductsLL", (req, res) => {
  const shop = req.query.shop;
  const startRow = req.body.startRow;
  const endRow = req.body.endRow;

  productsDB.getProductsLL(shop, startRow, endRow, (err, result) => {
    if (!err) {
      return res.status(200).json(result);
    } else {
      console.log(err);
      return res.status(500).send();
    }
  });
});

// ADD PRODUCT
app.post("/addProduct", (req, res) => {
  // console.log(req.files)

  const productName = req.body.pName;
  const productDesc = req.body.pDesc;
  const productPrice = req.body.pPrice;
  const productImage = req.files.pImage.data;
  const productUrl = req.body.pUrl;
  const shop = req.body.shop;

  productsDB.addProducts(
    productName,
    productDesc,
    productPrice,
    productImage,
    productUrl,
    shop,
    (err, result) => {
      if (!err) {
        return res.status(201).json(result);
      } else {
        console.log(err);
        return res.status(500).send();
      }
    }
  );
});

// DELETE PRODUCTS
app.delete("/deleteProduct", (req, res) => {
  const productID = req.body.pID;
  const shop = req.body.shop;

  productsDB.deleteProduct(productID, shop, (err, result) => {
    if (!err) {
      return res.status(200).json(result);
    } else {
      console.log(err);
      return res.status(500).send();
    }
  });
});

//EDIT PRODUCTS
app.patch("/editProduct", (req, res) => {
  // console.log(req.files)

  const productName = req.body.pName;
  const productDesc = req.body.pDesc;
  const productPrice = req.body.pPrice;
  const productImage = req.files.pImage.data;
  const productUrl = req.body.pUrl;
  const shop = req.body.shop;
  const id = req.body.id;

  productsDB.editProduct(
    productName,
    productDesc,
    productPrice,
    productImage,
    productUrl,
    id,
    shop,
    (err, result) => {
      if (!err) {
        // console.log(result.affectedRows)
        return res.status(200).json({ affectedRows: result.affectedRows });
      } else {
        // console.log(err);
        return res.status(500).send();
      }
    }
  );
});

//CREATE SHOPS TABLE
app.post("/createShopTable", (req, res) => {
  const shop = req.body.sName;

  productsDB.createProductTable(shop, (err, result) => {
    if (!err) {
      return res.status(201).json(result);
    } else {
      console.log(err);
      return res.status(500).send();
    }
  });
});

//DROP PRODUCT TABLE
app.delete("/dropProductTable", (req, res) => {
  const sName = req.body.sName;

  productsDB.dropProductTable(sName, (err, result) => {
    if (!err) {
      return res.status(200).json(result);
    } else {
      console.log(err);
      return res.status(500).send();
    }
  });
});

var corsForDownloadCSV = {
  exposedHeader: "Content-Disposition",
};

// DOWNLOAD CSV
app.get("/downloadProductCSV", cors(corsForDownloadCSV), (req, res) => {
  const shop = req.query.shop;
  const ws = fs.createWriteStream(`ttc_products_${shop}.csv`);

  productsDB.getProducts(shop, (err, result) => {
    if (!err) {
      const jsonData = JSON.parse(JSON.stringify(result));
      console.log("jsonData", jsonData);
      fastcsv
        .write(jsonData, { headers: true })
        .pipe(ws)
        .on("finish", function () {
          console.log(`Write to ttc_products_${shop}.csv successfully!`);
          // var filename = `ttc_products_${shop}.csv`;
          var filepath = `./ttc_products_${shop}.csv`;
          res.header("Access-Control-Expose-Headers", "Content-Disposition");
          res.status(200).download(filepath);
        });
    } else {
      console.log(err);
      return res.status(500).send();
    }
  });
});

// SEARCH PRODUCTS
app.get("/search", function (req, res) {
  var searchQuery = req.query.searchQuery;
  var shop = req.query.shop;

  productsDB.searchProducts(shop, searchQuery, function (err, result) {
    //
    if (!err) {
      res.type("json");
      res.status(200);
      res.send(result);
    } else {
      console.log(err);
      res.status(500).send();
    }
  });
});

//----------------------- SHOPS.JS --------------------------------
//GET SHOPS
app.get("/getShops", (req, res) => {
  shopsDB.getShops((err, result) => {
    if (!err) {
      return res.status(200).json(result);
    } else {
      console.log(err);
      return res.status(500).send();
    }
  });
});

//ADD SHOPS
app.post("/addShop", (req, res) => {
  const sName = req.body.sName;

  shopsDB.addShop(sName, (err, result) => {
    if (!err) {
      return res.status(201).json(result);
    } else {
      console.log(err);
      return res.status(500).send();
    }
  });
});

//DELETE SHOPS
app.delete("/deleteShop", (req, res) => {
  const id = req.body.sID;

  shopsDB.deleteShop(id, (err, result) => {
    if (!err) {
      return res.status(200).json({ affectedRows: result.affectedRows });
    } else {
      console.log(err);
      return res.status(500).send();
    }
  });
});

//EDIT SHOP
app.patch("/editShop", (req, res) => {
  const newShop = req.body.sName;
  const id = req.body.id;

  shopsDB.editShop(newShop, id, (err, result) => {
    if (!err) {
      return res.status(200).json(result);
    } else {
      console.log(err);
      return res.status(500).send();
    }
  });
});

// ALTER SHOP TABLE NAME
app.put("/alterTable", (req, res) => {
  const oldShop = req.body.oldShop;
  const newShop = req.body.sName;

  shopsDB.alterTable(oldShop, newShop, (err, result) => {
    if (!err) {
      return res.status(204).json(result.message);
    } else {
      console.log(err);
      return res.status(500).send();
      o;
    }
  });
});

//----------------------- SEND EMAIL --------------------------------

var email = "toktokchiangemails@gmail.com";

const transporter = nodemailer.createTransport({
  // host: "localhost",
  // port: 3001,
  service: "Gmail",
  auth: {
    user: email,
    pass: "HjF0(*3#",
  },
});

app.post("/postEmail", (req, res) => {
  console.log(req.body);
  const values = req.body;

  var printHtml = (values) => {
    console.log(values);
    return `<html>
      <p>
      Name: ${values.name}<br />
      Email: ${values.email}<br />
      Contact No: ${values.phone}<br />
      Message: ${values.message}<br />
      </p>
    </html>`;
  };

  var message = {
    from: email,
    to: email,
    subject: "New Contact Form Response",
    html: printHtml(values),
  };

  // console.log("Message:", message);

  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    } else {
      // console.log(info);
      return res.status(200).send({ message: "Form submitted successfully!" });
    }
  });
});

//API FOR FORGET PW SEND EMAIL
app.post("/sendEmailPin", (req, res) => {
  const values = req.body;
  const time = new Date();
  // console.log("RESEND EMAIL PIN FROM API (Should be same as email/db one): " + values.pin);

  var printHtml = (values) => {
    return `<html>
      <p>
      Hello ${values.email}, <br />  <br />

      Here is your one-time 6 digit token to reset your password: <br />
      ${values.pin} <br />  <br />

      Best wishes,  <br /> 
      TokTokChiang Admin
      </p>
      </html>
    `;
  };

  var emailContent = {
    from: email,
    to: values.email,
    subject: "Password reset for TokTokChiang admin portal",
    html: printHtml(values),
    time: time,
  };

  // console.log(emailContent);

  transporter.sendMail(emailContent, function (err, info) {
    if (err) {
      // console.log(err);
      return res.status(500).send(err);
    } else {
      // console.log(info);
      // console.log("time: " + emailContent.time);
      return res.status(200).send({ message: emailContent.time });
    }
  });
});

// app.get("/getImgAsBlob", (req, res) => {
//   pool.getConnection(function (err, connection) {
//     if (err) throw err;
//     connection.query(
//       "SELECT product_image FROM toktokchiang.dolls",
//       function (err, data, fields) {
//         if (err) res.send(err);
//         if (data) {
//           data.blob().then((res) => {
//             console.log(res);
//             return res.send(res);
//           });
//         }

//         connection.release();
//       }
//     );
//   });
// });

// GET DOLLS
// app.get("/getDolls", (req, res) => {
//   pool.getConnection(function (err, connection) {
//     if (err) throw err;
//     let query = "SELECT * FROM dolls";
//     connection.query(query, (err, result) => {
//       if (err) return res.send(err);
//       if (result) {
//         console.log(result);
//         res.send(result);
//       }
//       connection.release();
//     });
//   });
// });

module.exports = app;
