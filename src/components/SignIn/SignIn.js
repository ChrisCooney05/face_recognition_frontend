import React, { Component } from "react";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "test@test.co.uk",
      signInPassword: "Welcome123",
      loginFailed: false,
    };
  }
  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = async () => {
    try {
      const loginFetch = await fetch(
        "https://facerecogapi.herokuapp.com/signin",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.state.signInEmail.toLowerCase(),
            password: this.state.signInPassword,
          }),
        }
      );
      const user = await loginFetch.json();
      if (user.id) {
        this.props.loadUser(user);
        this.props.onRouteChange("home");
        this.setState({ loginFailed: false });
      }
    } catch (err) {
      this.setState({ loginFailed: true });
    }
  };

  render() {
    const { loginFailed, signInEmail, signInPassword } = this.state;
    return (
      <div>
        {loginFailed === true && (
          <h1 className="center black ">Incorrect Login Credentials</h1>
        )}
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
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
                    value={signInEmail}
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
                    value={signInPassword}
                  />
                </div>
              </fieldset>
              <div className="">
                <input
                  onClick={this.onSubmitSignIn}
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Sign in"
                />
              </div>
            </div>
          </main>
        </article>
        <div className="white f3 b mw6 center">
          Whilst there is a working sign in box, to make things a little easier
          the form has been pre filed for you, go ahead and click sign in to get
          started
        </div>
      </div>
    );
  }
}

export default SignIn;
