'use strict';

var React        = require('react');
var mui          = require('material-ui');

var RaisedButton = mui.RaisedButton;
var TextField    = mui.TextField;
var Toggle       = mui.Toggle;

var Choices = React.createClass({

  getInitialState: function () {
    return {
      choices: []
    };
  },

  addChoice: function (dynamicValue) {
    this.setState({
      choices: this.state.choices.concat({
        label: '', dynamicValue: !!dynamicValue
      })
    });
  },

  removeChoice: function (i) {
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

  changeLabelValue: function (i, event, value) {
    var choices = this.state.choices;
    choices[i].label = value;
    this.setState({choices: choices});
  },

  changeDynamicValue: function (i, event, value) {
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
            label="Remove Choice"
            primary={true}
            onTouchTap={this.removeChoice.bind(this, i)} />
        </li>
      );
    }, this);
  },

  render: function() {
    if (!this.props.type) { return <span/>; }
    return (
      <div>
        <ul className="choices-input">
          {this.renderChoices()}
        </ul>
        <RaisedButton
          label="Add Choice"
          secondary={true}
          onTouchTap={this.addChoice} />
      </div>
    );
  }

});

module.exports = Choices;
