import React, { Component } from "react";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConf: "",
      name: "",
      passwordError: false,
    };
  }
  onEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  onPasswordConfChange = event => {
    this.setState({ passwordConf: event.target.value });
  };

  onNameChange = event => {
    this.setState({ name: event.target.value });
  };

  onSubmitRegister = () => {
    if (this.state.password !== this.state.passwordConf) {
      this.setState({ passwordError: true });
    } else {
      fetch("https://facerecogapi.herokuapp.com/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.state.email.toLowerCase(),
          password: this.state.password,
          name: this.state.name,
        }),
      })
        .then(response => response.json())
        .then(user => {
          if (user.id) {
            this.props.loadUser(user);
            this.props.onRouteChange("home");
          }
        });
    }
  };

  render() {
    const { passwordError } = this.state;
    return (
      <div>
        {passwordError === true && (
          <h1 className="center">Passwords do not match</h1>
        )}
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Name
                  </label>
                  <input
                    onChange={this.onNameChange}
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="text"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    onChange={this.onEmailChange}
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                  </label>
                  <input
                    onChange={this.onPasswordChange}
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                  />
                  <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">
                      Password Confirmation
                    </label>
                    <input
                      onChange={this.onPasswordConfChange}
                      className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                      type="password"
                      name="passwordConf"
                      id="password"
                    />
                  </div>
                </div>
              </fieldset>
              <div className="">
                <input
                  onClick={this.onSubmitRegister}
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer"
                  type="submit"
                  value="Register"
                />
              </div>
            </div>
          </main>
        </article>
      </div>
    );
  }
}

export default Register;
