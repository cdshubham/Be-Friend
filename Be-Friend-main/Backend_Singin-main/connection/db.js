const mongoose=require("mongoose")

const connectToDB=async function (){

    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("An error occured")
    }

}

module.exports=connectToDB