const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const Person=require('./models/person');


passport.use(new LocalStrategy(async(username,password,done)=>{
    try{
       const user = await Person.findOne({username:username});
       if(!user){
          return done(null,false,{message:"Incorrect username "});
       }
       const ispassword= await user.comparePassword(password);
       if(!ispassword){
          return done(null,false,{message:"Incorrect Password"});
       }
       return done(null,user);

    }
    catch(err){
      return done(err);
    }
}))

module.exports=passport;