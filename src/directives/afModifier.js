define(['angular', 'famousModule', 'services/afUtils'], function(angular) {
  'use strict';

  return angular.module('angularFamous.afModifier', ['famous', 'angularFamous.afUtils'])
    .directive('afModifier', function($timeout, FamousCoreModifier, FamousCoreRenderNode, afUtils) {
      return {
        restrict: 'EA',
        transclude: true,
        priority: 1,
        scope: true,
        link: function (scope, element, attrs, controller, transclude) {
          // add a modifier to the scope
          // TODO parse the rest of the attributes
          var props = {};
          if (!!attrs['afOriginX'] || !!attrs['afOriginY']) {
            props.origin = function() {
              return [afUtils.parseAttr(attrs['afOriginX']), afUtils.parseAttr(attrs['afOriginY'])];
            };
          }
          scope.afModifier = new FamousCoreModifier(props);
          scope.afRenderNode = new FamousCoreRenderNode().add(scope.afModifier);

          // transclude children as children of this scope and remove this dom element
          // TODO can I do this even if we have an ng-repeat on the modifier?
          transclude(scope, function(clone) {
            element.parent().append(clone);
            element.remove();
          });

          // clean up
          scope.$on('$destroy', function () {
            // TODO doesn't appear to be a way to remove a modifier
            scope.afModifier.setOpacity(0);
            scope.$parent.$emit('afRemove', {modifier: scope.afModifier, renderNode: scope.afRenderNode});
          });

          // add and remove children
          scope.$on('afAdd', function(event, child) {
            event.stopPropagation();
            scope.afRenderNode.add(child.renderNode);
            scope.$emit('afAdded', child);
          });

          scope.$on('afRemove', function(event, child) {
            event.stopPropagation();
            // TODO doesn't appear to be a way to remove children from a modifier
            scope.$emit('afRemoved', child);
          });

          $timeout(function() {
            scope.$parent.$emit('afAdd', {modifier: scope.afModifier, renderNode: scope.afRenderNode});
          });
        }
      };
    });
});