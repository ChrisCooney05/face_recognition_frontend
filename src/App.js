import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import SignIn from "./components/SignIn/SignIn";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Particles from "react-particles-js";
import "./App.css";

const particlesEffect = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 500,
      },
    },
  },
};

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signIn",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    // data.outputs[0].data.regions returns all bounding_box for multi face recognition
    const clarifaiFace = data.outputs[0].data.regions;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return clarifaiFace.map((face) => {
      const singleFace = face.region_info.bounding_box;
      return {
        leftCol: singleFace.left_col * width,
        topRow: singleFace.top_row * height,
        rightCol: width - singleFace.right_col * width,
        bottomRow: height - singleFace.bottom_row * height,
      };
    });
  };

  setFaceBoxState = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = async () => {
    this.setState({ imageUrl: this.state.input });
    try {
      const apiCall = await fetch(
        "https://facerecogapi.herokuapp.com/imageurl",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: this.state.input,
          }),
        }
      );
      const imageBox = await apiCall.json();
      this.setFaceBoxState(this.calculateFaceLocation(imageBox));
      this.handleCount();
      this.setState({ input: "" });
    } catch (err) {
      console.log(err);
    }
  };

  handleCount = async () => {
    const imageCount = await fetch("https://facerecogapi.herokuapp.com/image", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.user.id,
      }),
    });
    const count = await imageCount.json();
    this.setState(Object.assign(this.state.user, { entries: count }));
  };

  onRouteChange = (route) => {
    if (route === "signIn" || route === "register") {
      this.setState(initialState);
    } else {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, route, imageUrl, box, input } = this.state;
    let componentsToRender;

    if (route === "home") {
      componentsToRender = (
        <div>
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
            input={input}
          />
          <FaceRecognition imageUrl={imageUrl} box={box} />
        </div>
      );
    } else if (route === "signIn") {
      componentsToRender = (
        <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
      );
    }

    return (
      <div className="App">
        <Particles className="particles" params={particlesEffect} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        {componentsToRender}
      </div>
    );
  }
}

export default App;
