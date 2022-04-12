var mysql = require('mysql');

var dbconnect = {
getConnection: function() {
    var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ccxj081102",
    database: "toktokchiang"
});
return conn;
}
};

module.exports = dbconnect