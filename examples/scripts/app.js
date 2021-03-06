define([
  'angular',
  'angularFamous',
  'ui.router',
  'examples/animations/animations',
  'examples/demo/demo',
  'examples/flipper/flipper',
  'examples/flexible-layout/flexible-layout',
  'examples/header-footer-layout/header-footer-layout',
  'examples/home/home',
  'examples/moveable/moveable',
  'examples/ng-class/ng-class',
  'examples/render-node/render-node',
  'examples/transitionables/transitionables'
], function (angular) {
  'use strict';

  // app level module
  return angular.module('angularFamousExamples', [
    'angularFamous',
    'ui.router',
    'angularFamousExamples.animations',
    'angularFamousExamples.demo',
    'angularFamousExamples.flipper',
    'angularFamousExamples.flexible-layout',
    'angularFamousExamples.header-footer-layout',
    'angularFamousExamples.home',
    'angularFamousExamples.moveable',
    'angularFamousExamples.ng-class',
    'angularFamousExamples.render-node',
    'angularFamousExamples.transitionables'
  ])

  .config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  });

});