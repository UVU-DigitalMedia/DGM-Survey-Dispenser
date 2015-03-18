'use strict';

var React        = require('react');
var Reflux       = require('reflux');
var Router       = require('react-router');
var mui          = require('material-ui');

// var Toolbar      = mui.Toolbar;
// var ToolbarGroup = mui.ToolbarGroup;
// var Paper        = mui.Paper;
// var FlatButton   = mui.FlatButton;
// var Link         = Router.Link;

var AppBar = mui.AppBar;
var AppNav = require('./AppNav');

var Header = React.createClass({
  mixins: [Router.State],

  menuTap: function () {
    this.refs.appNav.toggle();
  },

  render: function () {
    return (
      <div>
        <AppBar
          className="mui-dark-theme"
          onMenuIconButtonTouchTap={this.menuTap}
          title="DGM Survey Dispenser"
          zDepth={1}>
          <FlatButton className="logout-button" label="Logout" linkButton={true} href="/logout" />
        </AppBar>
        <AppNav ref="appNav" />
      </div>
    );
  }
});

module.exports = Header;
