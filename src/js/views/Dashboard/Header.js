'use strict';

var React        = require('react');
var Reflux       = require('reflux');
var Router       = require('react-router');
var mui          = require('material-ui');

var AuthActions  = require('../../actions/AuthActions');
var AuthStore    = require('../../stores/AuthStore');

var Toolbar      = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var Paper        = mui.Paper;
var RaisedButton = mui.RaisedButton;

var Header = React.createClass({
  mixins: [
    Reflux.listenTo(AuthStore, 'onAuthChange'),
    Router.Navigation
  ],

  onAuthChange: function (auth) {
    if (!auth.user) {
      this.transitionTo('login');
    }
  },

  render: function () {
    return (
      <Paper zDepth={1}>
        <Toolbar>
          <ToolbarGroup key={0} float="left">
            <h3>DGM Survey Dispenser</h3>
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
            <RaisedButton label="Logout" secondary={true} onClick={AuthActions.logout} />
          </ToolbarGroup>
        </Toolbar>
      </Paper>
    );
  }
});

module.exports = Header;
