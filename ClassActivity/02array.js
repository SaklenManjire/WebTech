const superhero=["Spiderman","Batman","MightyRaju","IronMan","Thor"]
const Cars=["Mercedes","BMW","Bughati"]

superhero.push(Cars);

for (let index = 0; index < superhero.length; index++) {
   console.log(superhero[index])
    
}

console.log(superhero[5][2]);

const newarray=superhero.concat("BMW","Mercedes"); //Combines two or more arrays. This method returns a new array without modifying any existing arrays.
console.log(newarray)

const anotherarr=[[4,5,6],7,[6,7,[4,5]]]

console.log(anotherarr)

const anotherarr1=anotherarr.flat(Infinity)//Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.
console.log(anotherarr1)//infinty flatten all levels no matter how deep

const anotherarr2=anotherarr.flat(1); //depth — The maximum recursion depth 
console.log(anotherarr2) //default 1 
//flat does not change original array its return new array useful when nested data

//data scripting using this method
console.log(Array.isArray(anotherarr)); //check given value is array or not

console.log(Array.from("Saklen")); //Creates an array from an iterable object.

console.log(Array.from({name:"Saklen"}));
console.log(Object.keys({name:"Saklen"}));
console.log(Object.values({name:"Saklen"}));

let score1=100;
let score2=200;
let score3=300;
console.log(Array.of(score1,score2,score3)); //Returns a new array from a set of elements.



