import React, { useState } from "react";
import Webcam from "react-webcam";
import TextField from "@material-ui/core/TextField";

function WebcamComponent() {
  const [webImage, setWebImage] = useState(null);
  const handleChangeImage = e => {
    setWebImage(e.target.files[0]);
  };

  return (
    <>
      <WebcamCapture takePhoto={setWebImage} />
      <TextField
        id="outlined-full-width"
        label="Ajouter une photo via la webcam"
        type="file"
        style={{ margin: 18 }}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        onChange={handleChangeImage}
      />
    </>
  );
}

export default WebcamComponent;

const videoConstraints = {
  width: 720,
  height: 720,
  facingMode: "user"
};

function WebcamCapture({ takePhoto }) {
  const webcamRef = React.useRef(null);

  const convertBase64ToFile = function(image) {
    const byteString = atob(image.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }
    const newBlob = new Blob([ab], {
      type: "image/jpeg"
    });
    return newBlob;
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot(); // Base64
    takePhoto(convertBase64ToFile(imageSrc));
  }, [webcamRef]);

  return (
    <>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
        alignItems="center"
      />
      <button onClick={capture} alignItems="center" padding="15">
        Prendre une photo depuis la Webcam
      </button>
    </>
  );
}
