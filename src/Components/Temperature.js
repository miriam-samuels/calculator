import React, { Component } from 'react'

const scaleNames = {
    c : 'Celsius',
    f : 'fahrenheit',
};

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water is boilled</p>
}
    return <p>The water is not boilled</p>
}
function Celsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}
function Fahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}


export class TemperatureInput extends Component {
  handleChange = (e) =>{
    // this.setState({
    //   temperature : e.target.vaule,
    // })
    this.props.temperatureChange(e.target.value)
  }

  render() {
    // const temperature = this.state.temperature
    const temperature = this.props.temperature
    const scale =  this.props.scale;
    return (
      <div>
        <fieldset>
          <legend> Enter Temperature in {scaleNames[scale]} </legend>
          <input value = {temperature} onChange = {this.handleChange}/>
        </fieldset>
      </div>
    )
  }
}

class Calculator extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      temperature : 0,
      scale : 'c'
   };
  }
  celsiusChange = (temperature) =>{
    this.setState({
      temperature,
      scale : 'c'
    })

  }
  fahrenheitChange = (temperature) =>{
    this.setState({
      temperature  ,
      scale : 'c'
    })

  }
  
  render() {
    const temperature = this.state.temperature;
    const scale = this.state.scale;
    const celsius = scale === 'f' ? tryConvert(temperature, Celsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, Fahrenheit) : temperature;
    return (
      <div>
          <TemperatureInput scale = 'c' temperature = {celsius} temperatureChange = {this.celsiusChange}/>
          <TemperatureInput scale = 'f' temperature = {fahrenheit} temperatureChange = {this.fahrenheitChange}/>
          <BoilingVerdict celsius = {parseFloat(celsius)} />
      </div>
    )
  }
}

export default Calculator
