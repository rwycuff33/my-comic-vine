'use strict';

angular.module('comicVine')
  .directive('issueActions', function (IssueService) {
    return {
      restrict: 'E',
      scope: {
        issue: '=issue'
      },
      templateUrl: 'directives/issue-actions/issueactions.html',
      controller: function() {
        
        this.updateIssue = function(issue) {
          IssueService.save(issue).then(function(savedIssue) {
            issue._id = savedIssue._id;
          });
        };

      },
      controllerAs: 'issueActions'
    };
  });
