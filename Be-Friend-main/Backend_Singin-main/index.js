require("dotenv").config()
const express=require("express")
const app=express()
const cors=require("cors")

const connectToDB=require("./connection/db")

const {signin,signup}=require("./controllers/controls")

//setting middlewares

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: 'http://localhost:5500',
    methods: 'POST',
    allowedHeaders: 'Content-Type,Authorization',
}))


//connecting database
connectToDB()

app.post("/signup",signup);

app.post("/signin",signin);


app.listen(process.env.PORT,function (){
    console.log("Server is Up")
})