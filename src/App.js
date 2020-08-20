import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import SignIn from "./components/SignIn/SignIn";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Particles from "react-particles-js";
import Register from "./components/Register/Register";
import Clarifai from "clarifai";
import "./App.css";

const app = new Clarifai.App({
  apiKey: "2bbaa1cdf7314962be09b4e47a0e3dfb",
});

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

class App extends Component {
  constructor() {
    super();
    this.state = {
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
  }

  loadUser = user => {
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

  calculateFaceLocation = data => {
    // data.outputs[0].data.regions returns all bounding_box for multi face recognition
    const clarifaiFace = data.outputs[0].data.regions;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return clarifaiFace.map(face => {
      const singleFace = face.region_info.bounding_box;
      return {
        leftCol: singleFace.left_col * width,
        topRow: singleFace.top_row * height,
        rightCol: width - singleFace.right_col * width,
        bottomRow: height - singleFace.bottom_row * height,
      };
    });
  };

  setFaceBoxState = box => {
    this.setState({ box: box });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if (response) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            });
        }
        this.setFaceBoxState(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  };

  onRouteChange = route => {
    if (route === "signIn" || route === "register") {
      this.setState({ isSignedIn: false });
    } else {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, route, imageUrl, box } = this.state;
    let componentsToRender;

    if (route === "home") {
      componentsToRender = (
        <div>
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition imageUrl={imageUrl} box={box} />
        </div>
      );
    } else if (route === "signIn") {
      componentsToRender = (
        <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
      );
    } else {
      componentsToRender = (
        <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
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
