const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

const db = new sqlite3.Database("tensa.db");

db.run(`
  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    phone TEXT,
    location TEXT,
    rating REAL
  )
`);


app.get("/api/services", (req, res) => { 
  db.all("SELECT * FROM services", [], (err, rows) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json(rows);
  });
});

app.post("/api/services", (req, res) => {
  const { worker, name, description, phone, location, rationg } = req.body;

  db.run(
    "INSERT INTO services (worker, name, description, phone, location, rating) VALUES (?, ?, ?, ?, ?, ?)",
    [worker, name, description, phone, location, rating],
    function (err) {
       if (err) {
         res.status(500).json(err);
         return;
       }
      res.json({ id: this.lastID });
    }
   );
 });

   app.delete("api/services/:id", (req, res) => {
     const id = req.params.id;

     db.run("DELETE FROM services WHERE id = ?", function (err) {
       if (err) {
         res.status(500).json(err);
         return;
       }

       res.json({ deleted: this.changes });
     });
    });


app.listen(PORT, () => {
 console.log(`Tensa server running at http://localhost:${PORT}`);
});
















