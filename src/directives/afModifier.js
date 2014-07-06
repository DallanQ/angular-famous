define(['angular', 'famousModule', 'services/afUtils'], function(angular) {
  'use strict';

  return angular.module('angularFamous.afModifier', ['famous', 'angularFamous.afUtils'])
    .directive('afModifier', function($timeout, FamousCoreModifier, FamousCoreRenderNode, FamousCoreTransform, afUtils) {
      return {
        restrict: 'EA',
        transclude: true,
        priority: 1,
        scope: true,
        controller: function($scope) {
          // add an afNode for the modifier to the scope
          $scope.afNode = {};
          $scope.afNode.modifier = new FamousCoreModifier();
          $scope.afNode.renderNode = new FamousCoreRenderNode().add($scope.afNode.modifier);

          // add and remove children
          $scope.$on('afAdd', function(event, child) {
            event.stopPropagation();
            $scope.afNode.renderNode.add(child.renderNode);
            console.log('afAdd to modifier', $scope.afNode, child);
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
            $scope.afNode.modifier.setOpacity(0);
            $scope.$parent.$emit('afRemove', $scope.afNode);
          });
        },
        compile: function(element, attrs) {
          // TODO add opacity, align, other transforms?
          var properties = [
            {
              attrs: ['afOriginX', 'afOriginY'],
              getter: function(attrs) {
                return function() {
                  return [afUtils.parseAttr(attrs.afOriginX), afUtils.parseAttr(attrs.afOriginY)];
                };
              },
              setter: function(value) {
                this.originFrom(value);
              }
            },
            {
              attrs: ['afSizeX', 'afSizeY'],
              getter: function(attrs) {
                return function() {
                  return [afUtils.parseAttr(attrs.afSizeX), afUtils.parseAttr(attrs.afSizeY)];
                };
              },
              setter: function(value) {
                this.sizeFrom(value);
              }
            },
            {
              attrs: ['afTranslateX', 'afTranslateY', 'afTranslateZ'],
              getter: function(attrs) {
                return function() {
                  return FamousCoreTransform.translate(
                      afUtils.parseAttr(attrs.afTranslateX) || 0,
                      afUtils.parseAttr(attrs.afTranslateY) || 0,
                      afUtils.parseAttr(attrs.afTranslateZ) || 0
                  );
                };
              },
              setter: function(value) {
                this.transformFrom(value);
              }
            }
          ];

          // remember which attributes have been interpolated
          var interpolatedAttrs = afUtils.getInterpolatedAttrs(attrs);

          function setProperty(target, attrs, property) {
            if (afUtils.hasSomeProperty(attrs, property.attrs)) {
              var getter = property.getter(attrs);
              if (!afUtils.hasSomeProperty(interpolatedAttrs, property.attrs)) {
                getter = getter(); // pass a constant instead of a function
              }
              property.setter.call(target, getter);
            }
          }

          return function(scope, element, attrs, controller, transclude) {
            // transclude children as children of the parent and remove this element
            transclude(scope, function(clone) {
              element.parent().append(clone);
              element.remove();
            });

            // set properties
            for (var i = 0, len = properties.length; i < len; i++) {
              setProperty(scope.afNode.modifier, attrs, properties[i]);
            }

            // set label
            scope.afNode.label = attrs.afModifier;
            if (interpolatedAttrs['afModifier']) {
              attrs.$observe('afModifier', function(value) {
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