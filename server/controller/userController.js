const User = require("../models/user")



async function handleSignup(req,res){
    try{
        const {email,name,password,age}=req.body
        
        //user exist
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).send("User already exists")
    }

    const result = await User.create({
        email, name, password,age
    })

    return res.status(201).json({msg:"user registration succesfull"})
    }catch(error){
        console.error("error while signing up",error)
        return res.status(500).json({ error: "Internal server error" });
        }

}


async function handleLogin(req,res){
    const {email,password} = req.body
   
    try{
        const loginUser = await User.findOne({email});
        if(!loginUser) res.status(400).send("User does not exist")

            const loginpassword = loginUser.password
            if(loginpassword===password){
                return res.status(200).json({msg:"user logged in succesfully"})
            }
            return res.status(401).json({msg:"wrong password"})
        

    }catch(error){
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });

    }

}

module.exports = {handleLogin,handleSignup}