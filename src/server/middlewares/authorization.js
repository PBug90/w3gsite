const jwt = require('express-jwt');
module.exports = {
  any: jwt({secret: process.env.JWT_SECRET})
};
