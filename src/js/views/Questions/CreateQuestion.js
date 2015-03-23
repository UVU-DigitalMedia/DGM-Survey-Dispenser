'use strict';

var React  = require('react');
var Reflux = require('reflux');
var mui    = require('material-ui');

var QuestionActions     = require('../../actions/QuestionActions');
var QuestionCreateStore = require('../../stores/QuestionCreateStore');

var RadioSet            = require('../Form/RadioSet');
var Choices             = require('./Choices');
var TextField           = mui.TextField;
var RaisedButton        = mui.RaisedButton;
var FlatButton          = mui.FlatButton;
var Dialog              = mui.Dialog;
var Snackbar            = mui.Snackbar;
var Toggle              = mui.Toggle;

var CreateQuestion = React.createClass({
  mixins: [
    Reflux.listenTo(QuestionCreateStore, 'onCreateQuestion')
  ],

  onCreateQuestion: function (createStatus) {
    if (createStatus.success) {
      this.successAlert();
      this.resetValues();
      this.hideDialog();
    }
    this.setState({
      loading: createStatus.loading,
      errors: createStatus.error ? createStatus.error.errors : []
    });
  },

  successAlert: function () {
    var successAlert = this.refs.successAlert;
    successAlert.show();
    setTimeout(successAlert.dismiss, 3000);
  },

  resetValues: function () {
    this.refs.choices.resetValues();
    this.refs.label.setValue('');
    this.refs.description.setValue('');
    this.refs.type.setSelectedValue(null);
  },

  getInitialState: function () {
    return {
      loading: false,
      errors: [],
      type: null
    };
  },

  setError: function (field, error) {
    this.setState({
      errors: [{
        path: field,
        message: error
      }]
    });
  },

  getErrors: function () {
    if (!this.state.errors) { return {}; }
    return this.state.errors.reduce(function (errors, error) {
      errors[error.path] = error.message;
      return errors;
    }, {});
  },

  getTypes: function () {
    if (!this.props.types) { return []; }
    return Object.keys(this.props.types).map(function (type) {
      return {
        key: type,
        label: this.props.types[type]
      };
    }, this);
  },

  typeChange: function (event, value) {
    this.setState({type: value});
  },

  handleSubmit: function (event) {
    event.preventDefault();

    this.setState({errors: []});

    var values = {
      label: this.refs.label.getValue(),
      description: this.refs.description.getValue(),
      type: this.refs.type.getSelectedValue(),
      choices: this.refs.choices.getValues()
    };

    QuestionActions.create(values);
  },

  hideDialog: function () { this.refs.createDialog.dismiss(); },

  showDialog: function () { this.refs.createDialog.show(); },

  render: function () {
    var errors = this.getErrors();
    var actions = [
      <FlatButton
        key={0}
        label="Cancel"
        onTouchTap={this.hideDialog} />,
      <RaisedButton
        key={1}
        label={this.state.loading ? 'Creating...' : 'Create'}
        primary={true}
        onTouchTap={this.handleSubmit} />
    ];
    return (
      <div>
        <RaisedButton
          label="Create New Question"
          secondary={true}
          onTouchTap={this.showDialog} />
        <Dialog title="Create Question" actions={actions} ref="createDialog" onDismiss={this.resetValues}>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-6">
                <div>
                  <TextField
                    floatingLabelText="Admin Label"
                    ref="label"
                    type="text"
                    errorText={errors.label} />
                </div>
                <div>
                  <TextField
                    floatingLabelText="Question"
                    ref="description"
                    type="text"
                    multiLine={true}
                    errorText={errors.description} />
                </div>
                <div>
                  <RadioSet
                    name="type"
                    label="Question Type"
                    ref="type"
                    values={this.getTypes()}
                    errorText={errors.type}
                    onChange={this.typeChange}/>
                </div>
                <div>
                  <Toggle
                    label="Activate upon saving"
                    defaultToggled={true}
                    ref="active" />
                </div>
              </div>
              <div className="col-sm-6">
                <Choices type={this.state.type} ref="choices"/>
              </div>
            </div>
          </form>
        </Dialog>
        <Snackbar message="Question has been created" ref="successAlert" />
      </div>
    );
  }
});

module.exports = CreateQuestion;
