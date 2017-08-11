const express = require('express');
const router = express.Router();
const apiRoutes = require('./api/index.controller');

console.log("in index");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Server Porfolio-blog' });
});

router.use('/api', apiRoutes);

module.exports = router;
