import React from "react";
import "./FaceRecognition.css";

function FaceRecognition({ imageUrl, box }) {
  console.log(box);
  if (imageUrl !== "") {
    return (
      <div className="center ma" alt="img">
        <div className="absolute mt2">
          <img
            src={imageUrl}
            alt="img"
            width="500px"
            height="auto"
            id="inputImage"
          />
          <div
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default FaceRecognition;
