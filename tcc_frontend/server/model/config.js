//config.js
const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });
module.exports = {
    JWTKey: process.env.REACT_APP_KEY,
    BASEURL: process.env.BASEURL
};
