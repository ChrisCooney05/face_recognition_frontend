import React from "react";
import BoundingBox from "../BoundingBox/BoundingBox";

function FaceRecognition({ imageUrl, box }) {
  let borderArray;
  if (box.length) {
    borderArray = box.map((singleBox, i) => {
      return <BoundingBox singleBox={singleBox} key={i} />;
    });
  }
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
          {borderArray}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default FaceRecognition;
