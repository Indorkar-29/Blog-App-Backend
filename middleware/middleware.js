const {verify}=require('jsonwebtoken');
const User=require('../models/user');
const dotenv=require('dotenv');
dotenv.config();

const validate=async(req,res,next)=>{
    const headerToken=req.header('token');
    if(!headerToken){
        return res.status(400).json({error:"User not logged in"});
    }
    try{
        verify(headerToken,process.env.SECRET,async(err,decode)=>{
            if(err){
                return res.status(400).json({error:"Unauthorized"});
            }
            const user=await User.findOne({_id:decode.data});
            if(user){
                req.user=user._id;
                next();
            }else{
                res.status(400).json({error:"failed"});
            }
        });
    }catch(e){
        res.status(400).json({error:"Forbidden 🔴🔴"})
    }
}

module.exports={validate};