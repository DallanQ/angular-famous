define(['angular', 'famousModule', 'services/afUtils'], function(angular) {
  'use strict';

  return angular.module('angularFamous.afModifier', ['famous', 'angularFamous.afUtils'])
    .directive('afModifier', function($timeout, FamousCoreModifier, FamousCoreRenderNode, afUtils) {
      return {
        restrict: 'EA',
        transclude: true,
        priority: 1,
        scope: true,
        controller: function($scope, $element, $attrs) {
          console.log('modifier controller scope', $scope);

          // add a modifier to the scope
          // TODO parse the rest of the attributes
          var props = {};
          if (!!$attrs['afOriginX'] || !!$attrs['afOriginY']) {
            props.origin = function() {
              return [afUtils.parseAttr($attrs['afOriginX']), afUtils.parseAttr($attrs['afOriginY'])];
            };
          }
          $scope.afModifier = new FamousCoreModifier(props);
          $scope.afRenderNode = new FamousCoreRenderNode().add($scope.afModifier);

          // TODO watch for changes in size and properties

          // add and remove children
          $scope.$on('afAdd', function(event, child) {
            event.stopPropagation();
            $scope.afRenderNode.add(child.renderNode);
            $scope.$emit('afAdded', child);
          });
          $scope.$on('afRemove', function(event, child) {
            event.stopPropagation();
            // TODO doesn't appear to be a way to remove children from a modifier
            $scope.$emit('afRemoved', child);
          });

          // clean up
          $scope.$on('$destroy', function () {
            // TODO doesn't appear to be a way to remove a modifier
            $scope.afModifier.setOpacity(0);
            $scope.$parent.$emit('afRemove', {modifier: $scope.afModifier, renderNode: $scope.afRenderNode});
          });
        },
        link: function(scope, element, attrs, controller, transclude) {
          console.log('modifier link scope', scope);

          // transclude children as children of the parent and remove this element
          // TODO can I do this even if we have an ng-repeat on the modifier?
          transclude(scope, function(clone) {
            element.parent().append(clone);
            element.remove();
          });

          // add to render tree after all normal-priority controller & link functions on this scope have executed
          scope.$parent.$emit('afAdd', {modifier: scope.afModifier, renderNode: scope.afRenderNode});
        }
      };
    });
});