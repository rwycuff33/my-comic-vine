'use strict';

angular.module('comicVine')
  .controller('SearchResultsInfoCtrl', function (searchParams, resultsFound) {

    var ctrlSearchResultsInfo = this;

    var page = parseInt(searchParams.page, 10) || 1,
        limit = parseInt(searchParams.limit, 10);

    angular.extend(ctrlSearchResultsInfo, {

      name: 'SearchResultsInfoCtrl',

      startingCount: (page - 1) * limit + 1,
      endCount: page * limit,
      total: resultsFound.number_of_total_results

    });

  });
