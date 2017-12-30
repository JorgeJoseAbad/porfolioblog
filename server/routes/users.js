const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const User     = require('../models/user.model');

console.log("in users");

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.body); //{} en este momento
  console.log("in users.js router get");
  res.send('respond with a resource');
});

router.post('/', upload.single('file'), function(req, res, next) {
  console.log(req.body);
  const id=req.body._id;
  const imageUrl=`/uploads/${req.file.filename}`;
  res.send("in post updating new avatar");
  console.log("in users.js router post");
   User.findByIdAndUpdate(id,{imageUrl:imageUrl},(err, user)=>{
     console.log(id);
     console.log(imageUrl);
     console.log(user);
     if (err){ return next(err); }
   });
});

module.exports = router;
