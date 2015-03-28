'use strict';

angular.module('comicVine')
  .directive('issueSearch', function () {
    return {
      restrict: 'E',
      templateUrl: 'directives/issue-search/issue-search.html'
    };
  });
