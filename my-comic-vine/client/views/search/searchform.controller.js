'use strict';

angular.module('comicVine')
  .controller('SearchFormCtrl', function ($state, searchParams) {

    var ctrlSearchForm = this;

    angular.extend(ctrlSearchForm, {

      name: 'SearchFormCtrl',

      params: {
        searchTerm: searchParams.query,
        selection: searchParams.resources ? searchParams.resources.split(',') : [],
        pageSize: parseInt(searchParams.limit, 10) || 50
      },      

      mediaTypes: ['publisher', 'volume', 'issue'],
      pageSizes: [25, 50, 75, 100],
      
      toggleSelection: function (mediaTypeName) {
        var idx = ctrlSearchForm.params.selection.indexOf(mediaTypeName);

        // is currently selected
        if (idx > -1) {
          ctrlSearchForm.params.selection.splice(idx, 1);
        }

        // is newly selected
        else {
          ctrlSearchForm.params.selection.push(mediaTypeName);
        }
      },

      search: function(formParams) {
        var params = {
          query: formParams.searchTerm,
          resources: formParams.selection.join(','),
          limit: formParams.pageSize
        };

        // determine correct search results template to redirect to
        params.resourceType = 'any';
        if (formParams.selection.length === 1) {
          params.resourceType = formParams.selection[0];
        }

        $state.go('search.results.type', params);
      }

    });

  });
