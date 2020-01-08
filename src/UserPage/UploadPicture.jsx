import React, { useState } from "react";
import axios from "axios";

export default function UploadImage() {
  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleChange = e => {
    setImage({
      previeew: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0]
    });
  };

  const handleUpload = async e => {
    e.preventDefault();
    const formData = new formData();
    formData.append("image", image.raw);
    const config = { headers: { "content-type": "multipart/form-data" } };

    try {
      await axios.post(
        "http://localhost:3000/upload",
        { image: image.raw },
        config
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <label htmlFor="upload-button">
        {image.preview ? (
          <img src={image.preview} width="720" height="720" alt="preview" />
        ) : (
          <>
            <span className="fa-stack fa-2x mt-3 mb-2">
              <i className="fas fa-circle fa-stack-2x"></i>
              <i className="fas fa-store fa-stack-1x fa-inverse"></i>
            </span>
            <h5 className="text-center"> Upload your photo</h5>{" "}
          </>
        )}
      </label>
      <input
        type="file"
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <button onClick={handleUpload}>Upload</button>
    </>
  );
}
