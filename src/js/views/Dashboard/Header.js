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
var FlatButton   = mui.FlatButton;
var Link         = Router.Link;

var Header = React.createClass({
  mixins: [],

  logout: function () {
    window.location.href = '/logout';
  },

  render: function () {
    return (
      <Paper zDepth={1}>
        <Toolbar>
          <ToolbarGroup key={0} float="left">
            <h4 className="toolbar-heading">DGM Survey Dispenser</h4>
          </ToolbarGroup>
          <ToolbarGroup key={1} float="left">
            <Link to="users">Users</Link>
          </ToolbarGroup>
          <ToolbarGroup key={2} float="right">
            <FlatButton label="Logout" primary={true} onClick={this.logout} />
          </ToolbarGroup>
        </Toolbar>
      </Paper>
    );
  }
});

module.exports = Header;
