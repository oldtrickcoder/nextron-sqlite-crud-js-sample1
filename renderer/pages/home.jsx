import React, { useState, useMemo, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Height } from "@mui/icons-material";
import { UseThemeContext } from "../context";
import Create from "../components/pages/Create";
import Update from "../components/pages/Update";
export default function HomePage() {
  const [message, setMessage] = React.useState([]);
  const [UpdateVar, setUpdateVar] = useState(0);
  const { Phase, SetPhase } = UseThemeContext();
  const [TextKeterangan, SetKeterangan] = useState("");
  React.useEffect(() => {
    Initialize_Page();
  }, []);
  useEffect(() => {
    Initialize_Page();
  }, [Phase]);
  const Initialize_Page = () => {
    window.ipc.send("message", "Jump Around");
    window.ipc.on("message", (message) => {
      setMessage(message);
    });
  };

  const UpdatePage = (dataId) => {
    setUpdateVar(dataId);
    SetPhase("Update");
  };
  const DeleteData = (dataId) => {
    console.log(`Deleting Data with ID ${dataId}`);
    window.ipc.send("DeleteData", dataId);
    window.ipc.on("DeleteData", (data) => {
      console.log("__DATA FROM ipc___", data);
    });
    // console.log(message);

    Initialize_Page();
    SetKeterangan("Data Sudah Berhasil di hapus !");
    setTimeout(() => SetKeterangan(""), 1500);
    return;
    // setUpdateVar(dataId);
    // SetPhase("Index");
  };
  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron </title>
      </Head>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          paddingTop: "50px",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <h1>Halo from a new app</h1>
        <h2>{Phase}</h2>
        <a href="/LocalHostSource">to Localserver source</a>
        <p
          style={{
            color: "purple",
          }}
        >
          <b>{TextKeterangan}</b>
        </p>
        {Phase == "Update" && <Update VarId={UpdateVar} />}
        {Phase == "Create" && <Create />}
        {Phase == "Index" && (
          <>
            <div
              style={{
                width: "100vw",
                padding: "10px",
                paddingRight: "200px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                style={{
                  padding: "5px 15px",
                  backgroundColor: "blue",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => SetPhase("Create")}
              >
                + Create Data
              </button>
            </div>

            <table>
              <thead
                style={{
                  backgroundColor: "black",
                  color: "white",
                  minWidth: "95vw",
                  borderRadius: "20px",
                }}
              >
                <tr className="HeadRow">
                  <th>Id</th>
                  <th>NamaMember</th>
                  <th>JudulBuku</th>
                  <th>Tahun</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="TableBody">
                {message.length > 0 ? (
                  <>
                    {message.map((a) => (
                      <tr className="DataRow" key={a.Id}>
                        <td>{a.Id}</td>
                        <td>{a.NamaMember}</td>
                        <td>{a.JudulBuku}</td>
                        <td>{a.Tahun}</td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              columnGap: "1rem",
                            }}
                          >
                            <button
                              style={{
                                padding: "3px 8px",
                                backgroundColor: "green",
                                color: "white",
                                cursor: "pointer",
                              }}
                              onClick={() => UpdatePage(a.Id)}
                            >
                              Edit Data
                            </button>
                            <button
                              style={{
                                padding: "3px 8px",
                                backgroundColor: "red",
                                color: "white",
                                cursor: "pointer",
                              }}
                              onClick={() => DeleteData(a.Id)}
                            >
                              Hapus Data
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : null}
              </tbody>
            </table>
          </>
        )}
      </div>
    </React.Fragment>
  );
}
