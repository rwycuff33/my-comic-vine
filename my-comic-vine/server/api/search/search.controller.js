'use strict';

var config = require('../../config/config.json');
var jwt = require('jsonwebtoken');
var request = require('request');
var url = require('url');
var Volume = require('../volume/volume.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

exports.search = function(req, res) {
  var urlParts = url.parse(req.url, true);
  var params = urlParts.query;

  var options = {
    url: config.comicVine.url + '/search',
    qs: {
      api_key: config.comicVine.apiKey,
      format: 'json',
      query: params.query,
      resources: params.resources,
      limit: params.limit,
      page: params.page,
      resource_type: params.resource_type
    },
    json: true
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      
      if (params.resource_type === 'volume') {
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

          var results = {
            limit: 100,
            offset: 0,
            number_of_page_results: 15,
            number_of_total_results: 15,
            results: combinedVolumes
          };

          res.status(200).json(results);
        });
      } else {
        res.status(200).json(body);
      }
    } else {
      res.status(500);
    }
  });
};
