'use strict';

var React  = require('react');
var Reflux = require('reflux');
var mui    = require('material-ui');

var UserListItem = require('./UserListItem');

var UserList = React.createClass({
  getUsers: function () {
    return this.props.users.map(function (user, i) {
      return (
        <li key={i} className='user-list-item'>
          <UserListItem user={user} />
        </li>
      )
    });
  },

  render: function () {
    return (
      <ul className='user-list'>
        {this.getUsers()}
      </ul>
    );
  }
});

module.exports = UserList;
