'use strict';

var React = require('react');
var mui   = require('material-ui');

var RaisedButton = mui.RaisedButton;
var TextField    = mui.TextField;
var Toggle       = mui.Toggle;

var Multiple = React.createClass({

  getInitialState: function () {
    return {
      choices: []
    };
  },

  addChoice: function (event) {
    event.preventDefault();
    this.setState({
      choices: this.state.choices.concat({
        label: '', dynamicValue: false
      })
    });
  },

  removeChoice: function (i, event) {
    event.preventDefault();
    this.state.choices.splice(i, 1);
    this.setState({
      choices: this.state.choices
    });
  },

  getValues: function () {
    return this.state.choices;
  },

  resetValues: function () {
    this.setState({choices: []});
  },

  changeLabelValue: function (i, event) {
    var value = event.target.value;
    var choices = this.state.choices;
    choices[i].label = value;
    this.setState({choices: choices});
  },

  changeDynamicValue: function (i, event) {
    var value = event.target.value === 'on' ? true : false;
    var choices = this.state.choices;
    choices[i].dynamicValue = value;
    this.setState({choices: choices});
  },

  renderChoices: function () {
    return this.state.choices.map(function (choice, i) {
      return (
        <li key={i}>
          <TextField
            floatingLabelText="Label"
            onChange={this.changeLabelValue.bind(this, i)} />
          <Toggle
            label="Dynamic Value"
            defaultToggled={choice.dynamicValue}
            onToggle={this.changeDynamicValue.bind(this, i)} />
          <RaisedButton
            type="button"
            label="Remove Choice"
            primary={true}
            onTouchTap={this.removeChoice.bind(this, i)} />
        </li>
      );
    }, this);
  },

  render: function () {
    return (
      <div>
        <ul className="choices-input">
          {this.renderChoices()}
        </ul>
        <RaisedButton
          type="button"
          label="Add Choice"
          secondary={true}
          onTouchTap={this.addChoice} />
      </div>
    );
  }

});

module.exports = Multiple;
