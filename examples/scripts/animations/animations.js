define([
  'angular',
  'angularFamous',
  'ui.router'
], function (angular) {
  'use strict';

  return angular.module('angularFamousExamples.animations', [
    'angularFamous',
    'ui.router'
  ])
    .config(function ($stateProvider) {
      $stateProvider.state('animations', {
        url: '/animations',
        controller: 'AnimationsController',
        templateUrl: 'scripts/animations/animations.tpl.html'
      });
    })

    .controller('AnimationsController', function($scope, $interval, FamousCoreTransform, FamousTransitionsEasing,
                                                 FamousTransitionsTransitionable) {
      var _width = 320;
      var _height = 568;
      var _r = 75;
      var sizes = $scope.sizes = {
        margins: {
          top: (_height - 4 * _r) / 2,//134,
          right: (_width - 4 * _r) / 2,
          bottom: (_height - 4 * _r) / 2,
          left: (_width - 4 * _r) / 2
        },
        width: _width, //320
        height: _height, //568
        triangle: _r,
        scrollText: [undefined, 20]
      };

      $scope.twoWayTest = 'Two-way data binding';

      $scope.positions = {
        scrollText: [
          0,
          20,
          10
        ],
        topTriangle: [
            sizes.margins.left + sizes.triangle,
          sizes.margins.top,
          500
        ],
        topTriangleInner: [
            sizes.margins.left + sizes.triangle,
            sizes.margins.top + sizes.triangle,
          500
        ],
        rightTriangle: [
            sizes.margins.left + 3 * sizes.triangle,
            sizes.margins.top + sizes.triangle,
          500
        ],
        rightTriangleInner: [
            sizes.margins.left + 2 * sizes.triangle,
            sizes.margins.top + sizes.triangle,
          500
        ],
        bottomTriangle: [
            sizes.margins.left + sizes.triangle,
            sizes.margins.top + 3 * sizes.triangle,
          500
        ],
        bottomTriangleInner: [
            sizes.margins.left + sizes.triangle,
            sizes.margins.top + 2 * sizes.triangle,
          500
        ],
        leftTriangle: [
          sizes.margins.left,
            sizes.margins.top + sizes.triangle,
          500
        ],
        leftTriangleInner: [
            sizes.margins.left + sizes.triangle,
            sizes.margins.top + sizes.triangle,
          500
        ],
        centerSquare: [
            sizes.margins.left + sizes.triangle - 0.5,
            sizes.margins.top + sizes.triangle - 0.5,
          1
        ],
        centerContent: [
          sizes.margins.left,
            sizes.margins.top + 2 * sizes.triangle,
          1000
        ]
      };

      var _contents = [
        'One-way data binding',
        'Data binding, one way'
      ];

      var _contentIndex = 0;
      var _content = _contents[_contentIndex];
      $scope.getContent = function(){
        return _content;
      };

      $interval(function() {
        _content = _contents[(_contentIndex++)%_contents.length];
      }, 1000);

      //
      // animate everything
      //

      var tran = new FamousTransitionsTransitionable(0);

      tran.set(1, {duration: 1000});

      function getCurrentValue(curve, startValue, endValue, timelineLowerBounds, timelineUpperBounds) {
        var currTran = tran.get();

        var easedTran;
        if (currTran <= timelineLowerBounds) {
          easedTran = 0;
        }
        else if (currTran >= timelineUpperBounds) {
          easedTran = 1;
        }
        else {
          easedTran = FamousTransitionsEasing[curve]((currTran - timelineLowerBounds) / (timelineUpperBounds - timelineLowerBounds));
        }

        var currValue;
        if (startValue instanceof Array) {
          currValue = [];
          for (var i = 0, len = startValue.length; i < len; i++) {
            currValue.push(startValue[i] + (endValue[i] - startValue[i]) * easedTran);
          }
        }
        else {
          currValue = startValue + (endValue - startValue) * easedTran;
        }

        return currValue;
      }

      function getTransform(field, currentValue) {
        if (currentValue instanceof Array) {
          return FamousCoreTransform[field].apply(FamousCoreTransform, currentValue);
        }
        else {
          return FamousCoreTransform[field](currentValue);
        }
      }

      var transforms = {
        testTransform: new FamousTransitionsTransitionable(FamousCoreTransform.translate.apply(this, $scope.positions.centerSquare)),
        wholeThing: function() {
          return FamousCoreTransform.multiply(
            getTransform('scale', getCurrentValue('outQuad', [0.6, 0.6, 0.6], [1, 1, 1], 0.1, 0.5)),
            getTransform('rotateZ', getCurrentValue('outElastic', 0, 0.785, 0, 0.8))
          );
        },
        translateRotate: function() {
          return FamousCoreTransform.multiply(
            FamousCoreTransform.translate.apply(FamousCoreTransform, $scope.positions.centerContent),
            FamousCoreTransform.rotateZ(-0.785)
          );
        },
        topMod: function() {
          return getTransform('rotateX', getCurrentValue('inQuad', 3.1415, 0, 0, 0.25));
        },
        topModInner: function() {
          return getTransform('rotateX', getCurrentValue('inQuad', 0, 3.1415, 0, 0.25));
        },
        rightMod: function() {
          return getTransform('rotateY', getCurrentValue('inQuad', 3.1415, 0, 0.1, 0.35));
        },
        rightModInner: function() {
          return getTransform('rotateY', getCurrentValue('inQuad', 0, 3.1415, 0.1, 0.35));
        },
        bottomMod: function() {
          return getTransform('rotateX', getCurrentValue('inQuad', 3.1415, 0, 0.2, 0.45));
        },
        bottomModInner: function() {
          return getTransform('rotateX', getCurrentValue('inQuad', 0, 3.1415, 0.2, 0.45));
        },
        leftMod: function() {
          return getTransform('rotateY', getCurrentValue('inQuad', 3.1415, 0, 0.3, 0.55));
        },
        leftModInner: function() {
          return getTransform('rotateY', getCurrentValue('inQuad', 0, 3.1415, 0.3, 0.55));
        }
      };

      $scope.$on('afAdded', function(event, child) {
        event.stopPropagation();
        if (!!child.label && !!transforms[child.label]) {
          child.modifier.setTransform(transforms[child.label]);
        }
        else if (child.label === 'contentMod') {
          child.modifier.setOpacity(function() {
            return getCurrentValue('inQuad', 0, 1, 0.5, 1);
          });
        }
      });

    });
});