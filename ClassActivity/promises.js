//Represents the completion of an asynchronous operation
//prmosis has 3 step 1 is pending 2 is resolved 3 is rejected
let mypromises=new Promise((resolve,reject)=>{
    let success=false;
    if(success)
    {
        resolve("Data fetched successfully.");
    }else{
        reject("Error while fetching data.");
    }
})

mypromises.then((result)=>{
    console.log(result);
}).catch((error)=>{
    console.log(error)
})

//why promises better than callback
const mypromise=new Promise((resolve,reject)=>{
    setTimeout(() => {
        console.log("Assign task complete.");
        resolve();
    }, 3000);
})

mypromise.then(()=>
{
  console.log("Promises consume.")
})

//3.
const promise=new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve({name:"saklen",email:"saklenmanjire032@gmail.com"});
    }, 3000);
})

promise.then((user)=>{
    console.log(user);
})

//if variable true then show resolve or show reject
//async keyword use and write promises or in function
//two simple example