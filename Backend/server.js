const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb",
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/login", (req, res) => {
  const sql = "SELECT * FROM login ";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/create", (req, res) => {
  const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?)";
  const values = [req.body.name, req.body.email];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json("Error" + err);
    return res.json(data);
  });
});

app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM student WHERE `student`.`ID` = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) return res.json("Error" + err);
    return res.json(data);
  });
});

app.put("/update/:id", (req, res) => {
  const sql =
    "UPDATE `student` SET `Name` = ?, `Email` = ?  WHERE `student`.`ID` = ?";
  const values = [req.body.name, req.body.email];

  const id = req.params.id;

  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json("Error" + err);
    return res.json(data);
  });
});

app.listen(8081, () => {
  console.log("listening on port 8081");
});
