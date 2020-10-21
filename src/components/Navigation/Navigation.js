import React from "react";

function Navigation({ onRouteChange, isSignedIn }) {
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("signIn")}
          className="f3 dim link underline pointer pa3 white"
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("signIn")}
          className="f3 dim link underline pointer pa3 white"
        >
          Sign In
        </p>
      </nav>
    );
  }
}

export default Navigation;
