'use strict';

var React        = require('react');
var Reflux       = require('reflux');
var Router       = require('react-router');
var mui          = require('material-ui');

var AuthActions  = require('../../actions/AuthActions');
var AuthStore    = require('../../stores/AuthStore');

var TextField    = mui.TextField;
var RaisedButton = mui.RaisedButton;
var FlatButton   = mui.FlatButton;

var LoginForm = React.createClass({
  mixins: [
    require('react/lib/LinkedStateMixin'),
    Reflux.listenTo(AuthStore, 'onAuthChange'),
    Router.Navigation, Router.State
  ],

  onAuthChange: function (auth) {
    this.setState({auth: auth});

    if (auth.user) {
      var nextPath = this.getQuery().nextPath;
      this.transitionTo(nextPath || 'dashboard');
    }
  },

  getInitialState: function () {
    return {
      email: '',
      password: '',
      auth: {}
    };
  },

  handleSubmit: function (event) {
    event.preventDefault();
    AuthActions.login(this.state.email, this.state.password);
    this.setState({password: ''});
  },

  render: function () {
    return (
      <div className="row center-xs">
        <div className="col-xs-12 col-sm-6">
          <h2 className="text-center">DGM Survey Dispenser Login</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <TextField
                floatingLabelText="Email"
                valueLink={this.linkState('email')} />
            </div>
            <div>
              <TextField
                floatingLabelText="Password"
                valueLink={this.linkState('password')}
                type="password" />
            </div>
            <div>
              <RaisedButton
                type="submit"
                primary={true}
                disabled={this.state.auth.loading}
                label={this.state.auth.loading ? 'Loading...' : 'Login'} />
            </div>
          </form>
        </div>
        <FlatButton
          className="fixed-button"
          label="Student Login"
          onClick={this.transitionTo.bind(null, 'student-login')} />
      </div>
    );
  }
});

module.exports = LoginForm;
