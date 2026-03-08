const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let services = [];

app.get("/services", (req, res) =>{
    res.json(rows);
  });
});

app.post("/services", (req, res) =>{
  services.push(req.body);
  res.json({message:"service added"});
}):

   app.delete("/services/:index",(req, res) =>{
     const index = req.params.index;
     services.splice(index,1);
     res.json({message:"service deleted"});
   });

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
 console.log("Tensa server running at http://localhost:"+{PORT});
});
















