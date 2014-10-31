'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var StudentSchema = new Schema({
  uvid: {
    type: String,
    index: { unique: true },
    required: true
  }
});

// Add createdAt property
UserSchema.plugin(require('mongoose-created-at'));
// Add updatedAt property
UserSchema.plugin(require('mongoose-updated-at'));

module.exports = StudentSchema;
