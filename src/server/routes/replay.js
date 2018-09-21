const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const W3GParser = require('w3gjs');
const fs = require('fs');

const parser = new W3GParser();

router.post('/replay', upload.single('replay'), function(req, res) {
  const result = parser.parse(req.file.path);
  fs.unlink(req.file.path, () => res.json(result));
});

module.exports = router;
