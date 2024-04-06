const mongoose = require('mongoose')
const movieSchema = new mongoose.Schema({
  movieImage: {
    type: String,
    required: true
  },
  movieName: {
    type: String,
    required: true
  },
  movieAuthor: {
    type: String,
    required: true
  },
  movieLink: {
    type: String,
    required: true
  },
  checkStatus: {
    type: String,
    required: true
  },
})

const movieModel = mongoose.model('movie', movieSchema)
module.exports = movieModel