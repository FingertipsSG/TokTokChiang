var db = require("./databaseConfig.js");
var shopsDB = {};

// GET getShops
shopsDB.getShops = function (callback) {
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      var sql = "SELECT * FROM shops";
      conn.query(sql, function (err, result) {
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

// POST addShop
shopsDB.addShop = function (sName, callback) {
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      var sql = "INSERT INTO shops (shop_name) VALUES (?)";
      conn.query(sql, [sName], function (err, result) {
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

// DELETE deleteShop
shopsDB.deleteShop = function (id, callback) {
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      var sql = "DELETE FROM shops WHERE id = ?";
      conn.query(sql, [id], function (err, result) {
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

// PATCH editShop
shopsDB.editShop = function (shop_name, id, callback) {
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      const sql = "UPDATE shops SET shop_name = ? where id = ?";
      conn.query(sql, [shop_name,id], function (err, result) {
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

// PUT alterTableName
shopsDB.alterTable = function (oldShop, newShop, callback) {
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      const sql = "ALTER TABLE " + oldShop + " RENAME TO " + newShop;
      conn.query(sql, [oldShop, newShop], function (err, result) {
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

module.exports = shopsDB;