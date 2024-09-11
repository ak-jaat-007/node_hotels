const express=require('express');
const app=express();
const db=require('./db');
const bodyParser=require('body-parser');
app.use(bodyParser.json());
const passport=require('./auth');
const {jwtMiddleware,generatetoken}=require('./jwt.js');

require('dotenv').config();


app.use(passport.initialize());




//middleware function
const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to :${req.originalUrl}`);
    next();

}





const userauthenticate=passport.authenticate('local',{session:false});

app.get('/',function(req,res){
    res.send("welcome to our hotel");
})


const personroutes=require('./router/personroutes.js');
app.use(logRequest);
app.use('/person',userauthenticate,personroutes);
const menuroutes=require('./router/menuroutes.js');
app.use('/menu',menuroutes);

// this is the port where we find output

app.listen(3000,()=>{
    console.log("Yeah! servor is on ");
});
