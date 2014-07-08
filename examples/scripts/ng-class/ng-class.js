define([
  'angular',
  'angularFamous',
  'ui.router'
], function (angular) {
  'use strict';

  return angular.module('angularFamousExamples.ng-class', [
    'angularFamous',
    'ui.router'
  ])
    .config(function ($stateProvider) {
      $stateProvider.state('ng-class', {
        url: '/ng-class',
        controller: 'NgClassController',
        templateUrl: 'scripts/ng-class/ng-class.tpl.html'
      });
    })

    .controller('NgClassController', function($scope) {
      var counter = 1;

      $scope.classed = function(i){
        //noinspection JSHint
        return !!((counter % 8) & i);
      };

      $scope.shift = function(){
        counter++;
        console.log('shifting counter', counter);
      };

    });
});