const express = require("express");
const path = require("path");

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

const userDB = require("../model/users.js");
const productsDB = require("../model/products.js");
const shopsDB = require("../model/shops.js");
const mysql = require("mysql");
const nodemailer = require("nodemailer");

const hash = require("../valiators/hash");
const csvParser = require("csv-parser");

app.use(urlencodedParser);
app.use(fileUpload());

app.use(express.static(path.join(__dirname, "..", "..", "build")));
app.use(express.static("public"));

// app.get('/', (req, res, next) => { 
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
// });

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post("/addProduct", (req, res) => {
    var { productname, productdesc, price, url, fk_catid } = req.body;

    productsDB.addProducts(productname, productdesc, price, url, fk_catid, function (err, result) {
      if (!err) {
        res.status(201).send(`{"affectedRows": "${result.affectedRows}"}`);
        console.log(`{"affectedRows": "${result.affectedRows}"}`);
      } else {
        console.log(err);
        res.status(500).send();
      }
    });
})

app.patch("/editProduct", (req, res) => {
    var { productname, productdesc, price, url, fk_catid, productid } = req.body;

    productsDB.editProduct(productname, productdesc, price, url, fk_catid, productid, function (err, result) {
      if (!err) {
        if (result.affectedRows === 0) {
          console.log({"Message": "This product does not exist"});
          return res.status(404).send({"Message": "This product does not exist"});
        }
        console.log(`{"affectedRows": "${result.affectedRows}"}`);
        return res.status(200).send(`{"affectedRows": "${result.affectedRows}"}`);
      } else {
        console.log(err);
        res.status(500).send();
      }
    });
})

app.post("/image", (req, res) => {
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
})

app.patch("/image", (req, res) => {
    var { productid, identityid, imageid } = req.body;
    var image = req.files.image.data;

    productsDB.editImage(image, productid, identityid, imageid, function (err, result) {
      if (!err) {
        if (result.affectedRows === 0) {
          console.log({"Message": "This product does not exist"});
          return res.status(404).send({"Message": "This image does not exist"});
        }
          console.log(`{"affectedRows": "${result.affectedRows}"}`);
          return res.status(200).send(`{"affectedRows": "${result.affectedRows}"}`);
      } else {
        console.log(err);
        res.status(500).send();
      }
    });
})

// GET Products - NON Lazy loading
app.get("/getProducts", (req, res) => {
  const categoryId = req.query.categoryId;

  // Get details of products and the main image NOTE
  productsDB.getProducts(categoryId, (err, result) => {
    if (!err) {
      if (result.length === 0) {
        return res.status(404).send({"Message": "This category does not exist"});
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
        console.log({"Message": "This product does not exist"});
        return res.status(404).send({"Message": "This product does not exist"});
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
      console.log({"Message": "This product does not exist"});
      return res.status(404).send({"Message": "This product does not exist"});
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
        console.log({"Message": "This product does not exist"});
        return res.status(404).send({"Message": "This product does not exist"});
      }
      return res.status(204).json(result);
    } else {
      console.log(err);
      return res.status(500).send();
    }
  });
});

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

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
});

module.exports = app;