'use strict';

var React   = require('react');
var Router  = require('react-router');
var mui     = require('material-ui');

var LeftNav = mui.LeftNav;

var menuItems = [
  {
    item: {route: 'dashboard', text: 'Dashboard'}
  },
  {
    restrict: ['admin'],
    item: {route: 'users', text: 'Users'}
  },
  {
    item: {type: mui.MenuItem.Types.LINK, payload: '/logout', text: 'Logout'}
  }
];

var AppNav = React.createClass({

  mixins: [Router.Navigation, Router.State],

  getMenuItems: function () {
    if (!this.props.user) { return []; }
    var role = this.props.user.role;
    return menuItems
      .filter(function (menuItem) {
        return !menuItem.restrict || menuItem.restrict.indexOf(role) !== -1;
      })
      .map(function (menuItem) {
        return menuItem.item;
      });
  },

  toggle: function () {
    this.refs.leftNav.toggle();
  },

  onLeftNavChange: function(e, key, payload) {
    this.transitionTo(payload.route);
  },

  render: function() {
    return (
      <LeftNav
        ref="leftNav"
        docked={false}
        isInitiallyOpen={false}
        menuItems={this.getMenuItems()}
        onChange={this.onLeftNavChange}/>
    );
  }

});

module.exports = AppNav;

/*
var React = require('react'),
  Router = require('react-router'),
  mui = require('mui'),

  menuItems = [
    { route: 'get-started', text: 'Get Started' },
    { route: 'css-framework', text: 'CSS Framework' },
    { route: 'components', text: 'Components' },
    { type: mui.MenuItem.Types.SUBHEADER, text: 'Resources' },
    { type: mui.MenuItem.Types.LINK, payload: 'https://github.com/callemall/material-ui', text: 'GitHub' },
    { type: mui.MenuItem.Types.LINK, payload: 'http://facebook.github.io/react', text: 'React' },
    { type: mui.MenuItem.Types.LINK, payload: 'https://www.google.com/design/spec/material-design/introduction.html', text: 'Material Design' }
  ];

var AppLeftNav = React.createClass({

  mixins: [Router.Navigation, Router.State],

  getInitialState: function() {
    return {
      selectedIndex: null
    };
  },

  render: function() {
    var header = <div className="logo" onClick={this._onHeaderClick}>material ui</div>;

    return (
      <mui.LeftNav
        ref="leftNav"
        docked={false}
        isInitiallyOpen={false}
        header={header}
        menuItems={menuItems}
        selectedIndex={this._getSelectedIndex()}
        onChange={this._onLeftNavChange} />
    );
  },

  toggle: function() {
    this.refs.leftNav.toggle();
  },

  _getSelectedIndex: function() {
    var currentItem;

    for (var i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.isActive(currentItem.route)) return i;
    };
  },

  _onLeftNavChange: function(e, key, payload) {
    this.transitionTo(payload.route);
  },

  _onHeaderClick: function() {
    this.transitionTo('root');
    this.refs.leftNav.close();
  }

});

module.exports = AppLeftNav;
*/
