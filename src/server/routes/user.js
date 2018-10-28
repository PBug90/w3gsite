const express = require('express');
const router = express.Router();
const validation = require('./validation');
const jwt = require('jsonwebtoken');

router.post('/user/login', validation.userLogin, function(req, res) {
  const {username} = req.body;
  //if (!(username === 'testuser')) {
  return res.status(401).json({});
  //}
  //const token = jwt.sign({username}, process.env.JWT_SECRET);
  //return res.json({token});
});

module.exports = router;
