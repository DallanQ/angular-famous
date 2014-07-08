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

    .controller('HomeController', function($scope) {
      $scope.menuItems = [
        { url: '#/demo', label: 'Demo'},
        { url: '#/flexible-layout', label: 'Flexible Layout'},
        { url: '#/flipper', label: 'Flipper'},
        { url: '#/header-footer-layout', label: 'Header Footer Layout'},
        { url: '#/render-node', label: 'Render Node'},
        { url: '#/transitionables', label: 'Transitionables'},
        { url: '#/moveable', label: 'Moveable'}
      ];

    });
});