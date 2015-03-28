'use strict';

var config = require('../../config/config.json');
var jwt = require('jsonwebtoken');
var request = require('request');
var url = require('url');
var Volume = require('./volume.model');
var Issue = require('../issue/issue.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

exports.update = function(req, res) {
  Volume.findByIdAndUpdate(req.body._id, req.body, function(err, volume) {
    if(err){ return res.json(err); }
    res.status(200).json(volume);
  });
};

exports.create = function (req, res) {
  req.body.username = req.user.email;
  Volume.create(req.body, function(err, volume) {
    if(err){ return res.json(err); }
    res.json(volume);
  });
};

exports.delete = function(req, res) {
  Volume.findByIdAndRemove(req.params.id, function (err, volume) {
    if (err) return res.json(err);
    res.json(volume);
  });
};

exports.getSaved = function (req, res) {
  Volume.find({ username: req.user.email }, function(err, volumes){
    if(err){ return next(err); }

    res.json(volumes);
  });
};

exports.search = function (req, res) {
  var urlParts = url.parse(req.url, true);
  var params = urlParts.query;

  var options = {
    url: config.comicVine.url + '/volumes',
    qs: {
      api_key: config.comicVine.apiKey,
      format: 'json',
      filter: params.filter
    },
    json: true
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var comicVineVolumes = body.results;

      // join comic vine and database volumes
      Volume.find({ username: req.user.email }).exec(function(err, volumes) {

        var combinedVolumes = [];
        comicVineVolumes.forEach(function(comicVineVolume) {
          var combinedVolume = {
            name: comicVineVolume.name,
            description: comicVineVolume.description,
            image: comicVineVolume.image,
            publisher: comicVineVolume.publisher,
            start_year: comicVineVolume.start_year,
            count_of_issues: comicVineVolume.count_of_issues,
            id: comicVineVolume.id,
          };

          volumes.forEach(function(volume) {
            if (volume.id === comicVineVolume.id) {
              combinedVolume._id = volume._id;
              combinedVolume.status = volume.status;
            }
          });
          combinedVolumes.push(combinedVolume);
        });

        res.status(200).json(combinedVolumes);
      });
    } else {
      res.status(500);
    }
  });
};

exports.getOne = function (req, res) {
  var volumeId = req.params.volumeId;
  
  var options = {
    url: config.comicVine.url + '/volumes',
    qs: {
      api_key: config.comicVine.apiKey,
      format: 'json',
      filter: 'id:' + volumeId
    },
    json: true
  };

  // check for saved volume, if none found, search for one
  var query = Volume.findOne({ id: volumeId, username: req.user.email });

  query.exec(function (err, volume){
    if (err) { return res.status(500).json(err); }

    if (volume) {
      res.status(200).json(volume);
    } else {
      request(options, function(error, response, body) {
        res.status(200).json(body.results[0]);
      });
    }
  });
 };
