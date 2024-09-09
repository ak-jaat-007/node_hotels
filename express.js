const express=require('express');
const app=express();
const db=require('./db');
const bodyParser=require('body-parser');
app.use(bodyParser.json());

require('dotenv').config();

app.get('/',function(req,res){
    console.log("hello kaise h aap");
    res.send("hello");
    
})






const personroutes=require('./router/personroutes.js');
app.use('/person',personroutes);
const menuroutes=require('./router/menuroutes.js');
app.use('/menu',menuroutes);

// this is the port where we find output

app.listen(3000,()=>{
    console.log("Yeah! servor is on ");
});
