const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb+srv://jokjames0766_db_user:Tensa2026@cluster0.2gnjhxd.mongodb.net/tensa?retryWrites=true&w=majority")
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

const serviceSchema = new mongoose.Schema({
name:String,
type:String,
description:String,
phone:String,
location:String,
rating:String,
photo:String,
reviews:[String]
});

const Service = mongoose.model("Service", serviceSchema);

app.get("/services", async (req,res)=>{
const services = await Service.find();
res.json(services);
});

app.post("/services", async (req,res)=>{
const service = new Service(req.body);
await service.save();
res.json({message:"Service saved"});
});

app.post("/reviews/:id", async (req,res)=>{
const service = await Service.findById(req.params.id);
service.reviews.push(req.body.review);
await service.save();
res.json({message:"Review added"});
});

app.delete("/services/:id", async (req,res)=>{
await Service.findByIdAndDelete(req.params.id);
res.json({message:"Service deleted"});
});

app.listen(PORT, ()=>{
console.log("Server running on port "+PORT);
});
