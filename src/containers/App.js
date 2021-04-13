import React from 'react'
import './App.css';
import Logo from '../components/Logo/Logo'
import Navigation from '../components/Navigation/Navigation'
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm'
import Rank from '../components/Rank/Rank'
import Particles from 'react-particles-js'
import Clarifai, { FACE_DETECT_MODEL } from 'clarifai'
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import axios from 'axios'

const app = new Clarifai.App({
  apiKey: '3961fd228de54fd2bea90d12d370d775'
})


const particleOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }
  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
      }
    })
  }

  componentDidMount() {
    axios.get('http://protected-hamlet-43340.herokuapp.com/')
      .then(response => response).catch(error => console.log(error))
      .then(console.log)
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
    console.log(event.target.value)

  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)
    // console.log(width, height)
    // console.log(clarifaiFace)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    console.log('click')
    app.models
      .predict(FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        if (response) { 
          axios.put('http://protected-hamlet-43340.herokuapp.com/image', {
            id: this.state.user.id
          }).then(response => {
            this.setState(Object.assign(this.state.user, {entries: response.data}))
          })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
        }
      )
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    }else if (route === 'home') {
      this.setState({ isSignedIn: true })
    } else {
      this.setState({ isSignedIn: false })
    }
    this.setState({ route: route })
  }

  conditionalRoute() {
    const { imageUrl, route, box} = this.state
    if (route === 'home') {
      return (
        <div>
          <Logo />
          <Rank name={this.state.user.name} entries={ this.state.user.entries}/>
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </div>
      )
    } else if (route === 'register') {
      return <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
    } else { 
      return <SignIn loadUser={ this.loadUser} onRouteChange={this.onRouteChange} />
    }
  }

  render() {
    const { isSignedIn } = this.state
    return (
      <div>
        <Particles className='particles' params={particleOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {
          this.conditionalRoute()
        }
      </div>
    );
  }
}


export default App;
