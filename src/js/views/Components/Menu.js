'use strict';

var React = require('react');
var mui   = require('material-ui');

var Paper = mui.Paper;

var Menu = React.createClass({

  onClick: function (i, menuItem) {
    return (function (event) {
      if (this.props.onItemClick) {
        this.props.onItemClick(event, i, menuItem);
      }
    }).bind(this);
  },

  render: function() {
    return (
      <Paper {...this.props}>
        <ul className="menu-list">
          {this.props.menuItems.map(function (menuItem, i) {
            var onClick = menuItem.clickable ? this.onClick(i, menuItem) : null;
            var className = menuItem.clickable ? 'clickable ' : '';
            className += 'menu-list-item';
            return (
              <li key={i} onClick={onClick} className={className}>
                <span className="menu-list-item-text">{menuItem.text || '(No Value Entered)'}</span>
                <span className="menu-list-item-number">{menuItem.number}</span>
              </li>
            )
          }, this)}
        </ul>
      </Paper>
    );
  }

});

module.exports = Menu;
