import React from "react";

function Rank({ name, entries }) {
  return (
    <div>
      <div className="white f3 b">{`${name}, I have looked at ${entries} images!`}</div>
    </div>
  );
}

export default Rank;
