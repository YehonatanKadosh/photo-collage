var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(404).send('404 NotFound');
});

module.exports = router;
