const mongoose=require("mongoose")
const bcrypt=require("bcrypt")


const UserSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        unique:true,
        required:true
    }
})

UserSchema.pre("save",async function (next){
    if(!this.isModified('password'))
        return next()
    this.password=await bcrypt.hash(this.password,8);
})

module.exports=mongoose.model("User",UserSchema)