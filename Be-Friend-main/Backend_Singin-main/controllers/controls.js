const mongoose=require("mongoose")
const userSchema=require("../models/user")
const bcrypt=require("bcrypt")

exports.signup=async function (req,res)
{
    console.log(req.body)
    const {name,email,password}=req.body

    if(!(name === '' && email === '' && password === ''))
    {
        const user=await userSchema.findOne({email})
        console.log(user)
        if(user)
        {
            res.status(404).send("user already registered")
        }
        else
        {
            const userCreated=await userSchema.create({...req.body})
            res.status(200).json({
                success:true,
                message:"Sign up successful"
            })
        }
    }
}

exports.signin=async function(req,res)
{
    const {email,password}=req.body

    if(!(email && password))
    {
        res.status(404).send("Fill all details")
    }
    else
    {
        const user=await userSchema.findOne({email})

        if(user)
        {
            const result=await bcrypt.compare(password,user.password)
            if(result)
            {
                res.status(200).send("user sign in successful")
            }
            else
            {
                res.status(404).send("Incorrect Password")
            }
        }
        else
        {
            res.status(404).send("register first")
        }
    }
} 