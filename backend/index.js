const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("test.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) throw err;
});

async function DB_Initializer() {
  db.serialize(async () => {
    //   const INIT_DB = await db.run(
    //     "CREATE TABLE IF NOT EXISTS DataPerpus(Id INTEGER PRIMARY KEY,NamaMember TEXT,JudulBuku  TEXT,  Tahun INTEGER, Created_At datetime DEFAULT CURRENT_TIMESTAMP)"
    //   );
    //   if (INIT_DB.err) throw INIT_DB.err;
    //   console.log(INIT_DB, "___init DB______");
    await db.run(
      "INSERT INTO DataPerpus(NamaMember,JudulBuku,Tahun) VALUES(?,?,?)",
      ["Joni Ahoy", "Same old song", 1981],
      (err, data) => {
        if (err) throw err;
        console.log(data);
        console.log("Row Successfully added");
      }
    );

    const AllData = await db.run("SELECT * FROM DataPerpus");
    if (AllData.err) return AllData.err;
    console.log("___ ALL DATA-----", AllData);
  });
}

DB_Initializer();
app.get("/", async (req, res) => {
  await db.all("SELECT * FROM DataPerpus", (err, rows) => {
    if (err) throw err;
    console.log(rows);
    return res.status(200).json({
      message: "oke",
      data: rows,
    });
  });
});
app.get("/:id", async (req, res) => {
  await db.run("SELECT * FROM DataPerpus", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
  return res.status(200).json({
    message: "oke",
    data: "here is the data",
  });
});
app.post("/", async (req, res) => {
  await db.run("SELECT * FROM DataPerpus", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
  return res.status(200).json({
    message: "oke",
    data: "here is the data",
  });
});
app.put("/:id", async (req, res) => {
  await db.run("SELECT * FROM DataPerpus", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
  return res.status(200).json({
    message: "oke",
    data: "here is the data",
  });
});
app.delete("/:id", async (req, res) => {
  await db.run("SELECT * FROM DataPerpus", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
  return res.status(200).json({
    message: "oke",
    data: "here is the data",
  });
});

app.listen(3000, () => {
  console.log("Server Listen At Port 3000");
});

// "INSERT INTO DataPerpus(NamaMember,JudulBuku,Tahun) VALUES('Joni Ahoy', 'Same old song',1981),('Joni Blazor', 'Same old song',1981),('Bam Marger', 'Same old song',1981)"
