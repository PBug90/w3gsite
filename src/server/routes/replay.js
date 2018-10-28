const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const W3GParser = require('w3gjs');
const fs = require('fs');
const validation = require('./validation');
const parser = new W3GParser();
const authorizationMiddleware = require('../middlewares/authorization');
const db = require('../db');
const logger = require('../logger');

router.get('/replay', validation.replayCollection, function(req, res) {
  db.get()
    .collection('replays')
    .find({})
    .limit(req.query.page * req.query.pageSize)
    .toArray()
    .then((replays) => res.json(replays));
});

router.get('/replay/:id', validation.replayCollection, function(req, res) {
  res.set('Content-Type', 'application/octet-stream');
  db.getBucket()
    .openDownloadStreamByName('replay.w3g')
    .pipe(res);
});

router.post('/replay', authorizationMiddleware.any, upload.single('replay'), function(req, res) {
  const result = parser.parse(req.file.path);
  db.get()
    .collection('replays')
    .save(result);
  fs.createReadStream(req.file.path)
    .pipe(db.getBucket().openUploadStream('replay.w3g'))
    .on('error', function(error) {
      logger.error(error);
    })
    .on('finish', function() {
      fs.unlink(req.file.path, () => res.json(result));
    });
});

router.post('/replay/parse', upload.single('replay'), function(req, res) {
  try {
    const result = parser.parse(req.file.path);
    fs.unlink(req.file.path, () => res.json(result));
  } catch (ex) {
    res.status(400).json({message: ex.message});
  }
});

module.exports = router;
