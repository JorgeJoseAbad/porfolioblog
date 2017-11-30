const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;


const PostSchema = new Schema({
  _author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  content: {
    type: String,
    required: [true, "Content is required"]
  },
  date: {
    type: Date,
    default: Date.now
  },
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
