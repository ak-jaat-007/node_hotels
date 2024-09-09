const mongoose=require('mongoose');

const menuSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true

    },
    taste:{
        type:String,
        enum:["spicy","sweet","sour"],
        required:true
    },
    is_drink:{
        type :Boolean,
        default:false
    },
    ingredients :{
        type:[String],
        default:[],
        required:true
    },
    num_sales:{
        type:Number,
        required:true
    }
})


const menu=mongoose.model('menu',menuSchema);
module.exports=menu;