require('./db/db.connection')

const express = require('express');
const cors = require('cors');

const app = express();
// const corsOptions = {
//     origin:"*",
//     credentials: true,
//     optionSuccessStatus: 200
// }

app.use(cors());
app.use(express.json());

const JOB = require('./models/job.models');


app.get("/", (req,res) =>{
    res.send("Welcome to the job board API");
})

app.get("/jobs",async (req,res) =>{
    try{
        const jobs = await JOB.find();
        if(jobs)
        {
            res.status(200).json({message:"Succcess",jobs});
        }
        else
        {
            res.status(404).json({message:"No jobs found"});
        }
    } catch(err)
    {
        res.status(500).json({message:"Server Error",err});
    }
})

app.post("/jobs",async(req,res) =>{
    try{
        const newData = req.body;
        const newJob = new JOB(newData)
        const savedJob = await newJob.save();
        if(savedJob)
        {
            res.status(201).json({message:"Job added successfully",savedJob});
        }
        else
        {
            res.status(400).json({message:"Job not added"});
        }
    } catch(err)
    {
        res.status(500).json({message:"Server Error",err});
    }
})

app.get("/jobs/title/:title",async(req,res) =>{
    try{
        const title = req.params.title;
        const jobs = await JOB.find({title:title})
        if(jobs)
        {
            res.status(200).json({message:"Succcess",jobs});
        }
        else
        {
            res.status(404).json({message:"No jobs with this title found"});
        }
    } catch(err)
    {
        res.status(500).json({message:"Server Error",err});
    }   
})

app.get("/jobs/:id",async(req,res) =>{
    try{
        const id = req.params.id
        const jobs = await JOB.findById(id)
        if(jobs)
        {
            res.status(200).json({message:"Success",jobs})
        }
        else
        {
            res.status(404).json({message:"Job Not Found"})
        }
    } catch(err)
    {
        res.status(500).json({message:"Server Issue",err})
    }
})

app.delete("/jobs/:id",async(req,res) =>{
    try{
        const id = req.params.id
        const deleteReq = await JOB.findByIdAndDelete(id)
        if(deleteReq)
        {
            res.status(200).json({message:"Job deleted successfully"});
        }
        else
        {
            res.status(404).json({message:"Job not found"});
        }
    } catch(err)
    {
        res.status(500).json({error:"Server Error",err})
    }
})

const PORT = process.env.PORT || 4000;
app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`);
})