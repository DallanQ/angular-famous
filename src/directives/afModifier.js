define(['angular', 'famousModule', 'services/afUtils'], function(angular) {
  'use strict';

  return angular.module('angularFamous.afModifier', ['famous'])
    .directive('afModifier', function(FamousCoreModifier, FamousCoreRenderNode, FamousCoreTransform) {
      return {
        restrict: 'EA',
        transclude: true,
        priority: 1,
        scope: true,
        controller: function($scope) {
          // add an afNode for the modifier to the scope
          $scope.afNode = {};
          $scope.afNode.modifier = new FamousCoreModifier();
          $scope.afNode.renderNode = new FamousCoreRenderNode($scope.afNode.modifier);

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
        link: function(scope, element, attrs, controller, transclude) {
          // TODO add opacity, other transforms?
          // getters return functions that return the value
          var properties = {
            afAlign: {
              getter: function(scope, attrs) {
                return function() {
                  return scope.$eval(attrs.afAlign);
                };
              },
              setter: function(value) {
                this.alignFrom(value);
              }
            },
            afOrigin: {
              getter: function(scope, attrs) {
                return function() {
                  return scope.$eval(attrs.afOrigin);
                };
              },
              setter: function(value) {
                this.originFrom(value);
              }
            },
            afSize: {
              getter: function(scope, attrs) {
                return function() {
                  return scope.$eval(attrs.afSize);
                };
              },
              setter: function(value) {
                this.sizeFrom(value);
              }
            },
            afTranslate: {
              getter: function(scope,attrs) {
                return function() {
                  var xyz = scope.$eval(attrs.afTranslate);
                  return FamousCoreTransform.translate(xyz[0], xyz[1], xyz[2]);
                };
              },
              setter: function(value) {
                this.transformFrom(value);
              }
            }
          };

          function setProperty(target, scope, attrs, propName, propValue) {
            if(attrs.hasOwnProperty(propName)) {
              var getter = propValue.getter(scope,attrs);
              propValue.setter.call(target, getter);
            }
          }

          // transclude children as children of the parent and remove this element
          transclude(scope, function(clone) {
            element.parent().append(clone);
            element.remove();
          });

          // set properties
          for (var propName in properties) {
            if (properties.hasOwnProperty(propName)) {
              setProperty(scope.afNode.modifier, scope, attrs, propName, properties[propName]);
            }
          }

          // set label
          scope.afNode.label = attrs.afModifier;
          attrs.$observe('afModifier', function(value) {
            scope.afNode.label = value;
          });

          // add to render tree after all normal-priority controller & link functions on this scope have executed
          scope.$parent.$emit('afAdd', scope.afNode);

        }
      };
    });
});