const express =   require('express');
const router =    express.Router();
const Post =   require('../../models/post.model');
//const Reply    = require('../../models/reply.model');
const loggedIn =  require('../../utils/isAuthenticated');
//const upload =    require('../../config/multer');

console.log("in blog-controller");


router.get('/', (req, res, next) => {
  console.log("in router-get blog controller");
  Post
    .find({})
    .populate('_author')
    .exec( (err, posts) => {
      if (err) { return res.status(500).json(err); }

      return res.status(200).json(posts);
    });
});


router.post('/', loggedIn, (req, res, next) => {
  console.log("router post / Blog");
  console.log(req.user);
  console.log(req.body);
  const newPost = new Post({
    _author: req.user._id,
    title: req.body.title,
    content: req.body.content,
    date: req.body.date
  });
  newPost.save((err) => {
    if (err)              { return res.status(500).json(err); }
    if (newPost.errors) { return res.status(400).json(newPost); }

    return res.status(200).json(newPost);
  });
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
