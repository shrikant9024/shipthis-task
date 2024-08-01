const Movie = require('../models/movies')

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
module.exports ={ searchMovies,filterItems}