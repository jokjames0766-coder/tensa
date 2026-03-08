const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

let services = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/services", (req, res) => {
  res.json(services);
});

app.post("/services", (req, res) => {
  const service = req.body;
  services.push(service);
  res.json({ message: "Service added" });
});

app.delete("/services/:index", (req, res) => {
  const index = req.params.index;
  services.splice(index, 1);
  res.json({ message: "Service deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});











