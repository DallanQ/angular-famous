define([
  'angular',
  'angularFamous',
  'ui.router'
], function (angular) {
  'use strict';

  return angular.module('angularFamousExamples.flexible-layout', [
    'angularFamous',
    'ui.router'
  ])

    .config(function ($stateProvider) {
      $stateProvider.state('flexible-layout', {
        url: '/flexible-layout',
        controller: 'FlexibleLayoutController',
        templateUrl: 'scripts/flexible-layout/flexible-layout.tpl.html'
      });
    })

    .controller('FlexibleLayoutController', function($scope) {

    });

});