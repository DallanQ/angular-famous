define(['angular', 'famousModule'], function(angular) {
  'use strict';

  return angular.module('angularFamous.afContext', ['famous'])
    .directive('afContext', function($rootScope, FamousCoreEngine) {
      return {
        restrict: 'EA',
        priority: 1,
        scope: true,
        link: function (scope, element) {
          // add a context to the scope
          scope.afContext = FamousCoreEngine.createContext(element[0]);

          // clean up
          scope.$on('$destroy', function () {
            // TODO doesn't appear to be a way to remove a context
            scope.afContext.update = angular.noop;
          });

          // add and remove children
          scope.$on('afAdd', function(event, child) {
            event.stopPropagation();
            scope.afContext.add(child.renderNode);
            scope.$emit('afAdded', child);
          });

          scope.$on('afRemove', function(event, child) {
            event.stopPropagation();
            // TODO doesn't appear to be a way to remove children from a context
            scope.$emit('afRemoved', child);
          });
        }
      };
    });
});