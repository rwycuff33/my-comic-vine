'use strict';

angular.module('comicVine')
  .controller('SearchResultsCtrl', function (resultsFound) {

    var ctrlSearchResults = this;

    angular.extend(ctrlSearchResults, {

      name: 'SearchResultsCtrl',

      results: resultsFound.results

    });

  });
