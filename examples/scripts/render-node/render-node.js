define([
  'angular',
  'angularFamous',
  'ui.router'
], function (angular) {
  'use strict';

  return angular.module('angularFamousExamples.render-node', [
    'angularFamous',
    'ui.router'
  ])
    .config(function ($stateProvider) {
      $stateProvider.state('render-node', {
        url: '/render-node',
        controller: 'RenderNodeController',
        templateUrl: 'scripts/render-node/render-node.tpl.html'
      });
    })

    .controller('RenderNodeController', function($scope, FamousCoreView, FamousCoreSurface, FamousCoreModifier, FamousCoreTransform) {
      $scope.masterView = new FamousCoreView();
      var surface = new FamousCoreSurface({properties: {backgroundColor: 'red'}});
      surface.setContent('I\'m a surface');
      var modifier = new FamousCoreModifier();
      var width = 320;
      modifier.transformFrom(function() {
        return FamousCoreTransform.translate(Math.random() * width, 0, 1);
      });

      $scope.masterView.add(modifier).add(surface);

    });
});
