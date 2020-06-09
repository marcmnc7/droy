import React, { Component } from 'react'
import { withData } from '../../contexts/dataContext'
import PropTypes from 'prop-types'
import '../../styles/navBar.css'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../../services/firebase'
import api from '../../services/apiClient'
import ModalDeploy from '../droy/ModalDeploy'


class NavBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalDeploy: false,
      showDropdown: false,
      menuClicked: false
    }
  }

  /* Show and hide dropdown menu options */
  showDropdown = () => {
    const {showDropdown, menuClicked } = this.state
    this.setState({
      showDropdown: !showDropdown,
      menuClicked: !menuClicked
    })
  }

  /* Close modal deploy */
  handleCloseModal = () => {
    this.setState({ modalDeploy: false })
  }

  /* Show modal deploy and send the request to the backend */
  deployApp = async () => {
    const { projectId } = this.props
    await api.get(`/projects/${projectId}/deploy`)
    this.setState({
      modalDeploy: true
    })
  }

  /* Save the project */
  handleSave = () => {
    const { projectId, save } = this.props
    save(projectId)
  }

  /* Logout of the tool */
  handleLogout = async () => {
    const { history } = this.props
    await firebase.auth().signOut()
    history.push('/login')
  }

  /* Control publish button functionality */
  showPublishButton = () => {
    const { userLayoutObj } = this.props
    if (userLayoutObj && !userLayoutObj.length) {
      return <button className='buttons-navBar-blocked'>Publish</button>
    }
    return <button className='buttons-navBar' onClick={this.deployApp}>Publish</button>
  }

  /* Control edit/view button functionality */
  showEditViewButton = () => {
    const { mode, switchMode, userLayoutObj } = this.props
    if (mode === 'view') {
      return <button className='buttons-navBar' onClick={switchMode}>Edit</button>
    }
    if (userLayoutObj && !userLayoutObj.length) {
      return <button className='buttons-navBar-blocked'>Preview</button>
    }
    return <button className='buttons-navBar' onClick={switchMode}>Preview</button>
  }

  /* Control login/signup button functionality */
  showButtonLoginSignup = () => {
    const { currentUser } = firebase.auth()
    const { path } = this.props.match
    if(!currentUser){
      if(path === '/signup' || path === '/about'){
        return (
          <div className='container-navbar'>
            <p className='text-navbar'>Do you have an account?</p>
            <Link className='buttons-navBar' to="/login">Log in</Link>
          </div>
        )
      } else if(path === '/login') {
        return (
          <div className='container-navbar'>
            <p className='text-navbar'>You don't have an account?</p>
            <Link className='buttons-navBar' to="/signup">Sign up</Link>
          </div>
        )
      }
    }
  }

  render() {
    const { withOptions, projectId } = this.props
    const { modalDeploy, showDropdown, menuClicked } = this.state
    const { currentUser } = firebase.auth()
    let styleMenuClicked = menuClicked ? "user-navClicked" : "user-nav";
    return (
      <div className='nav-bar'>
        {modalDeploy && <ModalDeploy projectId={projectId} onClose={this.handleCloseModal} />}
        <Link to='/' >
          <img className='logo-navBar' src='/img/logo-green.png' alt='logo-green'/>
        </Link>
        {withOptions && <div>
          <button className='buttons-navBar' onClick={this.handleSave}>Save</button>
          {this.showEditViewButton()}
          {this.showPublishButton()}
        </div>
        }
        {this.showButtonLoginSignup()}
        {currentUser &&
          <div className={styleMenuClicked} onClick={this.showDropdown}>
            <img className='profile-image' src={currentUser.photoURL} alt="user" />
            <p className='user-text-nav'>{currentUser.displayName}</p>
            {showDropdown &&
              <div className='dropdown-container'>
                <Link to='/' className='dropdown-element border'>
                  <img className='icon-navBar' src='/img/projects-dropdown-icon.png' alt='logo-green'/>
                  <p className="text-projects">Projects</p>
                </Link>
                <button onClick={this.handleLogout} className='dropdown-element'>
                  <img className='icon-navBar' src='/img/logout-icon.png' alt='logo-green'/>
                  <p>Logout</p>
                </button>
              </div>}
          </div>
        }
      </div>
    )
  }
}

NavBar.propTypes = {
  withOptions: PropTypes.bool,
  mode: PropTypes.string,
  switchMode: PropTypes.func,
  save: PropTypes.func,
}

export default withRouter(withData(NavBar))
