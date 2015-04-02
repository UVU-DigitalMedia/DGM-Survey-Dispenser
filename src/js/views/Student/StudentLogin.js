'use strict';

var React  = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var mui    = require('material-ui');

var StudentActions = require('../../actions/StudentActions');
var StudentStore   = require('../../stores/StudentStore');

var TextField      = mui.TextField;
var RaisedButton   = mui.RaisedButton;
var FlatButton     = mui.FlatButton;

var StudentLogin = React.createClass({
  mixins: [
    Reflux.listenTo(StudentStore, 'onStudentUpdate'),
    Router.Navigation
  ],

  onStudentUpdate: function (state) {
    this.setState({studentInfo: state});
    if (state.student) {
      this.transitionTo('answer');
    }
  },

  getInitialState: function () {
    return {
      studentInfo: {}
    };
  },

  handleSubmit: function (event) {
    event.preventDefault();
    StudentActions.login(this.refs.uvid.getValue());
  },

  render: function() {
    var hasError = this.state.studentInfo && this.state.studentInfo.error;
    var errorText = hasError ? 'Login Failed. Enter a valid UVID.' : null;
    return (
      <div className="row center-xs">
        <div className="col-xs-12 col-sm-6">
          <br/>
          <h1>DGM Survey</h1>
          <form onSubmit={this.handleSubmit}>
            <div>
              <TextField
                type="tel"
                floatingLabelText="UVID"
                ref="uvid"
                errorText={errorText}/>
            </div>
            <br/><br/>
            <div>
              <RaisedButton
                type="submit"
                primary={true}
                disabled={this.state.studentInfo.loading}
                label={this.state.studentInfo.loading ? 'Loading...' : 'Login'} />
            </div>
          </form>
        </div>
        <FlatButton
          className="fixed-button"
          label="Admin Login"
          onClick={this.transitionTo.bind(null, 'login')} />
      </div>
    );
  }

});

module.exports = StudentLogin;
