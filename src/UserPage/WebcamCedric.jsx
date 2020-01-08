import React, { useRef, useState } from "react";

import { Create, SimpleForm, ImageInput, ImageField } from "react-admin";

import axios from "axios";

export const MediaObjectCreate = props => {
  const [targetImage, setTargetImage] = useState(null);

  const sendForm = async e => {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "file",

      targetImage,

      targetImage.name
    );

    try {
      const res = await axios.post(
        "http://localhost:8089/api/media_objects",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = e => {
    console.log(e.target.files);

    setTargetImage(e.target.files[0]);
  };

  return (
    <Create {...props}>
      <SimpleForm>
        <ImageInput source="file" label="Image" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />

        {targetImage && <img src={URL.createObjectURL(targetImage)} />}

        <button onClick={sendForm}>click</button>
      </SimpleForm>
    </Create>
  );
};
