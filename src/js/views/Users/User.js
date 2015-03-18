'use strict';

var React            = require('react');
var Reflux           = require('reflux');
var Router           = require('react-router');
var mui              = require('material-ui');

var UserStore        = require('../../stores/UserStore');
var UserActions      = require('../../actions/UserActions');
var Authenticate     = require('../../mixins/Authenticate');

var TextField        = mui.TextField;
var RadioButtonGroup = mui.RadioButtonGroup;
var RadioButton      = mui.RadioButton;
var RaisedButton     = mui.RaisedButton;

var User = React.createClass({
  mixins: [
    Router.State,
    Authenticate.hasRole('admin'),
    Reflux.listenTo(UserStore, 'onUpdateUsers')
  ],

  onUpdateUsers: function (userStore) {
    var update = userStore.update;
    var errors = update.error ? update.error.errors : [];
    this.setState({
      errors: errors,
      loading: update.loading
    });
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

  updateValues: function (user) {
    user = user || this.getStateFromStore().user;
    this.refs.email.setValue(user.email);
    this.refs.role.setSelectedValue(user.role);
    this.refs.password1.setValue('');
    this.refs.password2.setValue('');
  },

  getStateFromStore: function () {
    var userId = this.getParams().userId;
    return {
      user: UserStore.getById(userId) || {},
      errors: []
    };
  },

  reset: function (event) {
    event.preventDefault();
    this.updateValues();
  },

  componentWillReceiveProps: function () {
    var user = this.getStateFromStore().user;
    if (user.id !== this.state.user.id) {
      this.updateValues(user);
    }
    this.setState({user: user});
  },

  componentDidMount: function() {
    this.updateValues();
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  handleSubmit: function (event) {
    event.preventDefault();

    var confirmPassword = this.refs.password2.getValue();

    var newUser = {
      id: this.state.user.id,
      email: this.refs.email.getValue(),
      role: this.refs.role.getSelectedValue(),
      password: this.refs.password1.getValue()
    };

    if (newUser.password || confirmPassword) {
      if (newUser.password !== confirmPassword) {
        return this.setError('password2', 'Password do not match');
      }
    } else {
      delete newUser.password;
    }

    UserActions.update(newUser);

  },

  render: function () {
    var user = this.state.user || {};
    var errors = this.getErrors();
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextField
              floatingLabelText="User Email"
              ref="email"
              errorText={errors.email} />
          </div>
          <div>
            <RadioButtonGroup name="role" label="Role" ref="role">
              {this.getRoleOptions()}
            </RadioButtonGroup>
          </div>
          <div>
            <TextField
              floatingLabelText="New Password"
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
            <RaisedButton type="button" label="Reset" onClick={this.reset}/>
            <RaisedButton type="submit" primary={true} label="Update User" />
          </div>
        </form>
      </div>
    );
  }
});

module.exports = User;
