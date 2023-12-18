import React from "react";
import { useState } from "react";
import { UseThemeContext } from "../../context";
function Create() {
  const [NamaMember, setNamaMember] = useState("");
  const [JudulBuku, setJudulBuku] = useState("");
  const [TahunTerbit, setTahunTerbit] = useState(0);
  const { Phase, SetPhase } = UseThemeContext();
  const SubmitAction = async () => {
    let Payload = { NamaMember, Judul: JudulBuku, Tahun: TahunTerbit };
    console.log(Payload);
    window.ipc.send("CreateData", Payload);
    SetPhase("Index");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: "1.3rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          columnGap: ".3rem",
        }}
      >
        <label htmlFor="nama">Nama</label>
        <input
          type="text"
          placeholder="Nama anda ...."
          name="nama"
          value={NamaMember}
          onChange={(e) => setNamaMember(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          columnGap: ".3rem",
        }}
      >
        <label htmlFor="JudulBuku">Judul Buku</label>
        <input
          type="text"
          placeholder="JudulBuku anda ...."
          name="JudulBuku"
          value={JudulBuku}
          onChange={(e) => setJudulBuku(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          columnGap: ".3rem",
        }}
      >
        <label htmlFor="TahunTerbit">Tahun</label>
        <input
          type="date"
          placeholder="TahunTerbit anda ...."
          name="TahunTerbit"
          value={TahunTerbit}
          onChange={(e) => setTahunTerbit(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          columnGap: ".3rem",
        }}
      >
        <button
          style={{
            padding: "5px 15px",
            backgroundColor: "blue",
            color: "white",
            cursor: "pointer",
          }}
          onClick={SubmitAction}
        >
          Submit
        </button>
        <a
          onClick={() => SetPhase("Index")}
          style={{
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          {" "}
          Kembali ke halaman sebelumnya
        </a>
      </div>
    </div>
  );
}

export default Create;
