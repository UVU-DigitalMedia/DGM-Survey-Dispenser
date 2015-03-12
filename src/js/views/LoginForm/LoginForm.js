'use strict';

var React        = require('react');
var Reflux       = require('reflux');
var Router       = require('react-router');
var mui          = require('material-ui');

var AuthActions  = require('../../actions/AuthActions');
var AuthStore    = require('../../stores/AuthStore');

var TextField    = mui.TextField;
var RaisedButton = mui.RaisedButton;

var LoginForm = React.createClass({
  mixins: [
    require('react/lib/LinkedStateMixin'),
    Reflux.listenTo(AuthStore, 'onAuthChange'),
    Router.Navigation
  ],

  onAuthChange: function (auth) {
    this.setState({auth: auth});
    if (auth.user) {
      this.transitionTo('dashboard');
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
    console.log(this.state);
    AuthActions.login(this.state.email, this.state.password);
    this.setState({password: ''});
  },

  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          floatingLabelText="Email"
          valueLink={this.linkState('email')} />
        <TextField
          floatingLabelText="Password"
          valueLink={this.linkState('password')}
          type="password" />
        <RaisedButton
          type="submit"
          primary={true}
          disabled={this.state.auth.loading}
          label={this.state.auth.loading ? 'Loading...' : 'Login'}/>
      </form>
    );
  }
});

module.exports = LoginForm;
