import React, { Component } from 'react'
import { withAuth } from '../contexts/authContext';
import NavBar from '../components/droy/NavBar'
import { Link } from 'react-router-dom'
import '../styles/login-signup.css'

class SignUp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      hashedPassword: "",
      name: "",
      confirmationPassword: ""
    }

  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, hashedPassword, name, confirmationPassword } = this.state
    const { handleSignUp } = this.props
    handleSignUp({ email, hashedPassword, name, confirmationPassword });
    this.setState({
      email: "",
      password: "",
      hashedPassword: "",
      confirmationPassword: ""
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { email, hashedPassword, name, confirmationPassword } = this.state
    const { signUpError } = this.props
    return (
      <div>
        <NavBar />
        <div className='login-signup-container'>
          <div className='logo-container'>
          </div>
          <div className='form-title-container'>
            <h1 className='title-login-signup'>Sign Up</h1>
            <p>{signUpError}</p>
            <form className='login-form' onSubmit={this.handleSubmit}>
              <input className='input-form'
                placeholder="email"
                type="text"
                required="required"
                name="email"
                value={email}
                id="email"
                onChange={this.handleChange}
              />
              <input className='input-form'
                type="password"
                required="required"
                placeholder="······"
                name="hashedPassword"
                id="hashedPassword"
                value={hashedPassword}
                onChange={this.handleChange}
              />
              <input className='input-form'
                type="password"
                required="required"
                placeholder="······"
                name="confirmationPassword"
                id="confirmationPassword"
                value={confirmationPassword}
                onChange={this.handleChange}
              />
              <input className='input-form'
                type="text"
                required="required"
                placeholder="Bob Marley"
                name="name"
                id="name"
                value={name}
                onChange={this.handleChange}
              />
              <div className='button-link-login-signup'>
                <Link className='text-form' to="/login">Already have an account? Log in here!</Link>
                <input className='button-form' type="submit" value="create your account" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(SignUp)