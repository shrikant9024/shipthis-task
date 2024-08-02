const express = require('express')
const { handleSignup, handleLogin } = require('../controller/usercontroller')
const { searchMovies, filterItems, showMovies } = require('../controller/movieController')

const router = express.Router()


router.get('/',(req,res)=>{
    res.send("hello from server")

})



router.get('/login',(req,res)=>{

})

router.post('/signup',handleSignup)
router.post('/login',handleLogin)



router.get('/movies',showMovies)
router.post('/search',searchMovies)
router.get('/filter',filterItems)

router.get('/items/filter',(req,res)=>{

})

module.exports = router


