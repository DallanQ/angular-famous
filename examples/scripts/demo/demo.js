define([
  'angular',
  'angularFamous',
  'ui.router'
], function (angular) {
  'use strict';

  return angular.module('angularFamousExamples.demo', [
    'angularFamous',
    'ui.router'
  ])
    .config(function ($stateProvider) {
      $stateProvider.state('demo', {
        url: '/demo',
        controller: 'DemoController',
        templateUrl: 'scripts/demo/demo.tpl.html'
      });
    })

    .controller('DemoController', function($scope, $interval, FamousCoreEventHandler) {
      var strings = [
        'famo.us',
        'angular',
        'javascript',
        'web',
        'wow',
        'such',
        'great'
      ];

      var ELEMENTS = 150;
      var START_HUE = 320;
      var HUE_RANGE = 100;
      var SATURATION = 50;
      var LIGHTNESS = 50;

      function getHSL(index) {
        var hue = (START_HUE + (HUE_RANGE * (index / ELEMENTS)));
        return 'hsl(' +
          hue + ',' +
          SATURATION + '%,'+
          LIGHTNESS + '%)';
      }

      function sampleStrings() {
        return strings[Math.floor(Math.random() * strings.length)];
      }

      $scope.surfs = [];
      for (var i = 0; i < ELEMENTS; i++) {
        $scope.surfs.push({
          content: sampleStrings(),
          bgColor: getHSL(i)
        });
      }

      $interval(function() {
        for (var i = 0; i < ELEMENTS; i++) {
          $scope.surfs[i].content = sampleStrings();
        }
      }, 500);

      var eventHandler = new FamousCoreEventHandler();

      $scope.$on('afAdded', function(event, child) {
        event.stopPropagation();
        if (!!child.surface) {
          child.surface.pipe(eventHandler);
        }
        else if (!!child.view) { // scrollView
          eventHandler.pipe(child.view);
        }
      });

      $scope.$on('afRemoved', function(event, child) {
        event.stopPropagation();
        if (!!child.surface) {
          child.surface.unpipe(eventHandler);
        }
        else if (!!child.view) {
          eventHandler.unpipe(child.view);
        }
      });

    });
});
