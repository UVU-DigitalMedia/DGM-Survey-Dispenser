'use strict';

var React = require('react');
var mui   = require('material-ui');

var RadioButtonGroup = mui.RadioButtonGroup;
var RadioButton      = mui.RadioButton;

var RadioSet = React.createClass({

  getSelectedValue: function () {
    return this.refs.radioGroup.getSelectedValue();
  },

  setSelectedValue: function (val) {
    return this.refs.radioGroup.setSelectedValue(val);
  },

  getOptions: function () {
    if (!this.props.values) { return []; }
    return this.props.values.map(function (value, i) {
      var label = value.charAt(0).toUpperCase() + value.substr(1);
      return <RadioButton key={i} value={value} label={label} />;
    });
  },

  getClasses: function () {
    var classes = [
      'mui-text-field',
      'radio-set'
    ];
    if (this.props.errorText) {
      classes.push('mui-has-error');
    }
    return classes.join(' ');
  },

  getError: function () {
    if (this.props.errorText) {
      return <div className="mui-text-field-error">{this.props.errorText}</div>;
    }
  },

  render: function() {
    return (
      <div className={this.getClasses()}>
        <label>{this.props.label}</label><br />
        <RadioButtonGroup name={this.props.name} ref="radioGroup">
          {this.getOptions()}
        </RadioButtonGroup>
        {this.getError()}
      </div>
    );
  }

});

module.exports = RadioSet;
