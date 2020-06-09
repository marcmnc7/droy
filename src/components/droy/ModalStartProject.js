import React, { Component } from 'react'
import PropTypes from 'prop-types'
import api from '../../services/apiClient'
import { withRouter } from "react-router";
import firebase from '../../services/firebase'
import { notifyError } from '../../services/notifications'

class ModalStartProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      theme: 'classic'
    }
  }

  /* Catch form information and set it on the state */
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const { name, theme } = this.state
      const { history } = this.props
      const userUid = firebase.auth().currentUser.uid
      const createdProject = await api.post(`/projects/user/${userUid}`, { name, style: theme })
      history.push(`/builder/${createdProject.data._id}`)
    } catch (error) {
      notifyError('Unable to create this project...')
    }
  }

  selectOption = (theme) => {
    this.setState({ theme })
  }

  render() {
    const { onClose, styles } = this.props
    const { name, theme } = this.state;

    return (
      <div className='modal-container centered-modal'>
        <div className='modal-style'>
          <button className='close-modal' onClick={onClose}>
            <img className='close-modal-image' src="../../img/close-icon.png" alt='delete-project'></img>
          </button>
          <form className='form-create-project' onSubmit={this.handleSubmit}>
            <label className='label-modal' htmlFor="name">Name of the project:</label>
            <input required="required" className='input-modal' type="text"
              id='name'
              value={name}
              name="name"
              placeholder="name"
              onChange={this.handleChange} />
            <label className='label-modal' htmlFor="theme">Choose a theme:</label>
            <div className="selector-container">
            {styles.map((s, k) => <div className="image-selector"><img className={theme === s.code && "selected"} alt='theme' key={k} src={s.image} onClick={() => this.selectOption(s.code)}/>{s.name}</div>)}
            </div>
            <button className='button-modal' type='submit'>Create project</button>
          </form>
        </div>
      </div>
    )
  }
}

ModalStartProject.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
}

export default withRouter(ModalStartProject)
