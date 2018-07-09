const express =   require('express');
const router =    express.Router();
const Proyect =   require('../../models/proyect.model');
//const Reply    = require('../../models/reply.model');
const loggedIn =  require('../../utils/isAuthenticated');
const upload =    require('../../config/multer');
const fs = require('fs');

console.log("in portfolio-controller");


router.get('/', (req, res, next) => {
  console.log("in router-get");
  Proyect
    .find({})
    .populate('_author')
    .exec( (err, proyects) => {
      if (err) { return res.status(500).json(err); }

      return res.status(200).json(proyects);
    });
});

//added middleware upload.single('file') to upload image
router.post('/', loggedIn, upload.single('file'), (req, res, next) => {
  console.log("router post / proyects");
  console.log(req.user);
  console.log(req.body);

  const newProyect = new Proyect({
    _author: req.user._id,
    title: req.body.title,
    imageUrl: `uploads/${req.file.filename}`, // modified to upload image
    content: req.body.content,
    date: req.body.date
  });
  debugger;
  let proyectfile='./views/proyects/'+req.body.title+'.ejs';

  fs.open(proyectfile, 'w', function (err, file) {
    if (err) throw err;
    else {
      newProyect.save((err) => {
        if (err)              { return res.status(500).json(err); }
        if (newProyect.errors) { return res.status(400).json(newProyect); }

        return res.status(200).json(newProyect);
      });
    }
  });
});

//Route to send HTML from back to front end to render proyect
router.get('/:id',(req,res,next)=>{
  console.log("en proyecto1 otra vez"); //OK
  console.log(req.params.id);
  let id=req.params.id;
    Proyect
      .findById(id,(err,proyect)=>{
        if (err) { return res.status(500).json(err); }
        console.log(proyect);
        let title=proyect.title;
        let proyectFile='proyects/'+title+'.ejs';
        res.render(proyectFile);
      });

});

/*
router.delete('/:id',(req,res,next)=>{
  console.log("en delete");
  let id=req.params.id;
  console.log(req.params.id);
  Proyect
  .findByIdAndRemove(id,(err,proyect)=>{ //quito AndRemove
    if (err) {
      console.log("error 500");
      return res.status(500).json(err); }
    else{
    console.log("encontrado proyecto en BBDD: ",proyect);
    let proyectfile='./views/proyects/'+proyect.title+'.ejs';
    //routes/api/portfolio.controller.js
    //views/proyects/April proyect.ejs
    fs.unlink(proyectfile,function(err){
        if(err) return console.log(err);
        console.log('file deleted successfully');
      });
    return res.json({
        message: 'proyect:  '+ `${proyectfile}`+ ' has been removed!'
      });
    }
  });

});
*/

//expermimantal route to delete with double check file and BBDD
router.delete('/:id',(req,res,next)=>{
  console.log("en delete");
  let id=req.params.id;
  console.log(req.params.id);
  Proyect
  .findById(id,(err,proyect)=>{
    if (err) {
      console.log("error 500");
      return res.status(500).json(err);
    }
    if (proyect===null){
      return res.json({
         message: 'Proyect not in BBDD'
       });
    }
    else{

      debugger;
      console.log("encontrado proyecto en BBDD: ",proyect);
      let proyectImage='public/'+proyect.imageUrl;
      let proyectfile='./views/proyects/'+proyect.title+'.ejs';
      if (proyectfile){
        /*delete file proyect and if no error remove BBDD*/
        fs.unlink(proyectfile,function(err){
                if(err) return console.log(err);
                if (!err){
                  console.log('file deleted successfully');
                  /*delete proyect image-icon*/
                  fs.unlink(proyectImage,function(err){
                    if(err) return console.log(err);
                    if (!err) {
                      console.log(proyectImage+" DELETED");
                    }
                  });
                  Proyect
                   .findByIdAndRemove(id,(err)=>{
                       if (err){return res.status(500).json(err);}
                       return res.json({
                          message: 'proyect:  '+ `${proyectfile}`+ ' has been removed!'
                        });
                    });
                 } //if (!err)
          });


      }
      else return res.status(500).json('fichero no encontrado');
    }
  });
});



module.exports = router;
