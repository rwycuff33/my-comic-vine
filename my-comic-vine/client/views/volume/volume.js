'use strict';

angular.module('comicVine')
  .config(function ($stateProvider) {
    $stateProvider
      .state('volumelist', {
        url: '/volumes',
        templateUrl: 'views/volume/volumelist.html',
        controller: 'VolumeListCtrl as ctrlVolumeList',
        resolve: {
          volumes: function(VolumeService) {
            return VolumeService.search();
          }
        }
      })
      .state('savedvolumes', {
        url: '/volumes/saved',
        templateUrl: 'views/volume/volumelist.html',
        controller: 'VolumeListCtrl as ctrlVolumeList',
        resolve: {
          volumes: function(VolumeService) {
            return VolumeService.getSaved();
          }
        }
      })
      .state('volume', {
        url: '/volume/:id',
        templateUrl: 'views/volume/volume.html',
        controller: 'VolumeCtrl as ctrlVolume',
        resolve: {
          volume: function($stateParams, VolumeService) {
            return VolumeService.getOne($stateParams.id);
          },
          issues: function($stateParams, IssueService) {
            return IssueService.getIssuesForVolume($stateParams.id);
          }
        }
      });
  });
