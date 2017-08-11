const express = require('express');
const router  = express.Router();

const authRoutes = require('./authentication.controller');
const pfRoutes  = require('./portfolio.controller');

console.log("in index-controller");

router.use('/', authRoutes);
router.use('/proyects', pfRoutes);

module.exports = router;
