const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const personSchema= new mongoose.Schema({
    Name:{
        type:String,
        required:true

    },
   Age:{
      type:Number,
    
   },
    
   email:{
    type:String,
    required:true,
    unique:true
   },
   work:{
    type:String,
    enum:["chef","Manager","waiter"],
    required:true
   },
   mobile:{
    type:Number
    
   },
   address:{
    type:String,
    required:true,
    unique:true
   },
   salary:{
    type:Number,
    required:true
   },
   username:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   }


})
personSchema.pre('save',async function(next){
   const person=this;
   if(!person.isModified('password')) return next();
   try{
    const salt= await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(person.password,salt);
     person.password=hashPassword;
     next();
    
   }
   catch(err){
    next(err);
   }
})

personSchema.methods.comparePassword=async function(candidatePassword){
    try{
        const isMatch= await bcrypt.compare(candidatePassword,this.password);
        return isMatch;

    }
    catch(err){
        throw err;
    }
}

const Person=mongoose.model('Person',personSchema);

module.exports=Person;