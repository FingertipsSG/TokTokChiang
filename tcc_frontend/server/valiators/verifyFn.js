const jwt = require('jsonwebtoken');
var config = require("../model/config.js");

var verifyFn = {
    verifyToken: function (req, res, next) {
        var token = req.headers['authorization'];
        console.log("verifyFn token: " + token);
        res.type('json');
        jwt.verify(token, config.JWTKey, (err, decoded) => {
            if (err) {
                console.log("Unauthorized access made");
                res.send(err.message);
                console.log(err.message);
                res.status(403);
            } else {
                req.username = decoded.username;
                req.role = decoded.role;
                console.log("no error")
                next();
            }
        })
    }
}

module.exports = verifyFn;