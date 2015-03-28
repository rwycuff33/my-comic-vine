'use strict';

angular.module('comicVine')
  .directive('volumeActions', function (VolumeService) {
    return {
      restrict: 'E',
      templateUrl: 'directives/volume-actions/volumeactions.html',
      scope: {
        volume: '='
      },
      controller: function($scope) {
        var volumeActions = this;

        volumeActions.statuses = ['Reading', 'Want To Read', 'Finished', 'Disliked'];

        volumeActions.updateVolume = function(volume) {
          VolumeService.save(volume).then(function(savedVolume) {
            volume._id = savedVolume._id;
          });
        };

        volumeActions.deleteVolume = function(volume) {
          VolumeService.delete(volume._id).then(function() {
            delete volume._id;
            delete volume.status;
            $scope.$emit('volumeDeleted', volume);
          });
        };
      },
      controllerAs: 'volumeActions'
    };
  });
