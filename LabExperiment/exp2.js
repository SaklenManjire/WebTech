
//Activity  1. create and array and print on console log //2 reverse number //3.check number palindrome //4.fibonesis series //5.find largest elemet in array //6.remove duplicate element in array //7.find missing number in array 
//8. reverse a string //9.count vowels in string //10.check palindrome in string //11. check prime number //12. factorial number //13.function to find even or odd //14.sum of array 

//1.
let a=[1,2,3,4,5,6]
console.log(a)

//2.
for (let index = a.length; index >= 0; index--) {
    console.log(a[index])
}

//3.
let number=123;
let dup=number
let reversenumber=0;
let reminder;


while(number!=0)
{
reminder=number%10;
reversenumber=reversenumber*10+reminder;
number=number/10;
number=Math.round(number)
}

console.log(reversenumber)
if (dup==reversenumber) {
    console.log("Number is palindrome.")
}
else
{
    console.log("Number is not palindrome.")
}

//4.
let pre=0;
let cur=1;
let nxt;

for (let i = 0; cur <=25 ; i++) {
    console.log(cur);
    nxt=pre+cur;
    pre=cur;
    cur=nxt;  
    
}


//5.
let array=new Array(123,23,45,67,8);
let newarray=array.sort();
console.log("Largest number in array is:"+newarray[0])

//6.
let num=new Array(121,23,45,121,23)
a1=num.filter((item,index)=>num.indexOf(item)===index);
console.log(a1)

//7.




