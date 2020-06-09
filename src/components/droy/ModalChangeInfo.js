import React, { Component } from 'react'
import { notifyError } from '../../services/notifications'

export default class ModalChangeInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: this.props.info,
      style: this.props.style,
    }
  }

  /* Catch link information and set it on the state */
  handleChangeNormal = (e) => {
    const infoCopy = { ...this.state.info }
    infoCopy[e.target.name] = e.target.name === "toNewPage" ? e.target.checked : e.target.value
    this.setState({
      info: infoCopy
    });
  }

  /* Catch style information and set it on the state */
  handleChangeStyle = (e) => {
    const infoCopy = { ...this.state.style }
    infoCopy[e.target.name] = e.target.value
    this.setState({
      style: infoCopy
    });
  }

  /* Form validations */
  isValid = (info) => {
    const pxRemRegex = /^(\d{0,3}\.?\d{0,3})(px|rem)$/
    const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
    const backgroundRegex = /^#[a-z0-9]{6}$/
    if (!pxRemRegex.test(info.style.fontSize) && info.style.fontSize !== 'inherit') {
      notifyError("Invalid text size: must be px/rem/inherit")
      return false
    }
    if (!pxRemRegex.test(info.style.letterSpacing) && info.style.letterSpacing !== 'inherit') {
      notifyError("Invalid letter spacing: must be px/rem/inherit")
      return false
    }
    if ((info.type === 'link' || info.type === 'listLink') && !linkRegex.test(info.href)) {
      notifyError("Invalid link")
      return false
    }
    if ((info.type === 'link' || info.type === 'listLink') && !backgroundRegex.test(info.style.backgroundColor) && info.style.backgroundColor !== 'transparent') {
      notifyError("Invalid HEX code: must be transparent or #??????")
      return false
    }
    return true
  }

  /* Change the current info for new user info */
  submitChanges = (e) => {
    e.preventDefault()
    const { changeInfo } = this.props
    const { info, style } = this.state
    const finalInfo = { ...info, style }
    if (this.isValid(finalInfo)) changeInfo(finalInfo)
  }

  render() {
    const { onClose, deleteLink } = this.props
    const { info, style } = this.state
    return (
      <div className='modal-container'>
        <div className='modal-style'>
          <button className='close-modal' onClick={onClose}>
            <img className='close-modal-image' src="/img/close-icon.png" alt='delete-project'></img>
          </button>
          <form className='form-create-project' onSubmit={this.submitChanges}>
            <div className="modal-field-group">
              <label className="label-modal" htmlFor="display-text">Display text:</label>
              <input required="required" className='input-modal' type="text"
                name="text"
                value={info.text}
                onChange={this.handleChangeNormal} />
            </div>
            {(info.type === 'link' || info.type === 'listLink') &&
              <div>
                <div className="modal-field-group">
                  <label className="label-modal" htmlFor="link-to">Link destination:</label>
                  <input id="link-to" required="required" className='input-modal' type="text"
                    name="href"
                    value={info.href}
                    onChange={this.handleChangeNormal} />
                  <div className='openWindow-container'>
                    <label className="label-modal" htmlFor="link-to">Open in new window?</label>
                    <div className='switch'>
                      <input className="switch-input" onChange={this.handleChangeNormal} checked={info.toNewPage ? 'checked' : false} type="checkbox" name="toNewPage" id="toNewPage" />
                      <label htmlFor="toNewPage" className="switch-label">Switch</label>
                    </div>
                  </div>
                </div>
                <div className="subgroup-field">
                  <label className="label-modal" htmlFor="backgroundColor">Background color:</label>
                  <input id="backgroundColor" required="required" className='input-modal' type="text"
                    name="backgroundColor"
                    data-type="style"
                    value={style.backgroundColor}
                    onChange={this.handleChangeStyle} />
                </div>
              </div>
            }
              <div className="subgroup-field">
                <label className="label-modal" htmlFor="fontSize">Text size:</label>
                <input id="fontSize" required="required" className='input-modal' type="text"
                  name="fontSize"
                  data-type="style"
                  value={style.fontSize}
                  onChange={this.handleChangeStyle} />
              </div>
              <div className="subgroup-field">
                <label className="label-modal" htmlFor="letterSpacing">Letter spacing:</label>
                <input id="letterSpacing" required="required" className='input-modal' type="text"
                  name="letterSpacing"
                  data-type="style"
                  value={style.letterSpacing}
                  onChange={this.handleChangeStyle} />
              </div>
            <button className='button-modal' type='submit'>Update info</button>
          </form>
          {info.type === 'listLink' && <p onClick={deleteLink} className='button-modal-red' type='submit'>Delete link</p>}
        </div>
      </div>
    )
  }
}
