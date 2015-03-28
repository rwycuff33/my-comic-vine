'use strict';

var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IssueSchema = new Schema({

  comments: String, // will take markdown
  description: String,
  id: Number,
  image: {
    icon_url: String,
    medium_url: String,
    screen_url: String,
    small_url: String,
    super_url: String,
    thumb_url: String,
    tiny_url: String
  },
  issue_number: String,
  name: String,
  own: Boolean,
  read: Boolean,
  store_date: String,
  username: String,
  volume: {
    name: String,
    id: Number
  },
  volume_id: Number,
  want: Boolean

});

module.exports = mongoose.model('Issue', IssueSchema);
