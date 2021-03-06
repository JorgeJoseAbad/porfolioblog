const express = require('express');
const router  = express.Router();

const authRoutes = require('./authentication.controller');
const pfRoutes  = require('./portfolio.controller');
const blogRoutes = require('./blog.controller');
const bioRoutes  = require('./biographies.controller');

console.log("in index-controller");

router.use('/', authRoutes);
router.use('/proyects', pfRoutes);
router.use('/blog',blogRoutes);
router.use('/biographies',bioRoutes);

module.exports = router;
