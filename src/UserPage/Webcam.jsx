import React from "react";
import Webcam from "react-webcam";

const webcamComponent = () => <Webcam />;

const webcamConstraint = {
  // using a square format for the picture to remind the polaroid style used on Instagram
  width: 720,
  height: 720,
  facingMode: user
};

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
  }, [webcamRef]);
};

function webcamComponent() {
  return {};
}

export default webcamComponent;
