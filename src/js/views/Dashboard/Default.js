'use strict';

var React  = require('react');
var Reflux = require('reflux');
var mui    = require('material-ui');

var UserActions = require('../../actions/UserActions');
var DispenseStore = require('../../stores/DispenseStore');

var RaisedButton = mui.RaisedButton;

var Default = React.createClass({
  mixins: [
    Reflux.connect(DispenseStore, 'loading')
  ],

  getInitialState: function () {
    return {loading: false};
  },

  dispense: function () {
    UserActions.dispense();
  },

  render: function() {
    return (
      <div>
        <br/>
        <h1>Dashboard</h1>
        <RaisedButton
          label={this.state.loading ? 'Dispensing...' : 'Dispense M&Ms'}
          onClick={this.dispense}
          disabled={this.state.loading} />
      </div>
    );
  }

});

module.exports = Default;
