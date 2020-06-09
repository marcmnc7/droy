import React, { Component } from 'react'

export default class LinkEditable extends Component {
  
  /* Manage how links are opened */
  goToLink = () => {
    const { info, mode } = this.props
    if(mode !== "view") return
    if(info.toNewPage) window.open(info.href)
    else window.location = info.href
  }

  render () {
    let { info, style, onDoubleClick, contentAttrStyle } = this.props
    const dataId = this.props['data-id']
    style = Object.assign({}, style, contentAttrStyle)
    return <button type="button" onClick={this.goToLink} data-id={dataId} onDoubleClick={onDoubleClick} style={style}>{info.text}</button>
  }
}
