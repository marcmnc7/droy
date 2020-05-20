import React, { Component } from 'react'
import PropTypes from 'prop-types'

const homeContainer = {
  backgroundImage: 'url("/img/classic-home1.jpg")',
  height: '600px',
  backgroundSize: 'cover',
  padding: '8px 40px 8px 40px',
  position: 'relative'
}

const textHomeContainer = {
  textAlign: 'left'
}

const titleHome1 = {
  fontSize: '3rem',
  fontWeight: '400',
  overflow: 'hidden'
}

const textHome1 = {
  fontSize: '1rem',
  fontWeight: '200',
  marginTop: '-25px',
  height: '300px',
  width: '100%',
  overflow: 'hidden'
}

class ClassicHome1 extends Component {
  render () {
    const { userStyle, info, children: optionsBar, openChangeModal } = this.props
    const copyStyle = Object.assign({}, homeContainer, userStyle)
    return (
      <div style={copyStyle}>
        {optionsBar}
        <div style={textHomeContainer}>
          <h1 style={titleHome1} data-id="text1" onDoubleClick={openChangeModal}>{info.text1.text}</h1>
          <p style={textHome1} data-id="text2" onDoubleClick={openChangeModal}>{info.text2.text}</p>
        </div>
      </div>
    )
  }
}

ClassicHome1.propTypes = {
  info: PropTypes.object,
  changeInfo: PropTypes.func,
  optionsBar: PropTypes.object,
  // children: PropTypes.object,
  code: PropTypes.string
}

export default ClassicHome1
