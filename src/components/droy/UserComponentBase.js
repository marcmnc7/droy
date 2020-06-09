import React, { Component } from 'react'
import MATCH_COMPONENTS from '../../utils/componentsMatching'
import PropTypes from 'prop-types'
import { withData } from '../../contexts/dataContext'
import OptionsBar from '../droy/OptionsBar'
import ModalChangeInfo from '../droy/ModalChangeInfo'
import { uuid } from 'uuidv4'
import '../../styles/user-componentBase.css'
import firebase from '../../services/firebase'
import alias from '../../utils/alias'

/* Provides all the funcions to manage all component content and style */
class UserComponentBase extends Component {
  constructor (props) {
    super(props)
    this.state = {
      optionsModal: false,
      attributeSelected: '',
      attributeSelectedInfo: '',
      attributeSelectedStyle: ''
    }
  }
  
  /* Opens the editor modal setting the target to the state */
  handleOpenModal = (e) =>{
    const { userLayoutObj, code  } = this.props
    const attrCode = e.target.attributes['data-id'].value
    const attributeInfo = alias.findByCode(userLayoutObj, code)
    this.setState({
      openChangeModal: true,
      attributeSelected: attrCode,
      attributeSelectedInfo: attributeInfo.info[attrCode],
      attributeSelectedStyle: attributeInfo.info[attrCode].style
    })
  }

  /* Close the editor modal */
  handleCloseModal = () =>{
    this.setState({
      openChangeModal: false,
      attributeSelected: '',
      attributeSelectedInfo: '',
      attributeSelectedStyle: ''
    })
  }
  
  /* Uploads the recived image to Firebase Storage and updates the context */
  changeImage = async (e) => {
    const { projectId, code, saveComponentInfoToContext } = this.props
    const attr = e.target.attributes['data-id'].value
    const file = e.target.files[0]
    if(file.size > 2000000){
      alert('Imagen demasiado grande.')
    } else {
      const randomFileName = uuid()
      const storageRef = firebase.storage().ref(`/${firebase.auth().currentUser.uid}/${projectId}/${randomFileName}`)
      await storageRef.put(file)
      const downloadUrl = await storageRef.getDownloadURL()
      saveComponentInfoToContext(code, attr, { src: downloadUrl })
    }
  }

  /* Ads a new link in the target component and updates the context */
  addLink = () => {
    const { code, saveComponentInfoToContext, userLayoutObj } = this.props
    const targetComponentInfo = alias.findByCode(userLayoutObj, code).info
    const linksIds = [] 
    for (const key in targetComponentInfo) {
      if(targetComponentInfo[key].type !== 'listLink') continue
      linksIds.push(parseInt(key.match(/\d+$/)[0]))
    }
    if(linksIds.length >= 5) return
    let newAttr = ''
    if(!linksIds.length) newAttr = 'link1'
    else newAttr = `link${Math.max(...linksIds)+1}`
    const newInfo = { style: { fontSize: '1rem', letterSpacing: 'inherit', backgroundColor: '#9b9b9b' }, type: 'listLink', text: "New link", href: 'http://www.droy-prod.web.app', toNewPage:true}
    saveComponentInfoToContext(code, newAttr, newInfo)
  }

  /* Deletes the target link in the target component and updates the context */
  deleteLink = (e) => {
    const { code, saveComponentInfoToContext } = this.props
    const { attributeSelected } = this.state
    saveComponentInfoToContext(code, attributeSelected, undefined)
    this.handleCloseModal()
  }

  /* Recieves the new text info to set to the target component and updates the context */
  changeInfo = (info) => {
    const { attributeSelected } = this.state
    const { code, saveComponentInfoToContext } = this.props
    saveComponentInfoToContext(code, attributeSelected, info)
    this.handleCloseModal()
  }

  /* Recieves the color HEX to set to the target componetn and updates de context */
  changeColor = (color) => {
    const { code, saveUserComponentStyleInfoToContext } = this.props
    saveUserComponentStyleInfoToContext(code, {backgroundColor: color})
  }

  /* Recieves the value of de new height to set to the target component and updates de context */
  changeHeight = (height) => {
    const { code, saveUserComponentStyleInfoToContext } = this.props
    saveUserComponentStyleInfoToContext(code, { height })
  }

  /* Uploads the recived image to Firebase Storage and updates the context */
  changeBackgroundImage = async (e) => {
    const { projectId, code, saveUserComponentStyleInfoToContext } = this.props
    const file = e.target.files[0]
    if(file.size > 700000){
      alert('Imagen demasiado grande.')
    } else {
      const randomFileName = uuid()
      const storageRef = firebase.storage().ref(`/${firebase.auth().currentUser.uid}/${projectId}/${randomFileName}`)
      await storageRef.put(file)
      const downloadUrl = await storageRef.getDownloadURL()
      saveUserComponentStyleInfoToContext(code, { backgroundImage: `url("${downloadUrl}")` })
    }
  } 

  /* Gets the real React components and pass new funcionalities */
  render () {
    const { mode, moveComponent, componentOptions, code, deleteComponent, userLayoutObj  } = this.props
    const { attributeSelected, openChangeModal, attributeSelectedInfo, attributeSelectedStyle } = this.state
    const UserComp = MATCH_COMPONENTS[code]
    const { info: componentInfo, componentUserOverrideStyle: userStyle } = alias.findByCode(userLayoutObj, code)
    const componentProps = {}
    componentProps['info'] = componentInfo
    componentProps['userStyle'] = userStyle
    if(mode === 'edit'){
      componentProps['openChangeModal'] = this.handleOpenModal
      componentProps['changeImage'] = this.changeImage
    }

    const optionsProps = {}
    optionsProps['code'] = code
    optionsProps['deleteComponent'] = deleteComponent
    optionsProps['moveComponent'] = moveComponent
    optionsProps['componentStyle'] = userStyle
    if(componentOptions.includes('changeHeight')) optionsProps['changeHeight'] = this.changeHeight
    if(componentOptions.includes('addLinks')) optionsProps['addLink'] = this.addLink
    if(componentOptions.includes('backgroundColor')) optionsProps['changeColor'] = this.changeColor
    if(componentOptions.includes('backgroundImage')) optionsProps['changeBackgroundImage'] = this.changeBackgroundImage 

    const modalProps = {}
    modalProps['attributeSelected'] = attributeSelected
    modalProps['onClose'] = this.handleCloseModal
    modalProps['style'] = attributeSelectedStyle
    modalProps['deleteLink'] = this.deleteLink
    modalProps['changeInfo'] = this.changeInfo
    modalProps['info'] = attributeSelectedInfo
    modalProps['code'] = code
    return (
      <UserComp {...componentProps} mode={mode}>
        {mode === "edit" && <OptionsBar {...optionsProps}/>}
        {openChangeModal && <ModalChangeInfo {...modalProps}/>}
      </UserComp>
    )
  }
}

UserComponentBase.propTypes = {
  code: PropTypes.string
}

export default withData(UserComponentBase)
