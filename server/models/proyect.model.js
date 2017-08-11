const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;


const ProyectSchema = new Schema({
  _author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  imageUrl   : {
    type: String,
    required: true
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

const Proyect = mongoose.model('Proyect', ProyectSchema);
module.exports = Proyect;
