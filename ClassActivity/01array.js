//array declartion
let fruits=["Apple","Mango"];
for (let index = 0; index < fruits.length; index++) {
    console.log(fruits[index]) 
}
console.log(typeof(fruits))

const arr=new Array(0,1,2);
for (let index = 0; index < arr.length; index++) {
    console.log(arr[index])
}

//array methods
arr.push(12); //add values in array
console.log(arr)
 
arr.pop(); //remove last value from array
console.log(arr)

arr.unshift(120);//Inserts new elements at the start of an array, and returns the new length of the array.
console.log(arr)

arr.shift(); //Removes the first element from an array and returns it. If the array is empty, undefined is returned and the array is not modified.
console.log(arr)

console.log(arr.includes(1)); //Determines whether an array includes a certain element, returning true or false as appropriate.

console.log(arr.indexOf(1)); //Returns the index of the first occurrence of a value in an array, or -1 if it is not present.

console.log(arr.slice(0,2)); //Returns a copy of a section of an array. For both start and end, a negative index can be used to indicate an offset from the end of the array. For example, -2 refers to the second to last element of the array.






