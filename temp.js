var a=5;
console.log("hey myself temp.js\n");
var c=()=>{
    console.log("hey i am b");
    b=4;
    return 4;
}
var addnumber=(a,b)=>{
    let d=c();
    return a*d;
}
var data =["aman",32,"anamika",32,"tamanna",32];

module.exports={
    a,
    addnumber,data
}

