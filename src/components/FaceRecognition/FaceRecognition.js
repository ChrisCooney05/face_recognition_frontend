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
      <div className="center ma">
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
    return (
      <div className="white f3 b">
        <br />
        <p>
          Welcome to Face-Bot! to make things easier heres a link for you to
          test me!
          <br />
          <br />
          https://www.halffullnotempty.com/wp-content/uploads/Gandalf-quotes.jpg
          <br />
          <br />I also work on group photos
        </p>
      </div>
    );
  }
}

export default FaceRecognition;
