'use strict';

angular.module('comicVine')
  .directive('volume', function () {
    return {
      restrict: 'E',
      templateUrl: 'directives/volume/volume.html'
    };
  });
