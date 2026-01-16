console.log("Activity No 3");
document.writeln("<h1>Activity No.3</h1>");
let  marks=[30,40,50,20];
let sum=0;
marks.forEach(element => {
    sum=sum+element;
});
console.log(sum)
let percentage=sum/400*100;
if(percentage>=35)
{
    document.writeln("<h2>Student is Pass</h2>");
    console.log("Student is Pass");
}else{
     document.writeln("<h2>Student is Fail</h2>");
     console.log("Student is Fail");
}