define(['angular', 'famousModule'], function(angular) {
  'use strict';

  return angular.module('angularFamous.afClick', ['famous'])
    .directive('afClick', function() {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var source = scope.afNode.surface || scope.afNode.view._eventInput;
          source.on('click', function() {
            scope.$apply(function() {
              scope.$eval(attrs.afClick);
            });
          });
        }
      };
    });
});