'use strict';

angular.module('comicVine')
  .controller('IssueCtrl', function (issue, IssueService) {

    var ctrlIssue = this;

    angular.extend(ctrlIssue, {

      name: 'IssueCtrl',

      issue: issue,

      saveIssue: function(issue) {
        IssueService.save(issue).then(function(savedIssue) {
          ctrlIssue.editComments = false;
          issue._id = savedIssue._id;
        });
      }

    });

  });
