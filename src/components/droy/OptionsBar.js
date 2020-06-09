import React, { Component } from 'react'
import '../../styles/optionsBar.css'
import { SketchPicker } from 'react-color'

class OptionsBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showOptions: false,
      color: '',
      showColorPicker: false,
      height: this.props.componentStyle.height.replace('px', '')
    }
  }

  /* Catch input hex information and set it on the state */
  handleAcceptChangeColor = () => {
    this.props.changeColor(this.state.color.hex)
  }

  /* Move component to another position */
  handleMoveComponent = (e) => {
    const { moveComponent, code } = this.props
    const { value: action } = e.target.attributes['data-action']
    moveComponent(code, action)
  }

  /* Delete component from UserComponentBase */
  handleDelete = () => {
    const { code, deleteComponent } = this.props
    deleteComponent(code)
  }

  /* Catch input information and set it on the state */
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  /* Catch input height information and set it on the state */
  handleChangeHeight = (e) => {
    const { changeHeight } = this.props
    this.setState({
      height: e.target.value
    }, () => {
      changeHeight(`${this.state.height}px`)
    })
  }

  /* Sum height */
  handleSumHeight = (e) => {
    const { changeHeight } = this.props
    const resultSum = parseInt(this.state.height) + 5
    this.setState({
      height: resultSum
    }, () => {
      changeHeight(`${resultSum}px`)
    })
  }

  /* Substract height */
  handleSubHeight = (e) => {
    const { changeHeight } = this.props
    const resultSum = parseInt(this.state.height) - 5
    this.setState({
      height: resultSum
    }, () => {
      changeHeight(`${resultSum}px`)
    })
  }

  showOptions = () => {
    this.setState({
      showOptions: !this.state.showOptions,
      showColorPicker: false
    })
  }

  /* Show to user the color picker */
  toggleColorPicker = () => {
    this.setState({
      showColorPicker: !this.state.showColorPicker
    })
  }

  /* Set color to the state */
  handleChangeColor = (color) => {
    this.setState({
      color: color
    })
  }

  uploadHandler = () => {
    this.refs.imageUploader.click();
  }

  render() {
    const { showOptions, color, showColorPicker, height } = this.state
    const { changeColor, addLink, changeBackgroundImage, changeHeight } = this.props
    return (
      <div className='container-options-bar'>
        <button className='buttons-optionBar' >
          <img className='image-optionBar' onClick={this.showOptions} src="../../img/edit-icon.png" alt='edit'></img>
        </button>
        <div>
          {showOptions &&
            <div className="options-bar">
              <img className='image-optionBar options' data-action='down' src="/img/down-icon.png" alt='down' onClick={this.handleMoveComponent} />
              <img className='image-optionBar options' data-action='up' src="/img/up-icon.png" alt='up' onClick={this.handleMoveComponent} />
              {addLink && <img alt="newLink" onClick={addLink} className='image-optionBar options' src="/img/link-icon.png" />}
              {changeColor && <img onClick={this.toggleColorPicker} alt="newLink" className='image-optionBar options' src="/img/color-icon.png" />}
              {changeBackgroundImage && <img onClick={this.uploadHandler} alt="newLink" className='image-optionBar options' src="/img/upload-icon.png" />}
              <input name='image' id='image' style={{ display: 'none' }} onChange={changeBackgroundImage} ref="imageUploader" type="file" />
              {changeHeight &&
                <div className='container-height'>
                  <img className='image-optionBar options' src="/img/subHeight-icon.png" alt='up' onClick={this.handleSubHeight}/>
                  <input className='height-optionsBar options' type='number' min='40' step='5' value={height} onChange={this.handleChangeHeight} name='height' max='400' />
                  <img className='image-optionBar options' src="/img/sumHeight-icon.png" alt='sum' onClick={this.handleSumHeight}/>
                </div>}
                <img className='image-optionBar options' onClick={this.handleDelete} src="/img/deleteBar-icon.png" alt='delete'></img>
            </div>
          }
        </div>
        {showColorPicker && <div className='colorPicker'>
          <SketchPicker disableAlpha={true} onCancel={this.toggleColorPicker} onChange={this.handleChangeColor} color={color} onChangeComplete={this.handleAcceptChangeColor} />
        </div>}
      </div>
    )
  }
}

export default OptionsBar
