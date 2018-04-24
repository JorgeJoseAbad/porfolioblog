const express =   require('express');
const router =    express.Router();

console.log("in biographies contoller");

//experimental route to send HTML from back to front end.
router.get('/:name',(req,res,next)=>{
  console.log("en biograpies controller"); //OK
  console.log(req.params.name);
  var name=req.params.name;
  var rute=`biographies/${name}.ejs`;
  console.log("rute is: "+rute);
  res.render(rute); //Ok, send Response to front.
});


module.exports = router;
