import './App.css';
import React, { Component } from 'react'

const initialState = {
  screen: 0,
  left: null,
  operation: null,
  input: ''
};
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = initialState;
  }

  numberClick(num) {
    if (this.state.screen === 0 || this.state.operation !== null) {
      this.setState({ screen: num });
    } else {
      this.setState({ screen: "" + this.state.screen + num })
    }
    if (this.state.screen !== 0) {
      this.setState({ input: this.state.input + "" + num });
    }
  }

  clearScreen() {
    this.setState({
      screen: 0,
      input: ''
    });
  }

  handleAdd() {
    if (this.state.left === null) {
      this.setState({ operation: '+' });
      this.setState({ left: this.state.screen })
    }
    this.setState({ input: this.state.input + " + " })
    console.log(this.state.left, this.state.operation);
  }
  handleDecimal() {

  }
  handleEvaluation() {
    let currentScreen = this.state.screen;
    let output = Number(this.state.left) + Number(currentScreen);
    if (this.state.operation === '+') {
      this.setState({ screen: output });
      this.setState({ operation: '=' });
    }
    this.setState({ input: this.state.input + " = " + output })
  }
  render() {
    return (
      <div className="App">
        <div id="display">
          <p id="input">{this.state.input}</p>
          <p >{this.state.screen}</p>
        </div>
        <div className="buttons">
          <div className="top-row">
            <button id="clear" onClick={() => { this.clearScreen() }}>AC</button>
            <button id="divide">÷</button>
          </div>
          <div className="second-row">
            <button id="seven" onClick={() => { this.numberClick(7) }}>7</button>
            <button id="eight" onClick={() => { this.numberClick(8) }}>8</button>
            <button id="nine" onClick={() => { this.numberClick(9) }}>9</button>
            <button id="multiply">x</button>
          </div>
          <div className="third-row">
            <button id="four" onClick={() => { this.numberClick(4) }}>4</button>
            <button id="five" onClick={() => { this.numberClick(5) }}>5</button>
            <button id="six" onClick={() => { this.numberClick(6) }}>6</button>
            <button id="subtract">-</button>
          </div>
          <div className="fourth-row">
            <button id="one" onClick={() => { this.numberClick(1) }}>1</button>
            <button id="two" onClick={() => { this.numberClick(2) }}>2</button>
            <button id="three" onClick={() => { this.numberClick(3) }}>3</button>
            <button id="add" onClick={() => { this.handleAdd() }}>+</button>
          </div>
          <div className="bottom-row">
            <button id="zero" onClick={() => { this.numberClick(0) }}>0</button>
            <button id="decimal" onClick={() => { this.handleDecimal() }}>.</button>
            <button id="equals" onClick={() => this.handleEvaluation()}>=</button>
          </div>

        </div>
      </div>
    )
  }
}
