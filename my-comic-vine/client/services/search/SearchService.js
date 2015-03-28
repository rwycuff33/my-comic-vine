'use strict';

angular.module('comicVine')
  .factory('SearchService', function ($http) {

    var Service = {};

    Service.search = function(params) {
      // only serching for one resource type so map to that type
      if (params.resources && params.resources.indexOf(',') === -1) {
        params.resource_type = params.resources;
      }

      var options = {
        params: params
      };
      return $http.get('/api/search', options).then(function(response) {
        return response.data;
      });
    };

    return Service;
 
});