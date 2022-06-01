//config.js
const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });
module.exports = {
    JWTKey: process.env.REACT_APP_KEY,
    test: process.env.REACT_APP_MY_ENVIRONMENT_VARIABLE,
    baseurl: process.env.BASE_URL,
};