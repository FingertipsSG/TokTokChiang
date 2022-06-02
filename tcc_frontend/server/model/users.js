var db = require("./databaseConfig.js");
var config = require("./config.js");
var userDB = {};
const jwtDecode = require("jwt-decode");
const jwt = require("jsonwebtoken");

// var verify = require("../valiators/verifyFn.js");
// const verifyFn = require("../valiators/verifyFn.js");

// LEFTOFFAT
const verificationFns = require("../valiators/verifyFn");

//----------------------------------------ADMIN----------------------------------------
//ADD USERS

userDB.addUser = function (username, password, email, role, callback) {
  console.log(username, password, email, role);
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      var sql =
        "INSERT INTO admin (username, password, email, role) VALUES (?,?,?,?)";
      conn.query(
        sql,
        [username, password, email, role],
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

//DELETE USER
userDB.deleteUser = function (id, callback) {
  console.log(id);
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      var sql = "DELETE FROM admin WHERE id = ?";
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

//GET EMAIL (check)

userDB.getEmail = function (email, callback) {
  // console.log("email " + email)
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      return callback(err, null);
    } else {
      var sql = "SELECT email FROM admin WHERE email = ?";

      conn.query(sql, [email], function (err, result) {
        conn.end();
        // console.log(result);
        // console.log("Length: " + result.length);
        if (result.length === 0) {
          // console.log("Error: " + err)
          return callback(null, null);
        } else {
          // console.log("result: " + result)
          return callback(null, result);
        }
      });
    }
  });
};

//INSERT PIN
userDB.addPin = function (pin, callback) {
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      return callback(err, null);
    } else {
      var sql = "INSERT INTO expiry_pin (pin) VALUES (?)";
      conn.query(sql, [pin], function (err, result) {
        conn.end();
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, result);
        }
      });
    }
  });
};

//DELETE PIN
userDB.deletePin = function (pin, callback) {
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      var sql = "DELETE FROM expiry_pin WHERE pin = ?";
      conn.query(sql, [pin], function (err, result) {
        conn.end();
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, result);
        }
      });
    }
  });
};

// //RE-DELETE PIN
// userDB.reDeletePin = function (pin, callback) {
//   console.log("PIN FROM RE-DELETE " + pin);
//   var conn = db.getConnection();
//   conn.connect(function (err) {
//     if (err) {
//       console.log(err);
//       return callback(err, null);
//     } else {
//       console.log("Connected!");
//       var sql = "DELETE FROM expiry_pin WHERE pin = ?";
//       conn.query(sql, [pin], function (err, result) {
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

//GET PIN
userDB.getPin = function (pin, callback) {
  // console.log("email " + email)
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      return callback(err, null);
    } else {
      var sql = "SELECT pin FROM expiry_pin WHERE pin = ?";

      conn.query(sql, [pin], function (err, result) {
        conn.end();
        // console.log(result);
        // console.log("Length: " + result.length);
        if (err) {
          callback(err, null);
          return;
        }
        if (result.length === 0) {
          // console.log("Error: " + err)
          return callback(null, null);
        } else {
          // console.log("result: " + result)
          return callback(null, result);
        }
      });
    }
  });
};

//UPDATE PASSWORD
userDB.updatePassword = function (password, email, callback) {
  console.log("checking pw: " + password);
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      const sql = "UPDATE admin SET password = ? where email = ?";
      conn.query(sql, [password, email], function (err, result) {
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

//GET USERS
userDB.getUsers = function (id, callback) {
  console.log(id);
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      var sql = "SELECT * FROM admin ORDER BY id = ? DESC, role ASC";
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

//----------------------------------------USERS----------------------------------------
//LOGIN
userDB.login = function (username, password, callback) {
  var dbConn = db.getConnection();
  console.log("JWT Token: " + config.JWTKey);
  dbConn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      const query =
        "SELECT * FROM toktokchiang.admin WHERE username = ? AND password = ?";
      dbConn.query(query, [username, password], (error, results) => {
        if (error) {
          callback(error, null);
          return;
        }
        if (results.length === 0) {
          return callback(null, null);
        } else {
          const user = results[0];
          const pw = password.toString();
          if (pw === user.password) {
            let userDetails = {
              id: user.id,
              username: user.username,
              email: user.email,
              role: user.role,
            };

            let data = {
              ...userDetails,
              token: jwt.sign(userDetails, config.JWTKey, {
                expiresIn: "1h", //Expires in 1hr
              }),
            }; //End of data variable setup
            // verifyFn.verifyToken;
            return callback(null, data);
          } else {
            console.log("Wrong password");
          }
        }
      });
    }
  });
};

// TO SEARCH
userDB.searchUsers = function (searchQuery, callback) {
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      var sql =
        "SELECT * FROM admin WHERE username LIKE " + `'%${searchQuery}%'`;
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

//EDIT USERS
userDB.editUser = function (username, password, email, role, id, callback) {
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      const sql =
        "UPDATE admin SET username = ?, password = ?, email = ?, role = ? WHERE id = ?";
      conn.query(
        sql,
        [username, password, email, role, id],
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

module.exports = userDB;
