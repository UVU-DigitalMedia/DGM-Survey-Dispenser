'use strict';

var React            = require('react');
var Reflux           = require('reflux');
var mui              = require('material-ui');

var UserActions      = require('../../actions/UserActions');
var UserStore        = require('../../stores/UserStore');
var AuthStore        = require('../../stores/AuthStore');

var TextField        = mui.TextField;
var RaisedButton     = mui.RaisedButton;
var FlatButton       = mui.FlatButton;
var RadioButtonGroup = mui.RadioButtonGroup;
var RadioButton      = mui.RadioButton;
var Paper            = mui.Paper;
var Dialog           = mui.Dialog;

var CreateUser = React.createClass({

  getInitialState: function () {
    return {
      errors: []
    };
  },

  setError: function (field, error) {
    this.setState({
      errors: [{
        path: field,
        message: error
      }]
    });
  },

  getErrors: function () {
    var statusErrors = this.props.status && this.props.status.error ?
      this.props.status.error.errors : [];
    statusErrors = statusErrors.concat(this.state.errors);
    return statusErrors.reduce(function (errors, error) {
      errors[error.path] = error.message;
      return errors;
    }, {});
  },

  getRoleOptions: function () {
    if (!this.props.roles) { return []; }
    return this.props.roles.map(function (role, i) {
      var label = role.charAt(0).toUpperCase() + role.substr(1);
      return <RadioButton key={i} value={role} label={label} />;
    });
  },

  handleSubmit: function (event) {
    event.preventDefault();

    this.setState({errors: []});

    var values = {
      email: this.refs.email.getValue(),
      password1: this.refs.password1.getValue(),
      password2: this.refs.password2.getValue(),
      role: this.refs.role.getSelectedValue()
    };

    if (values.password1 !== values.password2) {
      return this.setError('password2', 'Passwords do not match');
    }

    UserActions.create({
      email: values.email,
      password: values.password1,
      role: values.role
    });
  },

  hideDialog: function () { this.refs.createDialog.dismiss(); },

  showDialog: function () { this.refs.createDialog.show(); },

  render: function () {
    var errors = this.getErrors();
    var actions = [
      <FlatButton
        key={0}
        label="Cancel"
        onTouchTap={this.hideDialog} />,
      <RaisedButton
        key={1}
        label="Create"
        primary={true}
        onTouchTap={this.handleSubmit} />
    ];
    return (
      <div>
        <RaisedButton
          label="Create New User"
          secondary={true}
          onTouchTap={this.showDialog} />
        <Dialog title="Create User" actions={actions} ref="createDialog">
          <form onSubmit={this.handleSubmit}>
            <div>
              <TextField
                floatingLabelText="User Email"
                ref="email"
                type="email"
                errorText={errors.email}/>
            </div>
            <div>
              <TextField
                floatingLabelText="Password"
                ref="password1"
                type="password"
                errorText={errors.password}/>
            </div>
            <div>
              <TextField
                floatingLabelText="Confirm Password"
                ref="password2"
                type="password"
                errorText={errors.password2}/>
            </div>
            <div>
              <RadioButtonGroup name="role" label="Role" ref="role">
                {this.getRoleOptions()}
              </RadioButtonGroup>
            </div>
          </form>
        </Dialog>
      </div>
    );
  }
});

module.exports = CreateUser;
