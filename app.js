const express=require('express');
const app=express();
const dotenv=require('dotenv');
const cors=require('cors');
const connectDB=require('./connectDB/db');
const userRouter=require('./routes/User');
const blogsRouter=require('./routes/Blogs');

dotenv.config();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Blog app");
});
app.use('/',userRouter);
app.use('/',blogsRouter);
// app.get('*',(req,res)=>{
//     res.status(404).send("404, PAGE NOT FOUND");
// });

app.listen(process.env.PORT,async()=>{
    try{
        await connectDB();
        console.log("Server is Running at port",process.env.PORT);
    }catch(e){
        console.log(e);
    }
});