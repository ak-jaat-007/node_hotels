const express=require('express');
const app=express();
const db=require('./db');
const bodyParser=require('body-parser');
app.use(bodyParser.json());



app.get('/',function(req,res){
    console.log("hello kaise h aap");
    res.send("hello");
    
})






const personroutes=require('./router/personroutes.js');
app.use('/person',personroutes);
const menuroutes=require('./router/menuroutes.js');
app.use('/menu',menuroutes);

app.listen(3000,()=>{
    console.log("Yeah! servor is on ");
});
