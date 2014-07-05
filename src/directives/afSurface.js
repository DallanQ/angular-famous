define(['angular', 'famousModule', 'services/afUtils'], function(angular) {
  'use strict';

  return angular.module('angularFamous.afSurface', ['famous', 'angularFamous.afUtils'])
    .directive('afSurface', function($timeout, FamousCoreSurface, FamousCoreRenderNode, afUtils) {
      return {
        restrict: 'EA',
        priority: 1,
        scope: true,
        controller: function($scope, $element, $attrs) {
          console.log('surface controller scope', $scope);

          // add a surface to the scope
          $scope.afSurface = new FamousCoreSurface({
            // TODO parse the rest of the attributes
            size: [
              afUtils.parseAttr($attrs['afSizeX']),
              afUtils.parseAttr($attrs['afSizeY'])
            ],
            properties: afUtils.removeEmptyProperties({
              background: $attrs['afBackground']
            })
          });
          $scope.afRenderNode = new FamousCoreRenderNode().add($scope.afSurface);

          // TODO watch for changes in size and properties

          // clean up
          $scope.$on('$destroy', function () {
            // TODO not sure how to remove a surface from its parent
            $scope.afSurface.setContent('');
            $scope.$parent.$emit('afRemove', {surface: $scope.afSurface, renderNode: $scope.afRenderNode});
          });
        },
        link: function(scope, element) {
          console.log('surface link scope', scope);

          // set this element as the surface content
          // TODO does this work even if we have an ng-repeat on the surface?
          scope.afSurface.setContent(element[0]);

          // add to render tree after all normal-priority controller & link functions on this scope have executed
          scope.$parent.$emit('afAdd', {surface: scope.afSurface, renderNode: scope.afRenderNode});
        }
      };
    });
});