'use strict';

angular.module('comicVine')
  .controller('VolumeCtrl', function ($scope, $state, volume, issues) {

    var ctrlVolume = this;

    angular.extend(ctrlVolume, {

      name: 'VolumeCtrl',

      volume: volume,
      issues: issues

    });

    $scope.$on('volumeDeleted', function(event, volume) {
      // redirect to same page
      $state.reload();
    });

  });
