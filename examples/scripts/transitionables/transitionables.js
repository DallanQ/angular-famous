define([
  'angular',
  'angularFamous',
  'ui.router'
], function (angular) {
  'use strict';

  return angular.module('angularFamousExamples.transitionables', [
    'angularFamous',
    'ui.router'
  ])
    .config(function ($stateProvider) {
      $stateProvider.state('transitionables', {
        url: '/transitionables',
        controller: 'TransitionablesController',
        templateUrl: 'scripts/transitionables/transitionables.tpl.html'
      });
    })

    .controller('TransitionablesController', function($scope, FamousTransitionsTransitionable) {
      var number = 6;
      var offset = 100;
      $scope.text = 'TEXT';
      $scope.boxes = [];

      for (var i = 0; i < number; i++) {
        var trans = new FamousTransitionsTransitionable([offset, 50 * i, 1]);
        $scope.boxes.push({bgColor: '#333', color: '#ccc', trans: trans, index: i});
      }

      $scope.click = function (box) {
        box.trans.set([offset - 100, 50 * box.index, 1], {duration: 1000, curve: 'easeOut'});
      };

    });
});
