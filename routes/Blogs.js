const express=require('express');
const router=express.Router();
const Blogs=require('../models/blog');
const User=require('../models/user');

router.use(express.json());
const cors=require('cors');
router.use(cors());
const {validate}=require('../middleware/middleware');
const bodyParser=require('body-parser');

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

// CREATE
router.post('/createBlog',validate,cors(),async(req,res)=>{
    try{
        let user=await Blogs.find({userId:req.user});
        if(user.length > 0){
            user=await Blogs.find({userId:req.user}).updateOne(
                {},
                {
                    $push:{
                        blogs:req.body
                    }
                }
            );
        }else{
            user=await Blogs.create({
                blogs:req.body,
                userId:req.user
            });
        }
        res.status(200).json({
            status:"success",
            result:user
        });
    }catch(e){
        res.status(400).json({
            status:"failed",
            error:e.message
        });
    }
});

// GET
router.get('/allBlogs',validate,async(req,res)=>{
    try{
        const users=await Blogs.find({userId:req.user});
        res.status(200).json({
            users
        });
    }catch(e){
        res.status(400).json({
            status:"failed",
            error:e.message
        });
    }
});

// GET USER
// router.get('/user',async(req,res)=>{
//     try{
//         const user=await User.findOne({_id:req.user});
//         console.log(req.user);
//         res.status(200).json({
//             user
//         });
//     }catch(e){
//         res.status(400).json({
//             status:"failed",
//             error:e.message
//         });
//     }
// });

module.exports=router;