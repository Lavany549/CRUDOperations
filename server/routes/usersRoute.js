const express = require("express");
const router = express.Router();

const User=require('../models/user');


router.post("/register", async(req,res)=>{
    
    const { name, email, password } = req.body;

    try {
        const newuser = new User({
            name,
            email,
            password,
            isAdmin: false
        });

        const user = await newuser.save();
        res.send('User Registered Successfully')
        
    } catch (error) {
        return res.status(400).json({messsage: error});
        
    }

});
router.post("/login", async(req,res)=>{
    // console.log(req.body);
    const {email,password}=req.body
    
    try {
        const user= await User.findOne({email:email,password:password})
        if(user)
        {
            const tempuser={
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                _id:user._id
            }
            res.send(tempuser)
        }
        else{
            return res.status(400).json({message:'Login Failed'})
        }
        
        
    } catch (error) {
        return res.status(400).json({messsage: error});
        
    }

});
router.post("/checkuser", async (req, res) => {
    const { name, email } = req.body;

    try {
        const userWithName = await User.exists({ name });
        const userWithSameEmail = await User.exists({ email });

        res.json({ exists: userWithName || userWithSameEmail });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});



module.exports=router;