'use strict';

var config = require('../../config/config.json');
var jwt = require('jsonwebtoken');
var request = require('request');
var Issue = require('./issue.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

exports.update = function (req, res) {
  Issue.findByIdAndUpdate(req.body._id, req.body, function(err, issue) {
    if(err){ return res.json(err); }
    res.json(issue);
  });
};

exports.create = function (req, res) {
  req.body.username = req.user.email;
  Issue.create(req.body, function(err, issue) {
    if(err){ return res.json(err); }
    res.json(issue);
  });
};

exports.delete = function(req, res) {
  Issue.findByIdAndRemove(req.params.id, function (err, issue) {
    if (err) return res.json(err);
    res.json(issue);
  });
};

exports.search = function (req, res) {
  var options = {
    url: config.comicVine.url + '/issues',
    qs: {
      api_key: config.comicVine.apiKey,
      format: 'json'
    },
    json: true
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.status(200).json(body);
    } else {
      res.status(500);
    }
  });
};

exports.getIssuesForVolume = function(req, res) {
  var volumeId = req.params.volumeId;

  var options = {
    url: config.comicVine.url + '/issues',
    qs: {
      api_key: config.comicVine.apiKey,
      format: 'json',
      filter: 'volume:' + volumeId
    },
    json: true
  };
  request(options, function(error, response, body) {

    if (error) { return res.status(500).json(error); }

    Issue.find({ username: req.user.email, volume_id: volumeId }).exec(function(err, issues) {
      if (err) { return res.status(500).json(err); }

      var combinedIssues = [];

      body.results.forEach(function(comicVineIssue) {
        var combinedIssue = {
          id: comicVineIssue.id,
          name: comicVineIssue.name,
          issue_number: comicVineIssue.issue_number,
          volume: comicVineIssue.volume,
          image: comicVineIssue.image,
          description: comicVineIssue.description,
          store_date: comicVineIssue.store_date
        };

        issues.forEach(function(issue) {
          if (issue.id === comicVineIssue.id) {
            combinedIssue._id = issue._id;
            combinedIssue.volume_id = issue.volume_id;
            combinedIssue.own = issue.own;
            combinedIssue.read = issue.read;
            combinedIssue.want = issue.want;
            combinedIssue.comments = issue.comments;
          }
        });
        combinedIssues.push(combinedIssue);
      });

      return res.status(200).json(combinedIssues);

    });

  });
};

exports.getOne = function (req, res) {
  var issueId = req.params.issueId;
  
  var options = {
    url: config.comicVine.url + '/issues',
    qs: {
      api_key: config.comicVine.apiKey,
      format: 'json',
      filter: 'id:' + issueId
    },
    json: true
  };

  // check for saved issue, if none found, search for one
  var query = Issue.findOne({ username: req.user.email, id: issueId });

  query.exec(function (err, issue){
    if (err) { return res.status(500).json(err); }
    return request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var comicVineIssue = body.results[0];

        var combinedIssue = {
          id: comicVineIssue.id,
          name: comicVineIssue.name,
          issue_number: comicVineIssue.issue_number,
          volume: comicVineIssue.volume,
          image: comicVineIssue.image,
          description: comicVineIssue.description,
          store_date: comicVineIssue.store_date
        };

        if (issue) {
          combinedIssue._id = issue._id;
          combinedIssue.volume_id = issue.volume_id;
          combinedIssue.own = issue.own;
          combinedIssue.read = issue.read;
          combinedIssue.want = issue.want;
          combinedIssue.comments = issue.comments;
        }

        res.status(200).json(combinedIssue);
      } else {
        res.status(500);
      }
    });

  });
};
