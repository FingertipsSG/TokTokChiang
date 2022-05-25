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
app.use(fileUpload());

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

module.exports = app;