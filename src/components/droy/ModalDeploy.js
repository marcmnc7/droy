import React, { Component } from 'react'
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, PinterestIcon, PinterestShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'
import PropTypes from 'prop-types'

export default class ModalDeploy extends Component {
  render () {
    const { projectId, onClose } = this.props
    const projectUrl = `http://${projectId}.my-droy.com`
    return (
      <div className='modal-container centered-modal'>
        <div className='modal-style-deploy'>
          <button className='close-modal close-deploy' onClick={onClose}>
            <img className='close-modal-image' src="/img/close-icon.png" alt='delete-project'></img>
          </button>
          <img className="modal-img" src="/img/done.gif" alt="done"/>
          <p className='text-modal-close'>Your project was published! You can find it <a rel="noopener noreferrer" target="_blank" href={projectUrl}>here!</a></p>
          <p className='text-modal-close'>Share it with your folks:</p>
          <div className="modal-share">
            <FacebookShareButton hashtag='droy' quote='Look at my new webpage!' url={projectUrl}><FacebookIcon size={35}/></FacebookShareButton>
            <LinkedinShareButton source='droy' title={'Look at my new webpage!'} url={projectUrl}><LinkedinIcon size={35}/></LinkedinShareButton>
            <PinterestShareButton description={'Look at this awesome platform!'} media='https://firebasestorage.googleapis.com/v0/b/droy-dev.appspot.com/o/public%2Fdroy_logo.png?alt=media&token=c6f641e9-d3b3-46e7-9b1a-24377b8b35df' url={projectUrl}><PinterestIcon size={35}/></PinterestShareButton>
            <TwitterShareButton hashtag='droy' title={'Look at my new webpage!'} url={projectUrl}><TwitterIcon size={35}/></TwitterShareButton>
            <WhatsappShareButton title={'Look at my new webpage!'} url={projectUrl}><WhatsappIcon size={35}/></WhatsappShareButton>
          </div>
        </div>
      </div>
    )
  }
}

ModalDeploy.propTypes = {
  onClose: PropTypes.func,
  projectId: PropTypes.object
}
