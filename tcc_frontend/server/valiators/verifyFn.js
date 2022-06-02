// LEFTOFFAT
const jwt = require("jsonwebtoken");
var config = require("../model/config.js");

// LEFTOFFAT Old verifyToken function
// const verifyToken = (req, res, next) => {
//   var token = req.headers["authorization"];
//   console.log("verifyFn token: " + token);
//   res.type("json");

//   jwt.verify(token, config.JWTKey, (err, decoded) => {

//     // If error, user has yet to log in
//     if (err) {
//       console.log("Unauthorized access made");
//       res.send(err.message);
//       console.log(err.message);
//       res.status(401);
//     } else {
//       req.userid = decoded.id;
//       req.username = decoded.username;
//       req.role = decoded.role;
//       console.log("no error");
//       next();
//     }
//   });
// };

const verifyToken = (req, res, next) => {
  // Extract the token
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // LEFTOFFAT
  console.log("token from verifyToken: ", token);

  // If token is undefined, user has yet to logged in / token has expired
  // return status code 401 (Unauthorised - Prompt user to log in)
  if (token == undefined) {
    console.log("Yet to logged in. Not authenticated.");
    return res.status(401).send();
  }

  // Proceed to verify localStorage's token against secret key
  jwt.verify(token, config.JWTKey, (err, decoded) => {
    // If error, incorrect secret key used
    if (err) {
      console.log("Unauthorized access made");
      console.log("err message is ", err.message);
      res.status(403).send();
    } else {
      res.locals.userid = decoded.id;
      res.locals.username = decoded.username;
      res.locals.role = decoded.role;
      console.log("no error");
      next();
    }
  });
};

// Need to check whether role is master for API routes that can only be done by master
const verifyRole = (req, res, next) => {
  // Do not need to check if user authenticated since already check in verifyToken
  // Check whether decodedData's role matches role required
  const curUserRole = res.locals.role;

  // if matches, proceed to next middleware
  if (curUserRole.toLowerCase() === "master") {
    next();
  }

  // if error, return status 403
  else {
    console.log("Restricted access. Current role lacks access.");
    res.status(403).send();
  }
};

module.exports = {
  verifyToken,
  verifyRole,
};
