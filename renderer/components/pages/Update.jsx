import React from "react";
import { useState, useEffect } from "react";
import { UseThemeContext } from "../../context";

function Update({ VarId }) {
  const [Keterangan, SetKeterangan] = useState("");
  const { Phase, SetPhase } = UseThemeContext();
  const [NamaMember, setNamaMember] = useState("");
  const [JudulBuku, setJudulBuku] = useState("");
  const [TahunTerbit, setTahunTerbit] = useState(0);
  const Get_DATA = async () => {
    await window.ipc.send("RetrieveSpecData", VarId);
  };
  useEffect(() => {
    Get_DATA();
    window.ipc.on("Specific_Data", (message) => {
      setNamaMember(message.NamaMember);
      setJudulBuku(message.JudulBuku);
      setTahunTerbit(message.Tahun);
    });
  }, []);
  const SubmitUpdateData = (VarId) => {
    let Payload = {
      NamaMember,
      JudulBuku,
      Tahun: TahunTerbit,
      Id: VarId,
    };

    window.ipc.send("UpdateData", Payload);
    window.ipc.on("UpdateData", (message) => console.log(message));
    SetPhase("Index");
    SetKeterangan("Berhasil Update Data  !");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: "1.3rem",
      }}
    >
      <p
        style={{
          color: "green",
        }}
      >
        {Keterangan}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          columnGap: ".3rem",
        }}
      >
        <label htmlFor="Id">Id</label>
        <input
          type="text"
          placeholder="Id anda ...."
          name="Id"
          value={VarId}
          disabled
        />
      </div>
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
          type="number"
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
            backgroundColor: "Green",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => SubmitUpdateData(VarId)}
        >
          Update
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

export default Update;
