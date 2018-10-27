const express = require('express');
const router = express.Router();
const replay = require('./replay');
const user = require('./user');

router.use('/api/', replay);
router.use('/api/', user);

module.exports = router;
