'use strict';

var React            = require('react');
var Reflux           = require('reflux');
var Router           = require('react-router');
var mui              = require('material-ui');

var UserUpdateStore  = require('../../stores/UserUpdateStore');
var UserStore        = require('../../stores/UserStore');
var UserActions      = require('../../actions/UserActions');
var Authenticate     = require('../../mixins/Authenticate');

var RadioSet         = require('../Form/RadioSet');
var TextField        = mui.TextField;
var RaisedButton     = mui.RaisedButton;
var Snackbar         = mui.Snackbar;

var User = React.createClass({
  mixins: [
    Router.State,
    Authenticate.hasRole('admin'),
    Reflux.listenTo(UserUpdateStore, 'onUpdateUser')
  ],

  onUpdateUser: function (updateStatus) {
    if (updateStatus.success) {
      this.successAlert();
    }
    this.setState({
      loading: updateStatus.loading,
      errors: updateStatus.error ? updateStatus.error.errors : []
    });
  },

  successAlert: function () {
    var successAlert = this.refs.successAlert;
    successAlert.show();
    setTimeout(successAlert.dismiss, 3000);
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
    return this.state.errors.reduce(function (errors, error) {
      errors[error.path] = error.message;
      return errors;
    }, {});
  },

  updateValues: function (user) {
    user = user || this.getStateFromStore().user;
    this.refs.email.setValue(user.email);
    this.refs.role.setSelectedValue(user.role);
    this.refs.password1.setValue('');
    this.refs.password2.setValue('');
  },

  getStateFromStore: function () {
    return {
      user: UserStore.getById(this.getParams().userId) || {}
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
    var state = this.getStateFromStore();
    state.errors = [];
    return state;
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
          <div className="row">
            <div className="col-sm-6">
              <div>
                <TextField
                  floatingLabelText="User Email"
                  ref="email"
                  errorText={errors.email} />
              </div>
              <div>
                <RadioSet
                  name="role"
                  label="Role"
                  ref="role"
                  values={this.props.roles}
                  errorText={errors.role} />
              </div>
            </div>
            <div className="col-sm-6">
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
            </div>
          </div>
          <div>
            <RaisedButton
              type="button"
              label="Reset"
              onClick={this.reset}/>
            <RaisedButton
              type="submit"
              primary={true}
              label={this.state.loading ? 'Updating...' : 'Update User'} />
          </div>
        </form>
        <Snackbar message="User has been updated" ref="successAlert" />
      </div>
    );
  }
});

module.exports = User;
