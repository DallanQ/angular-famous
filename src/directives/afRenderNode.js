define(['angular', 'famousModule', 'services/afUtils'], function(angular) {
  'use strict';

  return angular.module('angularFamous.afRenderNode', ['famous', 'angularFamous.afUtils'])
    .directive('afRenderNode', function(FamousCoreRenderNode, afUtils) {
      return {
        restrict: 'EA',
        transclude: true,
        priority: 1,
        scope: true,
        controller: function($scope, $element, $attrs) {
          // add an afNode for a renderNode to the scope
          $scope.afNode = {};
          if (!$attrs.afNode) {
            $scope.afNode.renderNode = new FamousCoreRenderNode();
          }
          else {
            var node = $scope.$eval($attrs.afNode);
            if (node instanceof FamousCoreRenderNode) {
              $scope.afNode.renderNode = node;
            }
            else {
              $scope.afNode.renderNode = new FamousCoreRenderNode(node);
            }
          }

          // add and remove children
          $scope.$on('afAdd', function(event, child) {
            event.stopPropagation();
            $scope.afNode.renderNode.add(child.renderNode);
            console.log('afAdd to renderNode', $scope.afNode, child);
            $scope.$emit('afAdded', child);
          });
          $scope.$on('afRemove', function(event, child) {
            event.stopPropagation();
            // TODO doesn't appear to be a way to remove children from a renderNode
            $scope.$emit('afRemoved', child);
          });

          // clean up
          $scope.$on('$destroy', function () {
            // TODO doesn't appear to be a way to remove a renderNode
            $scope.$parent.$emit('afRemove', $scope.afNode);
          });
        },
        compile: function(element, attrs) {
          // remember which attributes have been interpolated
          var interpolatedAttrs = afUtils.getInterpolatedAttrs(attrs);

          return function(scope, element, attrs, controller, transclude) {
            // transclude children as children of the parent and remove this element
            transclude(scope, function(clone) {
              element.parent().append(clone);
              element.remove();
            });

            // set label
            scope.afNode.label = attrs.afRenderNode;
            if (interpolatedAttrs['afRenderNode']) {
              attrs.$observe('afRenderNode', function(value) {
                scope.afNode.label = value;
              });
            }

            // add to render tree after all normal-priority controller & link functions on this scope have executed
            scope.$parent.$emit('afAdd', scope.afNode);
          };
        }
      };
    });
});