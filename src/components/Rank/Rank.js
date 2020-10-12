import React from "react";

function Rank({ name, entries }) {
  return (
    <div>
      <div className="white f3 b">{`${name}, so far I have looked at ${entries} images!`}</div>
      <br />
    </div>
  );
}

export default Rank;
