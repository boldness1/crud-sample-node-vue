var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({error:true, message:"not authorized..."});
});

module.exports = router;
