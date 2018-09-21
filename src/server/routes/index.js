const express = require('express');
const router = express.Router();
const replay = require('./replay');

router.use('/api/', replay);

module.exports = router;
