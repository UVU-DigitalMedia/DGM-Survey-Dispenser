'use strict';

var React       = require('react');
var Reflux      = require('reflux');
var mui         = require('material-ui');

var AuthActions = require('../../actions/AuthActions');
var AuthStore   = require('../../stores/AuthStore');

var TextField   = mui.TextField;

var LoginForm = React.createClass({
  mixins: [
    require('react/lib/LinkedStateMixin'),
    Reflux.connect(AuthStore, 'auth')
  ],

  render: function () {
    return (
      <div>
        <TextField
          floatingLabelText="Email"
          valueLink={this.linkState('email')} />
        <TextField
          floatingLabelText="Password"
          valueLink={this.linkState('password')} />
      </div>
    );
  }
});
