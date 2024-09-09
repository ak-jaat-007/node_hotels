// function add(a,b){
//      return a*b;
// }

// console.log(add(3,15));

//2nd type

// var add=function(a,b){
//      return a+b;
// }
// console.log(add(4,3));

//3rd type
//  callback=()=>{
//      console.log("hey i am called");
    

// }

// b=()=>{
//      console.log("hey who is there");
// }
//  var fun=(a,b,callback)=>{return a+b};
// console.log(fun(2,3));
// callback();
// b();

//core modules
var fs=require('fs');
var os=require('os');
const temp=require('./temp.js');

// console.log(temp.a+temp.addnumber(temp.a,3));

 
// fs.appendFile('new.txt','hey my name is aman\n',(err)=>{
//      console.log("hello\n\n : ");
//      console.log( os.userInfo());
// });
// console.log(os);
const _=require('lodash');
var m=_.uniq(temp.data);
console.log(_.isString(0));
console.log(m);
