define([
  'angular',
  'angularFamous'
], function (angular) {
  'use strict';

  // app level module
  var app = angular.module('angularFamousExample', ['angularFamous']);

  app.controller('TestController', function($scope, $interval) {
    var secs = 0;
    $interval(function() {
      $scope.text = secs++;
    }, 1000);
  });

  app.directive('myPositionUpdater', function(FamousInputsMouseSync, FamousCoreTransform) {
    return {
      controller: function($scope) {
        var position = [0, 0];
        var sync = new FamousInputsMouseSync();
        sync.on('update', function (data) {
          position[0] += data.delta[0];
          position[1] += data.delta[1];
        });

        $scope.$on('afAdded', function(event, child) {
          event.stopPropagation();
          child.surface.pipe(sync);
        });

        $scope.afModifier.transformFrom(function() {
          return FamousCoreTransform.translate(position[0], position[1], 0);
        });

      }
    };
  });

  return app;
});