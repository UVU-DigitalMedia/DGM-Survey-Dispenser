'use strict';

var React = require('react');
var mui   = require('material-ui');

var TextField = mui.TextField;
var RadioButtonGroup = mui.RadioButtonGroup;
var RadioButton = mui.RadioButton;

var MultipleCorrect = React.createClass({

  getChoiceById: function (id) {
    var choices = this.props.choices;
    for (var i = 0, len = choices.length; i < len; i += 1) {
      if (choices[i].id === parseInt(id, 10)) { return choices[i]; }
    }
    return {};
  },

  getValues: function () {
    return {
      id: parseInt(this.state.id, 10),
      value: this.state.values[this.state.id]
    };
  },

  getInitialState: function () {
    return {
      id: null,
      values: {}
    };
  },

  updateSelection: function (event, id) {
    this.setState({id: id});
  },

  updateValue: function (id) {
    return (function (event) {
      var values = this.state.values;
      values[id] = event.target.value;
      this.setState({values: values});
    }).bind(this);
  },

  renderChoices: function () {
    return this.props.choices.map(function (choice) {
      return <RadioButton
        key={choice.id}
        label={choice.label}
        value={choice.id + ''}
        defaultChecked={Boolean(this.state.id === choice.id)} />;
    }, this);
  },

  render: function () {
    var choice = this.getChoiceById(this.state.id);
    return (
      <div>
        <RadioButtonGroup
          name="multiple-choice"
          onChange={this.updateSelection}>
          {this.renderChoices()}
        </RadioButtonGroup>
        { this.state.id && choice.dynamicValue ?
          <TextField
            floatingLabelText={choice.label}
            onChange={this.updateValue(this.state.id)}
            defaultValue={this.state.values[this.state.id]}/>
          : null
        }
      </div>
    );
  }

});

module.exports = MultipleCorrect;
