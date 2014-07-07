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
      $scope.$on('afAdded', function(event, child) {
        event.stopPropagation();
        if (child.label === 'flipper') {
          // flip on click
          var eventHandler = new FamousCoreEventHandler();
          child.view.frontNode.get().pipe(eventHandler);
          child.view.backNode.get().pipe(eventHandler);
          eventHandler.on('click', function() {
            child.view.flip();
          });
        }
      });

    });

});