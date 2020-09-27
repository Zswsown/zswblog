const express=require('express');
const path=require('path');
const router=express.Router();
const app=express();

app.use('/insert',router);
app.use('/delete',router);

router.get('/',(req,res,next)=>{
 api.getBlog(req,res,next);
})