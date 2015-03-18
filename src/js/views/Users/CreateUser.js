'use strict';

var React            = require('react');
var Reflux           = require('reflux');
var mui              = require('material-ui');

var UserActions      = require('../../actions/UserActions');
var UserCreateStore  = require('../../stores/UserCreateStore');
var AuthStore        = require('../../stores/AuthStore');

var RadioSet         = require('../Form/RadioSet');
var TextField        = mui.TextField;
var RaisedButton     = mui.RaisedButton;
var FlatButton       = mui.FlatButton;
var Dialog           = mui.Dialog;
var Snackbar         = mui.Snackbar;

var CreateUser = React.createClass({
  mixins: [
    Reflux.listenTo(UserCreateStore, 'onCreateUser')
  ],

  onCreateUser: function (createStatus) {
    if (createStatus.success) {
      this.successAlert();
      this.resetValues();
      this.hideDialog();
    }
    this.setState({
      loading: createStatus.loading,
      errors: createStatus.error ? createStatus.error.errors : []
    });
  },

  successAlert: function () {
    var successAlert = this.refs.successAlert;
    successAlert.show();
    setTimeout(successAlert.dismiss, 3000);
  },

  resetValues: function () {
    this.refs.email.setValue('');
    this.refs.password1.setValue('');
    this.refs.password2.setValue('');
    this.refs.role.setSelectedValue('');
  },

  getInitialState: function () {
    return {
      loading: false,
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
    return this.state.errors.reduce(function (errors, error) {
      errors[error.path] = error.message;
      return errors;
    }, {});
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
        label={this.state.loading ? 'Creating...' : 'Create'}
        primary={true}
        onTouchTap={this.handleSubmit} />
    ];
    return (
      <div>
        <RaisedButton
          label="Create New User"
          secondary={true}
          onTouchTap={this.showDialog} />
        <Dialog title="Create User" actions={actions} ref="createDialog" onDismiss={this.resetValues}>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-6">
                <div>
                  <TextField
                    floatingLabelText="User Email"
                    ref="email"
                    type="email"
                    errorText={errors.email}/>
                </div>
                <div>
                  <RadioSet
                    name="role"
                    label="Role"
                    ref="role"
                    values={this.props.roles}
                    errorText={errors.role}/>
                </div>
              </div>
              <div className="col-sm-6">
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
              </div>
            </div>
          </form>
        </Dialog>
        <Snackbar message="User has been created" ref="successAlert" />
      </div>
    );
  }
});

module.exports = CreateUser;
