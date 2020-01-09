import React from "react";
import Webcam from "react-webcam";
import TextField from "@material-ui/core/TextField";

const webcamComponent = () => <Webcam />;

const webcamConstraint = {
  // using a square format for the picture to remind the polaroid style used on Instagram
  width: 720,
  facingMode: user
};

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
  }, [webcamRef]);
};

function webcamComponent() {
  return (
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
  );
}

export default webcamComponent;
