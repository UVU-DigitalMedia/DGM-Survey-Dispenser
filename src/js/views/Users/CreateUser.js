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
    Reflux.listenTo(UserStore, 'onUsersChange'),
    Reflux.connect(AuthStore, 'auth')
  ],

  getInitialState: function () {
    return {
      roles: AuthStore.state.roles,
      auth: {
        user: {}
      }
    };
  },

  onUsersChange: function (userStore) {
    this.setState({status: userStore.create});
  },

  setError: function (field, error) {
    var err = this.state.error || {};
    err[field] = error;
    this.setState({error: err});
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
    return this.state.roles.map(function (role, i) {
      var label = role.charAt(0).toUpperCase() + role.substr(1);
      return <RadioButton key={i} value={role} label={label} />;
    });
  },

  render: function () {
    if (this.state.auth.user.role !== 'admin') { return <span />; }
    return (
      <div>
        <h2>Create New User</h2>
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
      </div>
    );
  }
});

module.exports = CreateUser;
