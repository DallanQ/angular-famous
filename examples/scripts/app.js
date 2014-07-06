define([
  'angular',
  'angularFamous',
  'ui.router',
  'examples/home/home',
  'examples/moveable/moveable'
], function (angular) {
  'use strict';

  // app level module
  return angular.module('angularFamousExample', [
    'angularFamous',
    'ui.router',
    'angularFamousExample.home',
    'angularFamousExample.moveable'
  ])

  .config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  });

});