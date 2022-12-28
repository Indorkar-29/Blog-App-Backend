const mongoose=require('mongoose');

const BlogSchema=new mongoose.Schema({
    blogs:[{
        Image:String,
        Title:String,
        Description:String,
        date:{type:String,default:new Date().toLocaleDateString()},
        time:{type:String,default:new Date().toLocaleTimeString()}
    }],
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user"}
});

const BlogsModel=new mongoose.model('blogs',BlogSchema);
module.exports=BlogsModel;