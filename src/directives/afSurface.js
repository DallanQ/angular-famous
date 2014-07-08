define(['angular', 'famousModule', 'services/afUtils'], function(angular) {
  'use strict';

  return angular.module('angularFamous.afSurface', ['famous', 'angularFamous.afUtils'])
    .directive('afSurface', function(FamousCoreSurface, FamousCoreRenderNode, afUtils) {
      return {
        restrict: 'EA',
        priority: 1,
        scope: true,
        controller: function($scope) {
          // add an afNode for the surface to the scope
          $scope.afNode = {};
          $scope.afNode.surface = new FamousCoreSurface();
          $scope.afNode.renderNode = new FamousCoreRenderNode($scope.afNode.surface);

          // clean up
          $scope.$on('$destroy', function () {
            // TODO not sure how to remove a surface from its parent
            $scope.afNode.surface.setContent('');
            $scope.$parent.$emit('afRemove', $scope.afNode);
          });
        },
        link: function(scope, element, attrs) {
          // TODO add other properties
          var properties = {
            afSize: {
              getter: function(scope, attrs) {
                return scope.$eval(attrs.afSize);
              },
              setter: function(value) {
                this.setSize(value);
              }
            },
            afProperties: {
              getter: function(scope, attrs) {
                return scope.$eval(attrs.afProperties);
              },
              setter: function(value) {
                this.setProperties(value);
              }
            },
            afClass: {
              getter: function(scope, attrs) {
                return scope.$eval(attrs.afClass);
              },
              setter: function(value) {
                for (var className in value) {
                  if (value.hasOwnProperty(className)) {
                    if (value[className]) {
                      this.addClass(className);
                    }
                    else {
                      this.removeClass(className);
                    }
                  }
                }
              }
            }
          };

          // set this element as the surface content
          scope.afNode.surface.setContent(element[0]);

          // move classes onto surface
          if (!!attrs['class']) {
            var classes = attrs['class'].split(' ');
            scope.afNode.surface.setClasses(classes);
            element.removeClass(attrs['class']);
          }

          // set properties
          for (var propName in properties) {
            if (properties.hasOwnProperty(propName)) {
              afUtils.watchProperty(scope.afNode.surface, scope, attrs, propName, properties[propName]);
            }
          }

          // set label
          scope.afNode.label = attrs.afSurface;
          attrs.$observe('afSurface', function(value) {
            scope.afNode.label = value;
          });

          // add to render tree after all normal-priority controller & link functions on this scope have executed
          scope.$parent.$emit('afAdd', scope.afNode);

        }
      };
    });
});