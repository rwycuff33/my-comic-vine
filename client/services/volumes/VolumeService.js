'use strict';
 
/**
 * @ngdoc function
 * @name comicVine.service:VolumeService
 * @description
 * # VolumeService
 * Service of the comicVine
 */
angular.module('comicVine')
  .factory('VolumeService', function ($http) {

    var Service = {};

    Service.search = function(params) {
      var options = {
        params: params
      };
      return $http.get('/api/volumes', options).then(function(response) {
        return response.data.results;
      });
    };

    Service.getSaved = function() {
      return $http.get('/api/volumes/saved').then(function(response) {
        return response.data;
      });
    };

    Service.getOne = function(volumeId) {
      return $http.get('/api/volumes/' + volumeId).then(function(response) {
        return response.data;
      });
    };

    Service.save = function(volume) {
      delete volume.__v;

      if (volume._id) {
        // update
        return $http.put('/api/volumes', volume).then(function(response) {
          return response.data;
        });
      } else {
        // create
        return $http.post('/api/volumes', volume).then(function(response) {
          return response.data;
        });
      }
    };

    Service.delete = function(id) {
      return $http.delete('/api/volumes/' + id).then(function(response) {
        return response.data;
      });
    }

    return Service;
 
});