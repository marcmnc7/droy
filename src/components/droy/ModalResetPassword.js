import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../styles/modal-projects.css'
import firebase from '../../services/firebase'
import { notifyError, notifyInfo } from '../../services/notifications'

class ModalResetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: ''
    }
  }

  /* Catch form information and set it on the state */
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /* Send a reset instructions to user mail */
  handleSubmit = async (e) => {
    e.preventDefault()
    const { onClose } = this.props
    const { email } = this.state
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      notifyInfo(`Check your inbox 😊`)
      onClose()
    })
    .catch((e) => {
      notifyError(e.message)
    })
  }

  render() {
    const { email } = this.state
    const { onClose } = this.props
    return(
      <div className='modal-container-reset'>
      <div className='modal-style-reset'>
        <button className='close-modal' onClick={onClose}>
          <img className='close-modal-image' src="../../img/close-icon.png" alt='delete-project'></img>
        </button>
        <form className='form-create-project' onSubmit={this.handleSubmit}>
          <label className='label-modal' htmlFor="name">Email:</label>
          <input required="required" className='input-modal' type="text"
            id='email'
            value={email}
            name="email"
            placeholder="bob@marley.com"
            onChange={this.handleChange} />
          <button className='button-modal' type='submit'>Reset</button>
        </form>
      </div>
    </div>
    )
  }
}

ModalResetPassword.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
}

export default ModalResetPassword
