let myToken="1234"

let checkToken=(req,res,next)=>{
    return res.send(
        {
        status:0,
        msg:"please fill the token"
        }
    )

}

if(req.query.token!=process.env.myToken)
{
    return res.send(
        {
            status:0,
            msg:"please fill the correct token"
        }
    )

    next()
}

