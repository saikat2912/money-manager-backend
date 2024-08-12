import express from "express";
import {wealth} from "./models/wealth.js"
import mongoose from "mongoose"
import cors from "cors"

const app= express()
app.use(express.json())
app.use(cors())
const port=process.env.PORT || 5080;



const url=process.env.MONGODB_URI || "mongodb://localhost/wealthReports"
mongoose.connect(url,{useNewUrlParser:true})
const con=mongoose.connection;
con.on("open",()=>{console.log("Mongo DB connected")})

//home
app.get("/",(req,res)=>{
    res.send("Welcome")
})

//get method for week data
app.get("/weekReport",async (req,res)=>{
    let weekDateIso=new Date(new Date() - 7 * 60 * 60 * 24 * 1000).toISOString()
    const weekData= await wealth.find({date:{$gt: weekDateIso}})
    .then(response=>res.json(response))
})

//get method for month data
app.get("/monthReport",async (req,res)=>{
    let monthDateIso=new Date(new Date() - 30 * 60 * 60 * 24 * 1000).toISOString()
    const weekData= await wealth.find({date:{$gt: monthDateIso}})
    .then(response=>res.json(response))
})

//get method for year data
app.get("/yearReport",async (req,res)=>{
    let yearDateIso=new Date(new Date() - 255 * 60 * 60 * 24 * 1000).toISOString()
    const weekData= await wealth.find({date:{$gt: yearDateIso}})
    .then(response=>res.json(response))
})

//get method for last 12 hours data
app.get("/last12HoursReport",async (req,res)=>{
    let yearDateIso=new Date(new Date() - 1/2 * 60 * 60 * 24 * 1000).toISOString()
    const weekData= await wealth.find({date:{$gt: yearDateIso}})
    .then(response=>res.json(response))
})

//get method for all data
app.get("/allReport",async (req,res)=>{
    const weekData= await wealth.find()
    .then(response=>res.json(response))
})

//adding expense or income to database
  app.post("/addData",async (req,res)=>{
      const addData=req.body;

      const data=new wealth(addData);
      try{
          const savedData=await data.save();
          res.send(savedData)
      } catch(err){
          res.status(500).json(err)
      }
  })

app.listen(port,()=>{console.log("Server is started on port",port )})