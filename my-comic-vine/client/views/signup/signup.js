'use strict';

angular.module('comicVine')
  .config(function ($stateProvider) {
    $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup/signup.html',
        controller: 'SignupCtrl as vm'
      });
  });
