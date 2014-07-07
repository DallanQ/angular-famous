define(['angular', 'famousModule'], function(angular) {
  'use strict';

  return angular.module('angularFamous.afContext', ['famous'])
    .directive('afContext', function(FamousCoreEngine) {
      return {
        restrict: 'EA',
        priority: 1,
        scope: true,
        controller: function($scope, $element) {
          // add an afNode for the context to the scope
          $scope.afNode = {};
          // break the rules a bit and access element here so we can create the context before the modifier/surface controllers run
          $scope.afNode.context = FamousCoreEngine.createContext($element[0]);

          // add and remove children
          $scope.$on('afAdd', function(event, child) {
            event.stopPropagation();
            $scope.afNode.context.add(child.renderNode);
            console.log('afAdd to context', child);
            $scope.$emit('afAdded', child);
          });
          $scope.$on('afRemove', function(event, child) {
            event.stopPropagation();
            // TODO doesn't appear to be a way to remove children from a context
            $scope.$emit('afRemoved', child);
          });

          // clean up
          $scope.$on('$destroy', function () {
            // TODO doesn't appear to be a way to remove a context
            $scope.afNode.context.update = angular.noop;
          });
        }
      };
    });
});