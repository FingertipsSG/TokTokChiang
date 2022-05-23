var mysql = require("mysql");

var dbconnect = {
  getConnection: function () {
    var conn = mysql.createConnection({
      host: "toktokchiang-temp.cm1v4ooucggd.ap-southeast-1.rds.amazonaws.com",
      user: "admin",
      password: "password",
      database: "toktokchiang",
    });
    return conn;
  },
};

module.exports = dbconnect;
