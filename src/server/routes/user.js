const express = require('express');
const router = express.Router();
const validation = require('./validation');
const db = require('../db');
const jwt = require('jsonwebtoken');

router.post('/user/login', validation.userLogin, function(req, res) {
  const {username} = req.body;
  if (!(username === 'testuser')) {
    return res.status(401).json({});
  }
  const token = jwt.sign({username}, 'shhhhhhared-secret');
  return res.json({token});
});

module.exports = router;
