'use strict';
 
/**
 * @ngdoc function
 * @name comicVine.service:IssueService
 * @description
 * # IssueService
 * Service of the comicVine
 */
angular.module('comicVine')
  .factory('IssueService', function ($http) {

    var Service = {};

    Service.search = function(params) {
      var options = {
        params: params
      };
      return $http.get('/api/issues', options).then(function(response) {
        return response.data.results;
      });
    };

    Service.getOne = function(issueId) {
      return $http.get('/api/issues/' + issueId).then(function(response) {
        return response.data;
      });
    };

    Service.getIssuesForVolume = function(volumeId) {
      return $http.get('/api/issues/volume/' + volumeId).then(function(response) {
        return response.data;
      });
    };

    Service.create = function(issue) {
      return $http.post('/api/issues', issue).then(function(response) {
        return response.data;
      });
    };

    Service.update = function(issue) {
      delete issue.__v;
      return $http.put('/api/issues', issue).then(function(response) {
        return response.data;
      });
    };

    Service.delete = function(id) {
      return $http.delete('/api/issues/' + id).then(function(response) {
        delete response.data._id;
        return response.data;
      });
    };

    Service.save = function(issue) {

      issue.volume_id = issue.volume.id;

      if (issue._id) {
        if (!issue.owned && !issue.read) {
          return Service.delete(issue._id);
        } else {
          return Service.update(issue);
        }
      } else {
        return Service.create(issue);
      }
      
    };

    return Service;
 
});