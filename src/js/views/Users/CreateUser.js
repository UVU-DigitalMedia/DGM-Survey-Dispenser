'use strict';

var React            = require('react');
var Reflux           = require('reflux');
var mui              = require('material-ui');

var UserActions      = require('../../actions/UserActions');
var UserStore        = require('../../stores/UserStore');
var AuthStore        = require('../../stores/AuthStore');

var TextField        = mui.TextField;
var RaisedButton     = mui.RaisedButton;
var RadioButtonGroup = mui.RadioButtonGroup;
var RadioButton      = mui.RadioButton;

var CreateUser = React.createClass({
  mixins: [
    require('react/lib/LinkedStateMixin'),
    Reflux.listenTo(UserStore, 'onUsersChange')
  ],

  getInitialState: function () {
    return {
      roles: AuthStore.state.roles
    };
  },

  onUsersChange: function (userStore) {
    this.setState({status: userStore.create});
    console.log(AuthStore.state);
  },

  setError: function (field, error) {
    var error = this.state.error || {};
    error[field] = error;
    this.setState({error: error});
  },

  handleSubmit: function (event) {
    event.preventDefault();

    this.setState({error: null});

    if (this.state.password1 !== this.state.password2) {
      return this.setError('password2', 'Passwords do not match');
    }
    UserActions.create({
      email: this.state.email,
      password: this.state.password1
    });
  },

  getRoleOptions: function () {
    if (!this.state.roles) { return []; }
    return this.state.roles.map(function (role) {
      var label = role.charAt(0).toUpperCase() + role.substr(1);
      return <RadioButton value={role} label={label} />;
    });
  },

  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <TextField
            floatingLabelText="User Email"
            valueLink={this.linkState('email')}
            type="email"/>
        </div>
        <div>
          <TextField
            floatingLabelText="Password"
            valueLink={this.linkState('password1')}
            type="password"/>
        </div>
        <div>
          <TextField
            floatingLabelText="Confirm Password"
            valueLink={this.linkState('password2')}
            type="password"/>
        </div>
        <div>
          <RadioButtonGroup name="role" label="Role">
            {this.getRoleOptions()}
          </RadioButtonGroup>
        </div>
        <div>
          <RaisedButton
            type="submit"
            label="Create User"
            secondary={true} />
        </div>
      </form>
    );
  }
});

module.exports = CreateUser;
