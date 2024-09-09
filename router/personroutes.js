const express=require('express');
const router=express.Router();
const Person=require('./../models/person.js');

router.post('/',async(req,res)=>{
    
    try{
        const data=req.body;
        const newPerson=Person(data);
        const response= await newPerson.save();
        console.log("successfull ");
        res.status(200).json({response})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
    
});

router.get('/',async(req,res)=>{
    try{
       const data=await Person.find();
       console.log("data fetched");
       res.status(200).json({data});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})





router.get('/:worktype',async(req,res)=>{
    try{
        const worktype=req.params.worktype;
        
        if(worktype=="chef" || worktype=="Manager" || worktype=="waiter"){
            const response=await Person.find({work:worktype});
            res.status(200).json({response});
        }
        else{
            res.status(404).json({error:"error ocurr"});
        }
    }
    catch(err){
        console.log("error occur in this "+err);
        res.status(502).json({err:"Internal server error "});
    }
})


router.put('/:personid',async(req,res)=>{
    try{
        const personid=req.params.personid;
        const updateddata=req.body;
        
        const response= await Person.findByIdAndUpdate(personid,updateddata,{
            new :true,
            runValidators:true
        })
        if(!response){
        
            return res.status(404).json({error:"person not found "});
        }
        console.log("data is updataed");
        res.status(200).json({response});


    }
    catch(err){
        console.log("error occur in this "+err);
        res.status(500).json({err:"Internal server error "});
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const deleteid=req.params.id;
        const response=await Person.findByIdAndDelete(deleteid,{
            new:true
            
        })
        if(!response){
            return res.status(404).json({error:"person not found"});
        }
        console.log("Person deleted successfully");
        res.status(200).json({response});
    }
    catch(err){
        console.log("error occur in this "+err);
        res.status(500).json({err:"Internal server error "});
    }
})

module.exports=router;
