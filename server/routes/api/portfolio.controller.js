const express =   require('express');
const router =    express.Router();
const Proyect =   require('../../models/proyect.model');
//const Reply    = require('../../models/reply.model');
const loggedIn =  require('../../utils/isAuthenticated');
const upload =    require('../../config/multer');

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
  newProyect.save((err) => {
    if (err)              { return res.status(500).json(err); }
    if (newProyect.errors) { return res.status(400).json(newProyect); }

    return res.status(200).json(newProyect);
  });
});

//experimental route to send HTML from back to front end.
router.get('/proyect',(req,res,next)=>{
  console.log("en proyecto1 otra vez"); //OK
  res.render('proyects/proyect1.ejs'); //Ok, send Response to front.
});

module.exports = router;

/*
router.get('/:id', (req, res, next) => {
  Thread
    .findById(req.params.id)
    .populate('_author replies._author')
    .exec( (err, thread) => {
      if (err)     { return res.status(500).json(err); }
      if (!thread) { return res.status(404).json(err); }

      return res.status(200).json(thread);
    });
});

router.post('/', loggedIn, (req, res, next) => {
  console.log("router post / threads");
  console.log(req.user);
  console.log(req.body);
  const newThread = new Thread({
    _author: req.user._id,
    title: req.body.title,
    content: req.body.content
  });

  newThread.save((err) => {
    if (err)              { return res.status(500).json(err); }
    if (newThread.errors) { return res.status(400).json(newThread); }

    return res.status(200).json(newThread);
  });
});

router.post('/:id/replies', loggedIn, (req, res, next) => {
  const newReply = new Reply({
    _author: req.user._id,
    title: req.body.title,
    content: req.body.content
  });

  Thread
    .findById(req.params.id)
    .populate('_author replies._author')
    .exec((err, thread) => {
      if (err)     { return res.status(500).json(err); }
      if (!thread) { return res.status(404).json(err); }

      thread.replies.push(newReply);

      thread.save( (err) => {
        if (err)          { return res.status(500).json(err); }
        if (thread.errors){ return res.status(400).json(thread); }

        return res.status(200).json(thread);
      });
  });
});
*/
