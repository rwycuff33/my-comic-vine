'use strict';

angular.module('comicVine')
  .controller('VolumeListCtrl', function ($scope, volumes, VolumeService) {

    var ctrlVolumeList = this;

    angular.extend(ctrlVolumeList, {

      name: 'VolumeListCtrl',

      /**
       * List of volumes
       */
      volumes: volumes,

      searchVolumes: function(term) {
        var params = {
          name: term
        };
        VolumeService.search(term).then(function(volumes) {
          ctrlVolumeList.volumes = volumes;
        });
      }

    });

    $scope.$on('volumeDeleted', function(event, volume) {
      var idx = ctrlVolumeList.volumes.indexOf(volume);
      if (idx > -1) {
        ctrlVolumeList.volumes.splice(idx, 1);
      } else {
        // loop through volumes and remove it
      }
    });

  });
