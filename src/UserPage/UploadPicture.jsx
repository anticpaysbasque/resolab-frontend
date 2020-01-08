import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

function UploadImage({ token }) {
  const [image, setImage] = useState(null);

  const handleChange = e => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    };

    try {
      await axios.post(
        "http://localhost:8089/api/media_objects",
        formData,
        config
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      {/* <label htmlFor="upload-button">
                image.preview()
                {
                    <img
                        src={image.preview}
                        width="300"
                        height="300"
                        alt="preview"
                    />
                }
                )
            </label> */}
      <input type="file" id="upload-button" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </>
  );
}

const mapStateToProps = state => {
  return { token: state.authReducer.token };
};

export default connect(mapStateToProps)(UploadImage);
