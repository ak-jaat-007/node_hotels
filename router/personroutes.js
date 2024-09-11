const express=require('express');
const router=express.Router();
const Person=require('./../models/person.js');
const {jwtMiddleware,generatetoken}=require('./../jwt.js');

router.post('/signup',async(req,res)=>{
    
    try{
        const data=req.body;
        const newPerson=Person(data);
        const response= await newPerson.save();
        console.log("successfull ");
        const payload={
            id:response.id,
            username:response.username
        }
        console.log("your payload is :"+JSON.stringify(payload));
        const token=generatetoken(payload);
        console.log("your generated token is: "+token);
        res.status(200).json({response:response,token:token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
    
});


router.post('/login',async(req,res)=>{
    try{
        const {username,password}=req.body;
        const user=await Person.findOne({username:username});
        const pass= await user.comparePassword(password,user.password);
        if(!user){
           return  res.status(400).json({err:"Either your username or password is incorrect"});
        }
       const payload={
           id:user.id,
           username:user.username
       }
       const token= generatetoken(payload);
       res.status(200).json({token});

    }
    catch(err){
        console.log("error is: "+err);
        res.status(404).json({err:"Your are not a valid user"});
    }
})

router.get('/profile',jwtMiddleware,async(req,res)=>{
    try{
        const userdata=req.user;
        console.log("User data is :" +userdata);
        const userid=userdata.id;
        const user=await Person.findById(userid);
        res.status(200).json({user});
    }
    catch(err){
        console.log(err+" user not found");
        res.status(400).json({err:" user not found"})
    }
})
router.get('/',jwtMiddleware,async(req,res)=>{
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
