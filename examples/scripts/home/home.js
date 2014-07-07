define([
  'angular',
  'angularFamous',
  'ui.router'
], function (angular) {
  'use strict';

  return angular.module('angularFamousExamples.home', [
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

  .controller('HomeController', function($scope, FamousCoreTransform) {
    $scope.menuItems = [
      { url: '#/flipper', label: 'Flipper'},
      { url: '#/flexible-layout', label: 'Flexible Layout'},
      { url: '#/header-footer-layout', label: 'Header Footer Layout'},
      { url: '#/moveable', label: 'Moveable'}
    ];

  });

});