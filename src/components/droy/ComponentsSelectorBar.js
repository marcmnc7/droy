import React, { Component } from 'react'
import { withData } from '../../contexts/dataContext'
import '../../styles/components-selectorBar.css'
import api from '../../services/apiClient'
import alias from '../../utils/alias'
import Loading from '../droy/Loading'

const STATUS = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERROR: 'ERROR',
}

class ComponentsSelectorBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      styleComponents: [],
      status: STATUS.LOADING
    }
  }

  /* Get project components to BBDD based on the projectStyle */
  componentDidMount = async () => {
    try {
      const { projectStyle } = this.props
      const { data: styleComponents } = await api.get(`/components?style=${projectStyle}`)
      this.setState({ styleComponents, status: STATUS.LOADED })
    } catch (error) {
      this.setState({ status: STATUS.ERROR })
    }
  }

  /* Show all active components with its specific info */
  showComponents = () => {
    const usedCompIds = this.props.userLayoutObj.map(c => c.code)
    const { styleComponents } = this.state
    return styleComponents.map(c => {
      const thumbnail = c.thumbnail
      if (!usedCompIds.includes(c.code)) {
        return (
          <div className='component-selector' key={c.code} style={{ margin: '20px', backgroundImage: `url("${thumbnail.name}")`, backgroundRepeat: 'no-repeat', backgroundSize: '100%', height: thumbnail.height }}>
            <button className='buttons-selectorBar'>
              <img data-code={c.code} onClick={this.handleAddComponent} className='image-selectorBar' src="/img/sum-icon.png" alt='down'/>
            </button>
          </div>)
      }
      return (<div key={c.code} style={{ margin: '20px', opacity: '0.3', backgroundImage: `url("${thumbnail.name}")`, backgroundRepeat: 'no-repeat', backgroundSize: '100%', height: thumbnail.height }}>
      </div>)
    })
  }

  /* Add component to user ComponentBase */
  handleAddComponent = (e) => {
    const { addComponent } = this.props
    const { styleComponents } = this.state
    const code = e.target.attributes['data-code'].value  
    const { defaultConfig, componentOptions, componentStyle } = alias.findByCode(styleComponents, code)
    const compConfig = alias.copyObject(defaultConfig)
    const compStyle = alias.copyObject(componentStyle)
    addComponent(code, compConfig, componentOptions, compStyle)
  }

  showContent = () => {
    const { status } = this.state
    switch (status) {
      case STATUS.LOADING:
        return <div className='loading-container'><Loading /></div>
      case STATUS.LOADED:
        return this.showComponents()
      case STATUS.ERROR:
        return <div className='error-text padding-error'>Error</div>
      default:
        break;
    }
  }

  render() {
    return (
      <div className='components-bar'>
        <h2 className='title-component-bar'>Components:</h2>
        {this.showContent()}
      </div>
    )
  }
}

export default withData(ComponentsSelectorBar)
