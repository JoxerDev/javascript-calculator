import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { evaluate } from "mathjs";

// -- Variables -- //
const endsOperator = /[*+/-]$/;
const endsWithNegative = /[-]$/;
// -- Components -- //
class Formula extends React.Component {
  render() {
    return (
      <div className="row" id="formula">
        {this.props.formula}
      </div>
    );
  }
}

class Display extends React.Component {
  render() {
    return (
      <div className="row" id="display">
        {this.props.input}
      </div>
    );
  }
}

class Buttons extends React.Component {
  render() {
    return (
      <div id="buttons">
        <div className="row">
          <div className="col-3">
            <button
              type="button"
              className="btn btn-danger btn-block"
              id="clear"
              value="AC"
              onClick={this.props.clear}
            >
              AC
            </button>
          </div>
          <div className="col-3">
            <button
              type="button"
              className="btn btn-secondary btn-block"
              id="divide"
              value="/"
              onClick={this.props.operator}
            >
              /
            </button>
          </div>
          <div className="col-3">
            <button
              type="button"
              className="btn btn-secondary btn-block"
              id="multiply"
              value="*"
              onClick={this.props.operator}
            >
              x
            </button>
          </div>
          <div className="col-3">
            <button
              type="button"
              className="btn btn-secondary btn-block"
              id="subtract"
              value="-"
              onClick={this.props.operator}
            >
              -
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-9">
            <div className="row">
              <div className="col-4">
                <button
                  type="button"
                  className="btn btn-secondary btn-block"
                  id="seven"
                  value="7"
                  onClick={this.props.number}
                >
                  7
                </button>
              </div>
              <div className="col-4">
                <button
                  type="button"
                  className="btn btn-secondary btn-block"
                  id="eight"
                  value="8"
                  onClick={this.props.number}
                >
                  8
                </button>
              </div>
              <div className="col-4">
                <button
                  type="button"
                  className="btn btn-secondary btn-block"
                  id="nine"
                  value="9"
                  onClick={this.props.number}
                >
                  9
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <button
                  type="button"
                  className="btn btn-secondary btn-block"
                  id="four"
                  value="4"
                  onClick={this.props.number}
                >
                  4
                </button>
              </div>
              <div className="col-4">
                <button
                  type="button"
                  className="btn btn-secondary btn-block"
                  id="five"
                  value="5"
                  onClick={this.props.number}
                >
                  5
                </button>
              </div>
              <div className="col-4">
                <button
                  type="button"
                  className="btn btn-secondary btn-block"
                  id="six"
                  value="6"
                  onClick={this.props.number}
                >
                  6
                </button>
              </div>
            </div>
          </div>
          <div className="col-3">
            <button
              type="button"
              className="btn btn-secondary btn-block"
              id="add"
              value="+"
              onClick={this.props.operator}
            >
              +
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-9">
            <div className="row">
              <div className="col-4">
                <button
                  type="button"
                  className="btn btn-secondary btn-block"
                  id="one"
                  value="1"
                  onClick={this.props.number}
                >
                  1
                </button>
              </div>
              <div className="col-4">
                <button
                  type="button"
                  className="btn btn-secondary btn-block"
                  id="two"
                  value="2"
                  onClick={this.props.number}
                >
                  2
                </button>
              </div>
              <div className="col-4">
                <button
                  type="button"
                  className="btn btn-secondary btn-block"
                  id="three"
                  value="3"
                  onClick={this.props.number}
                >
                  3
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-8">
                <button
                  type="button"
                  className="btn btn-secondary btn-block"
                  id="zero"
                  value="0"
                  onClick={this.props.zero}
                >
                  0
                </button>
              </div>
              <div className="col-4">
                <button
                  type="button"
                  className="btn btn-secondary btn-block"
                  id="decimal"
                  value="."
                  onClick={this.props.decimal}
                >
                  .
                </button>
              </div>
            </div>
          </div>
          <div className="col-3">
            <button
              type="button"
              className="btn btn-info btn-block"
              id="equals"
              value="="
              onClick={this.props.eval}
            >
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "0",
      formula: "",
      evaluated: false
    };

    this.clear = this.clear.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleEqual = this.handleEqual.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleZero = this.handleZero.bind(this);
  }

  clear() {
    this.setState({
      input: "0",
      formula: ""
    });
  }

  handleNumbers(e) {
    const value = e.target.value;
    if (this.state.input === "0") {
      this.setState({
        input: value
      });
    } else {
      this.setState({
        input: this.state.input + value
      });
    }
  }

  handleZero(e) {
    const input = this.state.input;
    const value = e.target.value;

    if (this.state.input !== "" && this.state.input > 0) {
      this.setState({ input: input + value });
    }
  }

  handleOperator(e) {
    const formula = this.state.formula;
    const input = this.state.input;
    const value = e.target.value;
    if (!this.state.evaluated) {
      if (
        endsOperator.test(formula) &&
        !endsWithNegative.test(formula) &&
        value === "-"
      ) {
        this.setState({
          formula: this.state.formula + input + value,
          input: ""
        });
      } else if (
        endsOperator.test(formula) &&
        input === "" &&
        endsWithNegative.test(formula) &&
        value !== "-"
      ) {
        this.setState({
          formula: this.state.formula.slice(0, -2) + value,
          input: ""
        });
      } else if (
        endsOperator.test(formula) &&
        input === "" &&
        !endsWithNegative.test(formula)
      ) {
        this.setState({
          formula: this.state.formula.slice(0, -1) + value,
          input: ""
        });
      } else {
        this.setState({
          formula: endsOperator.test(formula[formula.length-2]) ? formula:  formula + input + value,
          input: ""
        });
      }
    } else {
      this.setState({
        formula: this.state.input + value,
        input: "",
        evaluated: false
      });
    }
  }

  handleDecimal(e) {
    const input = this.state.input;
    const value = e.target.value;
    // only add decimal if there is no current decimal point
    if (this.state.input.indexOf(".") === -1) {
      this.setState({
        input: input + value
      });
    }
  }

  handleEqual() {
    let equal = this.state.formula;

    if (endsOperator.test(equal) && this.state.input !== "") {
      this.setState({
        formula: equal + this.state.input
      });
      this.setState({
        input: evaluate(this.state.formula + this.state.input),
        evaluated: true
      });
    } else if (endsOperator.test(equal) && this.state.input === "") {
      this.setState({
        formula: this.state.formula.slice(0, -1)
      });
      this.setState({
        input: evaluate(this.state.formula.slice(0, -1)),
        evaluated: true
      });
    }
  }

  render() {
    return (
      <div className="container-fluid col-sm-8 col-md-8 col-lg-6 col-xl-4 calculator-container h-100">
        <Formula formula={this.state.formula} />
        <Display input={this.state.input} />
        <Buttons
          clear={this.clear}
          number={this.handleNumbers}
          eval={this.handleEqual}
          operator={this.handleOperator}
          decimal={this.handleDecimal}
          zero={this.handleZero}
        />
      </div>
    );
  }
}

export default Calculator;
