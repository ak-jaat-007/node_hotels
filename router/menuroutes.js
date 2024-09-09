const express=require('express');
const router=express.Router();
const menuroutes=router;
const menu=require('./../models/menu.js');
router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newmenu=  new menu(data);
        const response= await newmenu.save();
        console.log("I get your hotel menu let me gothrough");
        res.status(200).json({response});

    }
    catch(err){
        console.log("error occur in this "+err);
        res.status(502).json({err:"Internal server error "});
    }
    

})


router.get('/',async(req,res)=>{
    try{
        const data= await menu.find();
        console.log("Data is fetched ");
        res.status(200).json(data);
    }
    catch(err){
        console.log("error occur in this "+err);
        res.status(502).json({err:"Internal server error "});
    }
})

router.get('/:taste',async(req,res)=>{
    const taste= req.params.taste;
    try{
        if(taste=="sour" || taste=="sweet" || taste=="spicy"){
            const response= await menu.find({taste:taste});
            console.log("taste is find ");
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:"error occuring"});
        }
       
    }
    catch(err){
        console.log("error occur in this "+err);
        res.status(502).json({err:"Internal server error "});
    }
})

module.exports=menuroutes;