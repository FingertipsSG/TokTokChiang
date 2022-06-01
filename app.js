const express = require("express");
const path = require("path");
const fastcsv = require("fast-csv");
const fs = require("fs");
var bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const jwt = require('jsonwebtoken');

var cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());

const userDB = require("../model/users.js");
const productsDB = require("../model/products.js");
const shopsDB = require("../model/shops.js");
const mysql = require("mysql");
const nodemailer = require("nodemailer");

const hash = require("../valiators/hash");
const csvParser = require("csv-parser");

app.use(urlencodedParser);

app.use(express.static(path.join(__dirname, "..", "..", "build")));
app.use(express.static("public"));

// <--------------------------- Products APIs -------------------------------------->
app.post("/addProduct", (req, res) => {
  var { productname, productdesc, price, url, fk_catid } = req.body;

  productsDB.addProducts(
    productname,
    productdesc,
    price,
    url,
    fk_catid,
    function (err, result) {
      if (!err) {
        res.status(201).send(`{"insertId": "${result.insertId}"}`);
        // console.log(`{"affectedRows": "${result.affectedRows}"}`);
        console.log(result);
      } else {
        console.log(err);
        res.status(500).send();
      }
    }
  );
});

app.patch("/editProduct", (req, res) => {
  var { productname, productdesc, price, url, fk_catid, productid } = req.body;

  productsDB.editProduct(
    productname,
    productdesc,
    price,
    url,
    fk_catid,
    productid,
    function (err, result) {
      if (!err) {
        if (result.affectedRows === 0) {
          console.log({ Message: "This product does not exist" });
          return res
            .status(404)
            .send({ Message: "This product does not exist" });
        }
        console.log(`{"affectedRows": "${result.affectedRows}"}`);
        return res
          .status(200)
          .send(`{"affectedRows": "${result.affectedRows}"}`);
      } else {
        console.log(err);
        res.status(500).send();
      }
    }
  );
});

app.post("/addImage", (req, res) => {
  var { productid, identityid } = req.body;
  var image = req.files.image.data;

  productsDB.addImage(image, productid, identityid, function (err, result) {
    if (!err) {
      res.status(201).send(`{"affectedRows": "${result.affectedRows}"}`);
      console.log(`{"affectedRows": "${result.affectedRows}"}`);
    } else {
      console.log(err);
      res.status(500).send();
    }
  });
});

app.patch("/editImage", (req, res) => {
  var { productid, identityid, imageid } = req.body;
  var image = req.files.image.data;

  productsDB.editImage(image, productid, identityid, imageid, function (err, result) {
      if (!err) {
        if (result.affectedRows === 0) {
          console.log({ Message: "This product does not exist" });
          return res.status(404).send({ Message: "This image does not exist" });
        }
        console.log(`{"affectedRows": "${result.affectedRows}"}`);
        return res
          .status(200)
          .send(`{"affectedRows": "${result.affectedRows}"}`);
      } else {
        console.log(err);
        res.status(500).send();
      }
    }
  );
});

app.delete("/deleteImage", (req, res) => {
  const imageId = req.body.imageID;

  productsDB.deleteImage(imageId, (err, result) => {
    if (!err) {
      console.log(result);
      if (result.affectedRows === 0) {
        console.log({ Message: "This product does not exist" });
        return res.status(404).send({ Message: "This product does not exist" });
      }
      return res.status(204);
    } else {
      console.log(err);
      return res.status(500).send();
    }
  });
});

// GET Products - NON Lazy loading
app.get("/getProducts", (req, res) => {
  const categoryId = req.query.categoryId;

  // Get details of products and the main image NOTE
  productsDB.getProducts(categoryId, (err, result) => {
    if (!err) {
      if (result.length === 0) {
        return res
          .status(404)
          .send({ Message: "This category does not exist" });
      }
      return res.status(200).json(result);
    } else {
      console.log(err);
      return res.status(500).send();
    }
  });
});

// GET Images - Side and back images
app.get("/getOtherImages", (req, res) => {
  const productId = req.query.productId;

  // Get the remaining images for the specified product NOTE
  productsDB.getOtherImages(productId, (err, result) => {
    if (!err) {
      if (result.length === 0) {
        console.log({ Message: "This product does not exist" });
        return res.status(404).send({ Message: "This product does not exist" });
      }
      return res.status(200).json(result);
    } else {
      console.log(err);
      return res.status(500).send();
    }
  });
});

// POST Products - Lazy Loading
// POST is used here since passing in data to request body
// Can use GET as well - Change body data to query parameters
app.post("/getProductsLL", (req, res) => {
  const categoryId = req.query.categoryId;
  const startRow = req.body.startRow;
  const endRow = req.body.endRow;

  productsDB.getProductsLL(categoryId, startRow, endRow, (err, result) => {
    if (result.length === 0) {
      console.log({ Message: "This product does not exist" });
      return res.status(404).send({ Message: "This product does not exist" });
    } else if (!err) {
      return res.status(200).json(result);
    } else {
      console.log(err);
      return res.status(500).send();
    }
  });
});

// DELETE PRODUCTS
app.delete("/deleteProduct", (req, res) => {
  const productId = req.body.pID;

  productsDB.deleteProduct(productId, (err, result) => {
    if (!err) {
      if (result.affectedRows === 0) {
        console.log({ Message: "This product does not exist" });
        return res.status(404).send({ Message: "This product does not exist" });
      }
      return res.status(204).json(result);
    } else {
      console.log(err);
      return res.status(500).send();
    }
  });
});

// SEARCH PRODUCTS
app.get("/search", function (req, res) {
  var searchQuery = req.query.searchQuery;
  var categoryId = req.query.categoryId;

  productsDB.searchProducts(categoryId, searchQuery, function (err, result) {
    if (!err) {
      if (result.length === 0) {
        console.log({ Message: "This product does not exist" });
        return res.status(404).send({ Message: "This product does not exist" });
      }
      return res.status(200).json(result);
    } else {
      console.log(err);
      res.status(500).send();
    }
  });
});

// DOWNLOAD CSV
var corsForDownloadCSV = {
  exposedHeader: "Content-Disposition",
};

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

// DOWNLOAD CSV
var corsForDownloadCSV = {
  exposedHeader: "Content-Disposition",
};

// <--------------------------- Shops APIs -------------------------------------->
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

// Edit shop name
app.put("/editShop", (req, res) => {
  const newName = req.body.newName;
  const id = req.body.id;

  shopsDB.editShop(newName, id, (err, result) => {
    if (!err) {
      console.log(result);
      return res.status(200).send(result);
    } else {
      console.log(err);
      return res.status(500).send();
    }
  });
});

// // ALTER SHOP TABLE NAME
// app.put("/alterTable", (req, res) => {
//   const oldShop = req.body.oldShop;
//   const newShop = req.body.sName;

//   shopsDB.alterTable(oldShop, newShop, (err, result) => {
//     if (!err) {
//       return res.status(204).json(result.message);
//     } else {
//       console.log(err);
//       return res.status(500).send();
//     }
//   });
// });

// <--------------------------- Users APIs -------------------------------------->
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

// <--------------------------- Email APIs -------------------------------------->
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

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || '3000';
app.listen(port, () => console.log(`Server started on Port ${port}`));

module.exports = app;