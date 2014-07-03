define(['angular', 'famousModule', 'services/afUtils'], function(angular) {
  'use strict';

  return angular.module('angularFamous.afSurface', ['famous', 'angularFamous.afUtils'])
    .directive('afSurface', function($timeout, FamousCoreSurface, FamousCoreRenderNode, afUtils) {
      return {
        restrict: 'EA',
        priority: 1,
        scope: true,
        link: function (scope, element, attrs) {
          // add a surface to the scope
          scope.afSurface = new FamousCoreSurface({
            // TODO parse the rest of the attributes
            size: [
              afUtils.parseAttr(attrs['afSizeX']),
              afUtils.parseAttr(attrs['afSizeY'])
            ],
            properties: afUtils.removeEmptyProperties({
              background: attrs['afBackground']
            })
          });
          scope.afRenderNode = new FamousCoreRenderNode().add(scope.afSurface);

          // set this element as the surface content
          // TODO does this work even if we have an ng-repeat on the surface?
          scope.afSurface.setContent(element[0]);

          // TODO watch for changes in size and properties

          // clean up
          scope.$on('$destroy', function () {
            // TODO not sure how to remove a surface from its parent
            scope.afSurface.setContent(document.createDocumentFragment());
            scope.$parent.$emit('afRemove', {surface: scope.afSurface, renderNode: scope.afRenderNode});
          });

          $timeout(function() {
            scope.$parent.$emit('afAdd', {surface: scope.afSurface, renderNode: scope.afRenderNode});
          });

        }
      };
    });
});