import React from "react";
import "./boundingBox.css";

function BoundingBox({ singleBox }) {
  return (
    <div
      className="bounding-box"
      style={{
        top: singleBox.topRow,
        right: singleBox.rightCol,
        bottom: singleBox.bottomRow,
        left: singleBox.leftCol,
      }}
    ></div>
  );
}

export default BoundingBox;
