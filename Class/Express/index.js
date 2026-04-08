const express = require("express")
const app = express()

// app.get("/",(req,res) => res.send("Welcome to Home !!"))
// app.get("/Orders",(req,res) => res.send("Orders Dashboard !!"))
// app.get("/Profile",(req,res) => res.send("Getting Profile Info ......."))
// app.get("/About",(req,res) => res.send("About Page !!"))
// app.get("/Contact" , (req,res) => res.send("Contact us Page"))

//res.json method
app.get("/",(req,res)=>{
  const t=new Date();
  res.json({
    msg:"Hello",
    time:t,
  })
}
)

//

app.listen(4000,() => console.log(`Server started on ${4000}!!`))