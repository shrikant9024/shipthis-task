const Movie = require('../models/movies')

async function showMovies(req,res){
    try{
        const {query} = req;
        const searchQuery = {};

        if (query.title) {
            searchQuery.title = new RegExp(query.title, 'i'); // Case-insensitive search
        }
        if (query.director) {
            searchQuery.director = new RegExp(query.director, 'i'); // Case-insensitive search
        }
        if (query.country) {
            searchQuery.country = new RegExp(query.country, 'i'); // Case-insensitive search
        }

        const movies = await Movie.find(searchQuery);
        res.json(movies)

    }catch(error){
        res.status(500).json({message:error.message})
    }
}

async function searchMovies(req,res){
    try{
        const {title} = req.body;

        if(!title){
            return res.status(400).json({message:'Title is required'});
        }
        const movies = await Movie.find({title: title })
        if(movies.length===0){
            return res.status*(404).json({message:'No movies found'});
    
        }
        return res.status(200).json(movies);
    }catch(error){
        console.error(error);
        return res.status(500).json({message:'server error'})
    }


}

async function filterItems(req,res){
    try{
        const {type} = req.query;
        if(!type){
            return res.status(400).json({message:"Type paramter missing"})
        }
    
        if (type!== 'Movie' && type!== 'TV Show') {
            return res.status(400).json({ message: 'Invalid type parameter' });
          }

          const media = await Movie.find({ type: type });
          if(media.length===0){
            return res.status(404).json({message:'No Media Found'})
          }

          return res.status(200).json(media);
      

    }catch(error){
        return res.status(500).json({ message: 'Server error' });


    }

}
module.exports ={ searchMovies,filterItems,showMovies}