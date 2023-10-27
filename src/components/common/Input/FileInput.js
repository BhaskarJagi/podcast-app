import React, { useState } from "react";
import "./styles.css";

function FileInput({ accept, id, text, handleFileFnc }) {
  const [fileSelected, setFileSelected] = useState("");

  const onChange = (e) => {
    // console.log(e.target.files)
    setFileSelected(e.target.files[0].name);
    handleFileFnc(e.target.files[0]);
  };

  return (
    <>
      <label
        htmlFor={id}
        className={`custom-input ${!fileSelected ? "label-input" : "active"}`}
      >
        {fileSelected ? `The File ${fileSelected} was selected.` : text}
      </label>
      <input
        type="file"
        style={{ display: "none" }}
        id={id}
        accept={accept}
        onChange={onChange}
      />
    </>
  );
}

export default FileInput;
