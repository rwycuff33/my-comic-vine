'use strict';

angular.module('comicVine')
  .config(function ($stateProvider) {
    $stateProvider
      .state('issue', {
        url: '/issue/:issueId',
        templateUrl: 'views/issue/issue.html',
        controller: 'IssueCtrl as ctrlIssue',
        resolve: {
          issue: function($stateParams, IssueService) {
            return IssueService.getOne($stateParams.issueId);
          }
        }
      });
  });
