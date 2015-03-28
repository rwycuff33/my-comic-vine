'use strict';

angular.module('comicVine')
  .directive('publisher', function () {
    return {
      restrict: 'E',
      templateUrl: 'directives/publisher/publisher.html'
    };
  });
