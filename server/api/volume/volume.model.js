'use strict';

var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VolumeSchema = new Schema({
  id: Number,
  name: String,
  description: String,
  image: {
    icon_url: String,
    medium_url: String,
    screen_url: String,
    small_url: String,
    super_url: String,
    thumb_url: String,
    tiny_url: String
  },
  publisher: {
    name: String,
    id: Number
  },
  count_of_issues: Number,
  start_year: String,
  username: String,
  status: String // Reading / Want To Read / Finished / Disliked
});

module.exports = mongoose.model('Volume', VolumeSchema);
