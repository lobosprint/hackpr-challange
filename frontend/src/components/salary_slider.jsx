const React = require('react');


const salarySlider = React.createClass({
  getInitialState() {
    return {
      value: 20000,
    }
  },
  render() {
    const max = 200000;
    const min = 10000;
    return (
      <div className="form-group">
          <input
            type="number"
            ref="number"
            min={min}
            max={max}
            step="1000"
            className="form-control"
            onChange={this.handleNumChange}
            defaultValue={this.state.value}
            placeholder="Current Salary"/>
          <input
            type="range"
            min={min}
            max={max}
            step="1000"
            className="form-control"
            defaultValue={this.state.value}
            onChange={this.handleSlide}
            ref="slider" />
      </div>
    );
  },
  handleNumChange(evt) {
    const newVal = this.refs.number.value;
    this.refs.slider.value = newVal;
    this.setState({
      value: newVal
    });
  },
  handleSlide(evt) {
    const newVal = this.refs.slider.value;
    this.refs.number.value = newVal;
    this.setState({
      value: newVal
    });
  }
});


module.exports = salarySlider;
