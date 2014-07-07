define([
  'angular',
  'angularFamous',
  'ui.router'
], function (angular) {
  'use strict';

  return angular.module('angularFamousExamples.moveable', [
    'angularFamous',
    'ui.router'
  ])

    .config(function ($stateProvider) {
      $stateProvider.state('moveable', {
        url: '/moveable',
        controller: 'MoveableController',
        templateUrl: 'scripts/moveable/moveable.tpl.html'
      });
    })

    .controller('MoveableController', function($scope, $interval, FamousInputsMouseSync, FamousCoreTransform) {
      var secs = 0;
      $interval(function() {
        $scope.text = secs++;
      }, 1000);

      var position = [0, 0];
      var sync = new FamousInputsMouseSync();
      sync.on('update', function (data) {
        position[0] += data.delta[0];
        position[1] += data.delta[1];
      });

      $scope.$on('afAdded', function(event, child) {
        event.stopPropagation();

        if (child.label === 'mySurface') {
          console.log('child.surface.pipe');
          child.surface.pipe(sync);
        }
        else if (child.label === 'myPositionModifier') {
          child.modifier.transformFrom(function() {
            return FamousCoreTransform.translate(position[0], position[1], 0);
          });
        }
      });
    });

});