define([
  'angular',
  'angularFamous',
  'ui.router',
  'examples/home/home',
  'examples/flipper/flipper',
  'examples/flexible-layout/flexible-layout',
  'examples/header-footer-layout/header-footer-layout',
  'examples/moveable/moveable'
], function (angular) {
  'use strict';

  // app level module
  return angular.module('angularFamousExamples', [
    'angularFamous',
    'ui.router',
    'angularFamousExamples.home',
    'angularFamousExamples.flipper',
    'angularFamousExamples.flexible-layout',
    'angularFamousExamples.header-footer-layout',
    'angularFamousExamples.moveable'
  ])

  .config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  });

});