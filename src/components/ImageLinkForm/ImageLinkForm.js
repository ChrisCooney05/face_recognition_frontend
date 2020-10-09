import React from "react";
import "./ImageLinkForm.css";

function ImageLinkForm({ onInputChange, onButtonSubmit, input }) {
  return (
    <div>
      <p className="f3 white b">
        {"Hello human, give me an image and I shall find the faces for you"}
      </p>
      <div className="center">
        <div className="pa4 br3 shadow-5 form center">
          <input
            type="tex"
            className="f4 pa2 w-70 center"
            onChange={onInputChange}
            value={input}
          />
          <button
            className="w-30 grow link dib f4 ph3 pv2 white bg-light-purple"
            onClick={onButtonSubmit}
          >
            Get Finding
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;
