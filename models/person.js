const mongoose=require('mongoose');

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
   }


})

const Person=mongoose.model('Person',personSchema);
module.exports=Person;