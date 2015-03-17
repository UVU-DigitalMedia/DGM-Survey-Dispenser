'use strict';

var React  = require('react');
var Reflux = require('reflux');
var mui    = require('material-ui');

var UserListItem = React.createClass({
  render: function () {
    return (
      <div>
        <h5>
          {this.props.user.email}
          ({this.props.user.role})
        </h5>
      </div>
    );
  }
});

module.exports = UserListItem;
