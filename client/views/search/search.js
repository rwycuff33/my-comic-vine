'use strict';

angular.module('comicVine')
  .config(function ($stateProvider) {
    $stateProvider
      .state('search', {
        url: '/search?query&resources&limit&page',
        templateUrl: 'views/search/searchform.html',
        controller: 'SearchFormCtrl as ctrlSearchForm',
        resolve: {
          searchParams: function($stateParams) {
            var params = {
              query: $stateParams.query,
              resources: $stateParams.resources,
              limit: $stateParams.limit || 50,
              page: $stateParams.page == null ? 1 : $stateParams.page
            };
            return params;
          }
        }
      })
      .state('search.results', {
        url: '',
        templateUrl: 'views/search/searchresultsinfo.html',
        resolve: {
          resultsFound: function(searchParams, SearchService) {
            return SearchService.search(searchParams);
          }
        },
        controller: 'SearchResultsInfoCtrl as ctrlSearchResultsInfo'
      })
      .state('search.results.type', {
        url: '/results/:resourceType',
        templateUrl: function($stateParams) {
          return 'views/search/searchresults.' + $stateParams.resourceType + '.html';
        },
        controller: 'SearchResultsCtrl as ctrlSearchResults'
      })
  });
