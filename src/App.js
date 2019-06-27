import './App.css';
import React, { Component } from 'react'

const initialState = {
  value: null,
  displayValue: '',
  operator: null,
  waitingForOperand: false
};
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = initialState;
  }

  clear() {
    this.setState({
      displayValue: ''
    });
  }
  sign() {
    this.state.displayValue.charAt(0) === '-' ? this.setState({ displayValue: this.state.displayValue.slice(1) }) : this.setState({ displayValue: `-${this.state.displayValue}` });
  }
  percent() {
    this.setState({ displayValue: `${parseFloat(this.state.displayValue) / 100}` })
  }
  append(number) {
    const { displayValue, waitingForOperand } = this.state
    if (waitingForOperand) {
      this.setState({
        displayValue: number,
        waitingForOperand: false
      })
    } else {
      this.setState({
        displayValue: displayValue === '0' ? number : displayValue + number
      })
    }
  }
  dot() {
    const { waitingForOperand } = this.state
    if (waitingForOperand) {

    }
    if (this.state.displayValue === '') {
      this.append('0.');
    }
    else if (this.state.displayValue.indexOf('.') === -1) {
      this.append('.');
      this.setState({ waitingForOperand: false })
    }
  }
  setPrevious() {
    this.setState({
      previous: this.state.displayValue,
      operatorClicked: true
    });
  }

  performOperation(nextOperator) {
    const { displayValue, operator, value } = this.state
    const nextValue = parseFloat(displayValue);

    const operations = {
      '/': (prevValue, nextValue) => prevValue / nextValue,
      '*': (prevValue, nextValue) => prevValue * nextValue,
      '-': (prevValue, nextValue) => prevValue - nextValue,
      '+': (prevValue, nextValue) => prevValue + nextValue,
      '=': (prevValue, nextValue) => nextValue
    }

    if (value == null) {
      this.setState({
        value: nextValue
      })
    } else if (operator) {
      const currentValue = value || 0
      const computedValue = operations[operator](currentValue, nextValue);

      this.setState({
        value: computedValue,
        displayValue: String(computedValue)
      })
    }
    this.setState({
      waitingForOperand: true,
      operator: nextOperator
    })
  }
  render() {
    return (
      <section>
        <div className="calculator">
          <div id="display">{this.state.displayValue === '' ? 0 : this.state.displayValue}</div>
          <div className="btn top-row" id="clear" onClick={() => { this.clear() }}>C</div>
          <div className="btn top-row" onClick={() => { this.sign() }}>+/-</div>
          <div className="btn top-row" onClick={() => { this.percent() }}>%</div>
          <div className="btn operator" id="divide" onClick={() => { this.performOperation('/') }}>÷</div>
          <div className="btn" id="seven" onClick={() => { this.append('7') }}>7</div>
          <div className="btn" id="eight" onClick={() => { this.append('8') }}>8</div>
          <div className="btn" id="nine" onClick={() => { this.append('9') }}>9</div>
          <div className="btn operator" id="multiply" onClick={() => { this.performOperation('*') }}>x</div>
          <div className="btn" id="four" onClick={() => { this.append('4') }}>4</div>
          <div className="btn" id="five" onClick={() => { this.append('5') }}>5</div>
          <div className="btn" id="six" onClick={() => { this.append('6') }}>6</div>
          <div className="btn operator" id="subtract" onClick={() => { this.performOperation('-') }}>-</div>
          <div className="btn" id="one" onClick={() => { this.append('1') }}>1</div>
          <div className="btn" id="two" onClick={() => { this.append('2') }}>2</div>
          <div className="btn" id="three" onClick={() => { this.append('3') }}>3</div>
          <div className="btn operator" id="add" onClick={() => { this.performOperation('+') }}>+</div>
          <div className="zero btn" id="zero" onClick={() => { this.append('0') }}>0</div>
          <div className="btn" id="decimal" onClick={() => { this.dot() }}>.</div>
          <div className="btn operator" id="equals" onClick={() => { this.performOperation('=') }}>=</div>
        </div>
      </section>
    )
  }
}
