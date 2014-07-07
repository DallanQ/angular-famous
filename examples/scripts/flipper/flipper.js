define([
  'angular',
  'angularFamous',
  'ui.router'
], function (angular) {
  'use strict';

  return angular.module('angularFamousExamples.flipper', [
    'angularFamous',
    'ui.router'
  ])

    .config(function ($stateProvider) {
      $stateProvider.state('flipper', {
        url: '/flipper',
        controller: 'FlipperController',
        templateUrl: 'scripts/flipper/flipper.tpl.html'
      });
    })

    .controller('FlipperController', function($scope, FamousCoreEventHandler) {
      var flipper;

      $scope.$on('afAdded', function(event, child) {
        event.stopPropagation();
        if (!!child.view) {
          flipper = child.view;
        }
      });

      $scope.flip = function() {
        flipper.flip();
      };

    });
});