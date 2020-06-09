import React, { Component } from 'react'
import LinkEditable from './LinkEditable'

export default class LinksListEditable extends Component {

  /* It shows all the links that the user has */
  showLinks = () => {
    const { mode, info, openChangeModal, linksStyle} = this.props
    const allLinks = []
    let i = 1
    for (const key in info) {
      if(info[key].type !== 'listLink') continue
      allLinks.push(<LinkEditable contentAttrStyle={info[key].style} key={i} mode={mode} info={info[key]} style={linksStyle} data-id={key} onDoubleClick={openChangeModal}/>)
      i += 1      
    }
    return allLinks
  }

  render() {
    const { containerStyle } = this.props
    return (
      <div style={containerStyle}>
        { this.showLinks() }
      </div>
    );
  }

}
