var db = require("./databaseConfig.js");
productsDB = {};

// // GET PRODUCTS
// productsDB.getProducts = function (shop, callback) {
//   console.log(shop);
//   var conn = db.getConnection();
//   conn.connect(function (err) {
//     if (err) {
//       console.log(err);
//       return callback(err, null);
//     } else {
//       console.log("Connected!");
//       var sql = `SELECT * FROM ` + shop;
//       conn.query(sql, function (err, result) {
//         conn.end();
//         if (err) {
//           console.log(err);
//           return callback(err, null);
//         } else {
//           // console.log(result);
//           return callback(null, result);
//         }
//       });
//     }
//   });
// };

// // GET PRODUCTS LAZY LOAD
// productsDB.getProductsLL = function (shop, startRow, endRow, callback) {
//   var conn = db.getConnection();
//   conn.connect(function (err) {
//     if (err) {
//       console.log(err);
//       return callback(err, null);
//     } else {
//       console.log("Connected!");
//       var sql = `SELECT * FROM ${shop} LIMIT ${startRow},${endRow};`;
//       conn.query(sql, function (err, result) {
//         conn.end();
//         if (err) {
//           console.log(err);
//           return callback(err, null);
//         } else {
//           // console.log(result);
//           return callback(null, result);
//         }
//       });
//     }
//   });
// };

// // ADD PRODUCT
// productsDB.addProducts = function (
//   product_name,
//   product_description,
//   product_price,
//   product_image,
//   buy_url,
//   shop,
//   callback
// ) {
//   console.log(
//     product_name,
//     product_description,
//     product_price,
//     product_image,
//     buy_url,
//     shop
//   );
//   var conn = db.getConnection();
//   conn.connect(function (err) {
//     if (err) {
//       console.log(err);
//       return callback(err, null);
//     } else {
//       console.log("Connected!");

//       var sql =
//         "INSERT INTO " +
//         shop +
//         "(product_name, product_description, product_price, product_image, buy_url) VALUES (?,?,?,?,?)";

//       conn.query(
//         sql,
//         [
//           product_name,
//           product_description,
//           product_price,
//           product_image,
//           buy_url,
//         ],
//         function (err, result) {
//           conn.end();
//           if (err) {
//             console.log(err);
//             return callback(err, null);
//           } else {
//             console.log(result);
//             return callback(null, result);
//           }
//         }
//       );
//     }
//   });
// };

// // DELETE PRODUCT
// productsDB.deleteProduct = function (product_id, shop, callback) {
//   console.log(product_id);
//   var conn = db.getConnection();
//   conn.connect(function (err) {
//     if (err) {
//       console.log(err);
//       return callback(err, null);
//     } else {
//       console.log("Connected!");
//       var sql = "DELETE FROM " + shop + " WHERE product_id = ?";
//       conn.query(sql, [product_id], function (err, result) {
//         conn.end();
//         if (err) {
//           console.log(err);
//           return callback(err, null);
//         } else {
//           console.log(result);
//           return callback(null, result);
//         }
//       });
//     }
//   });
// };

// //EDIT PRODUCT
// productsDB.editProduct = function (
//   productName,
//   productDesc,
//   productPrice,
//   productImage,
//   productUrl,
//   id,
//   shop,
//   callback
// ) {
//   var conn = db.getConnection();
//   conn.connect(function (err) {
//     if (err) {
//       console.log(err);
//       return callback(err, null);
//     } else {
//       console.log("Connected!");
//       const sql =
//         "UPDATE " +
//         shop +
//         " SET product_name = ?, product_description = ?, product_price = ?, product_image = ?, buy_url = ? WHERE product_id = ?";
//       conn.query(
//         sql,
//         [productName, productDesc, productPrice, productImage, productUrl, id],
//         function (err, result) {
//           conn.end();
//           if (err) {
//             console.log(err);
//             return callback(err, null);
//           } else {
//             console.log(result);
//             return callback(null, result);
//           }
//         }
//       );
//     }
//   });
// };

// // POST createProductTable
// productsDB.createProductTable = function (shop, callback) {
//   var conn = db.getConnection();
//   conn.connect(function (err) {
//     if (err) {
//       console.log(err);
//       return callback(err, null);
//     } else {
//       console.log("Connected!");

//       var sql =
//         "CREATE TABLE " +
//         shop +
//         " ( \
//             `product_id` int NOT NULL AUTO_INCREMENT, \
//             `product_name` varchar(255) DEFAULT NULL, \
//             `product_description` varchar(1500) DEFAULT NULL, \
//             `product_price` DECIMAL(5,2) DEFAULT NULL, \
//             `product_image` varchar(45) DEFAULT NULL, \
//             `buy_url` varchar(255) DEFAULT NULL, \
//             PRIMARY KEY (`product_id`) \
//           ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;";
//       conn.query(sql, function (err, result) {
//         conn.end();
//         if (err) {
//           console.log(err);
//           return callback(err, null);
//         } else {
//           console.log(result);
//           return callback(null, result);
//         }
//       });
//     }
//   });
// };

// // DELETE dropProductTable
// productsDB.dropProductTable = function (sName, callback) {
//   console.log(sName);
//   var conn = db.getConnection();
//   conn.connect(function (err) {
//     if (err) {
//       console.log(err);
//       return callback(err, null);
//     } else {
//       console.log("Connected!");
//       var sql = "DROP TABLE toktokchiang." + sName + ";";
//       conn.query(sql, function (err, result) {
//         conn.end();
//         if (err) {
//           console.log(err);
//           return callback(err, null);
//         } else {
//           console.log(result);
//           return callback(null, result);
//         }
//       });
//     }
//   });
// };

// // TO SEARCH
// productsDB.searchProducts = function (shop, searchQuery, callback) {
//   var conn = db.getConnection();
//   conn.connect(function (err) {
//     if (err) {
//       console.log(err);
//       return callback(err, null);
//     } else {
//       console.log("Connected!");
//       var sql =
//         "SELECT * FROM " +
//         shop +
//         " WHERE product_name LIKE " +
//         `'%${searchQuery}%'`;
//       conn.query(sql, function (err, result) {
//         conn.end();
//         if (err) {
//           console.log(err);
//           return callback(err, null);
//         } else {
//           console.log(result);
//           return callback(null, result);
//         }
//       });
//     }
//   });
// };

// GET Products - NON Lazy Loading
productsDB.getProducts = function (categoryId, callback) {
  // console.log(catId);
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      // fk_identityid = 1 : Get the main image of product
      // catId: Get the correct type of products
      var sql = `SELECT productid, productname, productdesc, price, url, image
                FROM products
                JOIN images
                ON products.productid = images.fk_productid
                WHERE fk_catid = ? AND fk_identityid = 1`;
      conn.query(sql, [categoryId], function (err, result) {
        conn.end();
        if (err) {
          console.log(err);
          return callback(err, null);
        } else {
          // console.log(result);
          return callback(null, result);
        }
      });
    }
  });
};

// GET Images - Side and back images
productsDB.getOtherImages = function (productId, callback) {
  console.log(productId);
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      // fk_identityid != 1 : Get all images except for main image
      // productId : Get images for specific product
      var sql = `SELECT image
                FROM products
                JOIN images
                ON products.productid = images.fk_productid
                WHERE fk_productid = ? AND fk_identityid != 1
                ORDER BY fk_identityid ASC`;
      conn.query(sql, [productId], function (err, result) {
        conn.end();
        if (err) {
          console.log(err);
          return callback(err, null);
        } else {
          // console.log(result);
          return callback(null, result);
        }
      });
    }
  });
};

// DELETE PRODUCT
productsDB.deleteProduct = function (product_id, shop, callback) {
  console.log(product_id);
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      var sql = "DELETE FROM " + shop + " WHERE product_id = ?";
      conn.query(sql, [product_id], function (err, result) {
        conn.end();
        if (err) {
          console.log(err);
          return callback(err, null);
        } else {
          console.log(result);
          return callback(null, result);
        }
      });
    }
  });
};

// LEFTOFFAT

// // GET Products - NON Lazy Loading
// productsDB.getProducts = function (catId, callback) {
//   // console.log(catId);
//   var conn = db.getConnection();
//   conn.connect(function (err) {
//     if (err) {
//       console.log(err);
//       return callback(err, null);
//     } else {
//       console.log("Connected!");
//       var sql = `SELECT * FROM ` + shop;
//       conn.query(sql, function (err, result) {
//         conn.end();
//         if (err) {
//           console.log(err);
//           return callback(err, null);
//         } else {
//           // console.log(result);
//           return callback(null, result);
//         }
//       });
//     }
//   });
// };

// // GET PRODUCTS LAZY LOAD
// productsDB.getProductsLL = function (shop, startRow, endRow, callback) {
//   var conn = db.getConnection();
//   conn.connect(function (err) {
//     if (err) {
//       console.log(err);
//       return callback(err, null);
//     } else {
//       console.log("Connected!");
//       var sql = `SELECT * FROM ${shop} LIMIT ${startRow},${endRow};`;
//       conn.query(sql, function (err, result) {
//         conn.end();
//         if (err) {
//           console.log(err);
//           return callback(err, null);
//         } else {
//           // console.log(result);
//           return callback(null, result);
//         }
//       });
//     }
//   });
// };

// // DELETE PRODUCT
// productsDB.deleteProduct = function (product_id, shop, callback) {
//   console.log(product_id);
//   var conn = db.getConnection();
//   conn.connect(function (err) {
//     if (err) {
//       console.log(err);
//       return callback(err, null);
//     } else {
//       console.log("Connected!");
//       var sql = "DELETE FROM " + shop + " WHERE product_id = ?";
//       conn.query(sql, [product_id], function (err, result) {
//         conn.end();
//         if (err) {
//           console.log(err);
//           return callback(err, null);
//         } else {
//           console.log(result);
//           return callback(null, result);
//         }
//       });
//     }
//   });
// };

// LEFTOFFAT

// GET Products - NON Lazy Loading
productsDB.getProducts = function (categoryId, callback) {
  // console.log(categoryId);
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      // fk_identityid = 1 : Get the main image of product
      // categoryId: Get the correct type of products
      var sql = `SELECT productid, productname, productdesc, price, url, image
                FROM products
                JOIN images
                ON products.productid = images.fk_productid
                WHERE fk_catid = ? AND fk_identityid = 1`;
      conn.query(sql, [categoryId], function (err, result) {
        conn.end();
        if (err) {
          console.log(err);
          return callback(err, null);
        } else {
          // console.log(result);
          return callback(null, result);
        }
      });
    }
  });
};

// GET Images - Side and back images
productsDB.getOtherImages = function (productId, callback) {
  console.log(productId);
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      // fk_identityid != 1 : Get all images except for main image
      // productId : Get images for specific product
      var sql = `SELECT image
                FROM products
                JOIN images
                ON products.productid = images.fk_productid
                WHERE fk_productid = ? AND fk_identityid != 1
                ORDER BY fk_identityid ASC`;
      conn.query(sql, [productId], function (err, result) {
        conn.end();
        if (err) {
          console.log(err);
          return callback(err, null);
        } else {
          // console.log(result);
          return callback(null, result);
        }
      });
    }
  });
};

// Get Products - Lazy Loading
productsDB.getProductsLL = function (categoryId, startRow, endRow, callback) {
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      var sql = `SELECT productid, productname, productdesc, price, url, image
      FROM products
      JOIN images
      ON products.productid = images.fk_productid
      WHERE fk_catid = ? AND fk_identityid = 1
      LIMIT ?, ?`;
      conn.query(sql, [categoryId, startRow, endRow], function (err, result) {
        conn.end();
        if (err) {
          console.log(err);
          return callback(err, null);
        } else {
          // console.log(result);
          return callback(null, result);
        }
      });
    }
  });
};

productsDB.deleteProduct = function (productId, callback) {
  console.log(productId);
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      var sql = `DELETE FROM products WHERE productid = ?`;
      conn.query(sql, [productId], function (err, result) {
        conn.end();
        if (err) {
          console.log(err);
          return callback(err, null);
        } else {
          // console.log(result);
          return callback(null, result);
        }
      });
    }
  });
};

// LEFTOFFAT

// ADD PRODUCT
productsDB.addProducts = function (
  product_name,
  product_description,
  product_price,
  product_image,
  buy_url,
  shop,
  callback
) {
  console.log(
    product_name,
    product_description,
    product_price,
    product_image,
    buy_url,
    shop
  );
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      var sql = `SELECT productid, productname, productdesc, price, url, image
      FROM products
      JOIN images
      ON products.productid = images.fk_productid
      WHERE fk_catid = ? AND fk_identityid = 1
      LIMIT ?, ?`;
      conn.query(sql, [categoryId, startRow, endRow], function (err, result) {
        conn.end();
        if (err) {
          console.log(err);
          return callback(err, null);
        } else {
          // console.log(result);
          return callback(null, result);
        }
      });
    }
  });
};

productsDB.deleteProduct = function (productId, callback) {
  console.log(productId);
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      var sql = `DELETE FROM products WHERE productid = ?`;
      conn.query(sql, [productId], function (err, result) {
        conn.end();
        if (err) {
          console.log(err);
          return callback(err, null);
        } else {
          // console.log(result);
          return callback(null, result);
        }
      });
    }
  });
};

// ADD PRODUCT NEW
productsDB.addProducts = function (
  productname,
  productdesc,
  price,
  url,
  fk_catid,
  callback
) {
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      var sql =
        "INSERT INTO products (productname, productdesc, price, url, fk_catid) VALUES (?,?,?,?,?)";

      conn.query(
        sql,
        [productname, productdesc, price, url, fk_catid],
        function (err, result) {
          conn.end();
          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            console.log(result);
            return callback(null, result);
          }
        }
      );
    }
  });
};

//EDIT PRODUCT NEW
productsDB.editProduct = function (
  productname,
  productdesc,
  price,
  url,
  fk_catid,
  productid,
  callback
) {
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      const sql =
        "UPDATE products SET productname = ?, productdesc = ?, price = ?, url = ?, fk_catid = ? WHERE productid = ?";

      conn.query(
        sql,
        [productname, productdesc, price, url, fk_catid, productid],
        function (err, result) {
          conn.end();
          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            console.log(result);
            return callback(null, result);
          }
        }
      );
    }
  });
};

//ADD IMAGE NEW
productsDB.addImage = function (image, productid, identityid, callback) {
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      const sql =
        "INSERT INTO images (image, fk_productid, fk_identityid) VALUES (?,?,?)";

      conn.query(sql, [image, productid, identityid], function (err, result) {
        conn.end();
        if (err) {
          console.log(err);
          return callback(err, null);
        } else {
          console.log(result);
          return callback(null, result);
        }
      });
    }
  });
};

//EDIT IMAGE NEW
productsDB.editImage = function (
  image,
  productid,
  identityid,
  imageid,
  callback
) {
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      const sql =
        "UPDATE images SET image = ?, fk_productid = ?, fk_identityid = ? WHERE imageid = ?";

      conn.query(
        sql,
        [image, productid, identityid, imageid],
        function (err, result) {
          conn.end();
          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            console.log(result);
            return callback(null, result);
          }
        }
      );
    }
  });
};

// TO SEARCH
productsDB.searchProducts = function (categoryId, searchQuery, callback) {
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      var sql = `
      SELECT productid, productname, productdesc, price, url, image FROM products
      JOIN images
      ON products.productid = images.fk_productid
      WHERE fk_catid = ? AND productname LIKE '%${searchQuery}%' AND fk_identityid = 1`;
      conn.query(sql, [categoryId], function (err, result) {
        conn.end();
        if (err) {
          console.log(err);
          return callback(err, null);
        } else {
          console.log(result);
          return callback(null, result);
        }
      });
    }
  });
};

module.exports = productsDB;
