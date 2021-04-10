import React from 'react'
import './App.css';
import Logo from '../components/Logo'
import Navigation from '../components/Navigation'
import ImageLinkForm from '../components/ImageLinkForm'
import Rank from '../components/Rank'
import Particles from 'react-particles-js'
import Clarifai, { FACE_DETECT_MODEL } from 'clarifai'
import FaceRecognition from '../components/FaceRecognition';

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
class App extends React.Component {
  constructor(props){ 
    super(props)
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
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
    this.setState({box:box})
    console.log(this.state.box)
  }

  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input})
    console.log('click')
    app.models.predict(FACE_DETECT_MODEL, this.state.input)
      .then((response) => this.displayFaceBox(this.calculateFaceLocation(response))
        //console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
      .catch(err =>  console.log(err))
    );
  }

  //"a403429f2ddf4b49b307e318f00e528b"

  render(){
    return (
      <div>
        <Particles className='particles' params={ particleOptions }/>
        <Navigation />
        <Logo />
        <Rank/>
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition box={this.state.box} imageUrl={ this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
