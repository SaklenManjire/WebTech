//there are two types of memeory stack and heap stack is used for primitive and heap used for non-primitive.


//primitive data type stored in stack when we assign one variable to another copy is value so changing one is doensot affect another.
let mynewytchannel="SMM"
console.log(mynewytchannel)

let newytchannel=mynewytchannel//copy of value in stack
console.log(newytchannel);

newytchannel="SMJ"
console.log(mynewytchannel);
console.log(newytchannel);



//non-primitive data type stored in stack when we assign one variable to another reference  is assigned not the value  so changing one is  affect another.
let user1={
    name:"Saklen",
    age:21,
    id:1
}

console.log(user1);
let user2 = user1
user1.name="Kaushal"
console.log(user2);

