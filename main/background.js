import path from "path";
import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("test.db");

/***
 * This Below the schema that will be used inside the db :
 * CREATE TABLE IF NOT EXISTS DataPerpus(
    Id INTEGER PRIMARY KEY,
    NamaMember TEXT,
  JudulBuku  TEXT,  
  Tahun INTEGER, 
  Created_At datetime DEFAULT CURRENT_TIMESTAMP
  )
* here is the data 
*
***/

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isProd) {
    mainWindow.setMenuBarVisibility(false);
    await mainWindow.loadURL("app://./home");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.setMenuBarVisibility(false);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});
app.on("ready", async () => {
  console.log("app ... is Ready");
  const INIT_DB = await db.run(
    "CREATE TABLE IF NOT EXISTS DataPerpus(Id INTEGER PRIMARY KEY,NamaMember TEXT,JudulBuku  TEXT,  Tahun INTEGER, Created_At datetime DEFAULT CURRENT_TIMESTAMP)"
  );
  console.log(INIT_DB, "___init DB______");
  // const SeedingData = await db.run(
  //   "INSERT INTO DataPerpus(NamaMember,JudulBuku,Tahun) VALUES('Joni Ahoy', 'Same old song',1981),('Joni Blazor', 'Same old song',1981),('Bam Marger', 'Same old song',1981)"
  // );
  // if (SeedingData.err) return SeedingData.err;
  // console.log(SeedingData, "__Seeding Data___");
  // const AllData = await db.all("SELECT * FROM DataPerpus");
  // if (AllData.err) return AllData.err;
  // console.log("___ ALL DATA-----", AllData);
});
ipcMain.on("message", async (event, arg) => {
  await db.all("SELECT * FROM DataPerpus", (err, rows) => {
    if (err) throw err;
    event.reply("message", rows);
  });
});

ipcMain.on("RetrieveSpecData", async (event, args) => {
  console.log(`SELECT * FROM DataPerpus Where Id=${args}`);
  await db.get(`SELECT * FROM DataPerpus Where Id=${args}`, (err, rows) => {
    if (err) throw err;
    console.log(rows, "  Ini Data Rows");
    event.reply("Specific_Data", rows);
  });
});

ipcMain.on("CreateData", async (event, args) => {
  console.log(args);
  const Tahun = args.Tahun.split("-")[0];
  console.log(Tahun);
  await db.run(
    "INSERT INTO DataPerpus(NamaMember,JudulBuku,Tahun) VALUES(?,?,?)",
    [args.NamaMember, args.Judul, Tahun],
    (err) => {
      if (err) throw err;
    }
  );
});

ipcMain.on("UpdateData", async (event, args) => {
  const Tahun = args.Tahun;
  console.log("__Data Payload____", args);
  await db.run(
    "UPDATE DataPerpus SET NamaMember=?,JudulBuku=?,Tahun=? WHERE Id=?",
    [args.NamaMember, args.JudulBuku, Tahun, args.Id],
    (err) => {
      if (err) throw err;
      event.reply("UPDATE_USERS_REPLY", args);
    }
  );
});

ipcMain.on("DeleteData", async (event, args) => {
  console.log(args, "___data from front end");
  await db.run("DELETE FROM DataPerpus WHERE Id=?", [args], (err, data) => {
    if (err) throw err;

    event.reply("data", "Successfully Deleting data", data);
  });

  // await db.send("DELETE FROM DataPerpus Where Id =")
});
