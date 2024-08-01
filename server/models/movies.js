// models/movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  show_id: { 
    type: String, 
    required: true, 
    unique: true 
  },
  type: { 
    type: String, 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  director: { 
    type: String 
  },
  country: { 
    type: String 
  },
  date_added: { 
    type: Date 
  },
  release_year: { 
    type: Number 
  },
  rating: { 
    type: String 
  },
  duration: { 
    type: String 
  },
  listed_in: { 
    type: String 
  },
  description: { 
    type: String 
  }
});

movieSchema.index({ title: 1 });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
