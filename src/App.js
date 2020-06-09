import React, { Component } from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/droy/PrivateRoute'
import OnlyNotLoggedRoute from './components/droy/OnlyNotLoggedRoute'
import Homepage from './pages/Homepage'
import Builder from './pages/Builder'
import NotFound from './pages/NotFound'
import DataProvider from './contexts/dataContext'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import AboutUs from './pages/AboutUs'
import { Route, Switch } from 'react-router-dom'
import firebase from './services/firebase'
import Loading from './components/droy/Loading'
import { ToastContainer } from 'react-toastify';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      authLoading: true
    }
  }

  componentDidMount = async () => {
    try {
      /* Easter egg */
      console.log('Hello! 👋 We are delighted that you are inspecting 🔎 our project. If you have any questions ❓, suggestions 🤔 or compliments 💖, do not hesitate to contact us 📧: Marta Mullor (marta.mullor.polo@gmail.com) and Marc Serra (mserrahidalgo@gmail.com) 😊🚀')
      firebase.auth().onAuthStateChanged((user) => {
        this.setState({ authLoading: false })
      });

    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { authLoading } = this.state
    return (
      <div>
        {!authLoading
          ? <DataProvider>
            <div className="App">
              <ToastContainer position="top-center" autoClose={3000} draggable />
              <Switch>
                <PrivateRoute exact path='/' component={Homepage} />
                <OnlyNotLoggedRoute exact path='/login' component={Login} />
                <OnlyNotLoggedRoute exact path='/signup' component={SignUp} />
                <PrivateRoute exact path='/builder/:projectId' component={Builder} />
                <Route path='/about' component={AboutUs} />
                <Route path='*' component={NotFound} />
              </Switch>
            </div>
          </DataProvider>
          : <div className='loading-container'><Loading /></div>
      }
      </div>
    )
  }
}

export default App
