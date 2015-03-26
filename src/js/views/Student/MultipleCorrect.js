'use strict';

var React = require('react');
var mui   = require('material-ui');

var Checkbox  = mui.Checkbox;
var TextField = mui.TextField;

var MultipleCorrect = React.createClass({

  getChoiceById: function (id) {
    var choices = this.props.choices;
    for (var i = 0, len = choices.length; i < len; i += 1) {
      if (choices[i].id === parseInt(id, 10)) { return choices[i]; }
    }
    return {};
  },

  getValues: function () {
    return Object.keys(this.state.ids).map(function (id) {
      var choice = {id: id};
      if (this.getChoiceById(id).dynamicValue) {
        choice.value = this.state.values[id];
      }
      return choice;
    }, this);
  },

  getInitialState: function () {
    return {
      ids: {},
      values: {}
    };
  },

  updateSelection: function (id) {
    return (function (event, checked) {
      var ids = this.state.ids;
      if (checked) {
        ids[id] = true;
      } else {
        delete ids[id];
      }
      this.setState({ids: ids});
    }).bind(this);
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
      return (
        <li key={choice.id}>
          <Checkbox
            label={choice.label}
            onCheck={this.updateSelection(choice.id)}
            defaultChecked={Boolean(this.state.ids[choice.id])} />
          { choice.dynamicValue ?
            <TextField
              onChange={this.updateValue(choice.id)}
              disabled={!Boolean(this.state.ids[choice.id])}
              defaultValue={this.state.values[choice.id]} />
            : null
          }
        </li>
      );
    }, this);
  },

  render: function () {
    return (
      <ul className="choices">
        {this.renderChoices()}
      </ul>
    );
  }

});

module.exports = MultipleCorrect;
