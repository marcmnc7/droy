import React, { Component } from 'react'
import api from '../../services/apiClient'
import firebase from '../../services/firebase'
import { notifyError, notifyInfo } from '../../services/notifications'

export default class ModalDelete extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
    }
  }

  /* Catch form information and set it on the state */
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /* Delete the project in frontend and backend */
  handleDelete = async (e) => {
    try {
      e.preventDefault()
      const { project, onClose } = this.props
      const { name } = this.state
      if (name !== project.name) notifyError('Incorrect project name')
      else {
        await api.delete(`/projects/${project._id}`)
        const listRef = firebase.storage().ref(firebase.auth().currentUser.uid)
        const res = listRef.child(project._id)
        res.listAll().then(function(res) {
          res.items.forEach(function(itemRef) {
            itemRef.delete()
          })
        })
        notifyInfo('👋 Project deleted')
        onClose()
      }
    } catch (error) {
      notifyError('Error deleting your project...')
    }
  }

  render() {
    const { onClose, project } = this.props
    return (
      <div className='modal-container centered-modal'>
        <div className='modal-style'>
          <button className='close-modal' onClick={onClose}>
            <img className='close-modal-image' src="../../img/close-icon.png" alt='delete-project'></img>
          </button>
          <h2 className='title-modal'>Delete your proyect:</h2>
          <p className='text-modal-close'> This action is irreversible. <br/> Enter your project name <code className='name-text-delete'> {project.name} </code> 
          below to confirm you want to permanently delete it:</p>
          <form className='form-create-project' onSubmit={this.handleDelete}>
            <input required="required" className='input-modal' type="text"
              name="name"
              placeholder=""
              onChange={this.handleChange} />
            <button className='button-modal-delete' type='submit'>Delete</button>
          </form>
        </div>
      </div>
    )
  }
}
