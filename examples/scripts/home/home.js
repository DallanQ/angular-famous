define([
  'angular',
  'angularFamous',
  'ui.router'
], function (angular) {
  'use strict';

  return angular.module('angularFamousExample.home', [
    'angularFamous',
    'ui.router'
  ])

  .config(function ($stateProvider) {
    $stateProvider.state('home', {
      url: '/',
      controller: 'HomeController',
      templateUrl: 'scripts/home/home.tpl.html'
    });
  })

  .controller('HomeController', function($scope, $timeout, FamousCoreTransform) {
    $scope.menuItems = [
      { url: '#/moveable', label: 'Moveable'}
    ];

  });

});