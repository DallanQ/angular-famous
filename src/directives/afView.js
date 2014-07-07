define(['angular', 'famousModule', 'services/afUtils'], function(angular) {
  'use strict';

  return angular.module('angularFamous.afView', ['famous', 'angularFamous.afUtils'])
    .directive('afView', function(FamousCoreRenderNode, afUtils,
                                  FamousViewsFlipper, FamousViewsFlexibleLayout) {
      function getViewInfo(viewType, attrs) {
        var viewInfo;
        if (viewType === 'Flipper') {
          var flipper = new FamousViewsFlipper();
          viewInfo = {
            view: flipper,
            add: function(child) {
              if (child.label === attrs.afFront) {
                console.log('add front', child);
                flipper.setFront(child.renderNode);
              }
              else if (child.label === attrs.afBack) {
                console.log('add back', child);
                flipper.setBack(child.renderNode);
              }
            }
          };
        }
        else if (viewType === 'FlexibleLayout') {
          var flexibleLayout = new FamousViewsFlexibleLayout();
          var sequence = [];
          viewInfo = {
            view: flexibleLayout,
            add: function(child) {
              sequence.push(child.renderNode);
              flexibleLayout.sequenceFrom(sequence);
            },
            remove: function(child) {
              var pos = sequence.indexOf(child.renderNode);
              if (pos >= 0) {
                sequence.splice(pos, 1);
                flexibleLayout.sequenceFrom(sequence);
              }
            }
          };
        }

        // set defaults
        if (!viewInfo.renderNode) {
          viewInfo.renderNode = new FamousCoreRenderNode().add(viewInfo.view);
        }

        return viewInfo;
      }

      return {
        restrict: 'EA',
        transclude: true,
        priority: 1,
        scope: true,
        controller: function($scope, $element, $attrs) {
          // add an afNode for the view to the scope
          var viewInfo = getViewInfo($attrs.afViewType, $attrs);
          $scope.afNode = {};
          $scope.afNode.view = viewInfo.view;
          $scope.afNode.renderNode = viewInfo.renderNode;

          // add and remove children
          $scope.$on('afAdd', function(event, child) {
            event.stopPropagation();
            viewInfo.add(child);
            $scope.$emit('afAdded', child);
          });
          $scope.$on('afRemove', function(event, child) {
            event.stopPropagation();
            // TODO doesn't appear to be a way to remove children from views
            if (viewInfo.remove) {
              viewInfo.remove(child);
            }
            $scope.$emit('afRemoved', child);
          });

          // clean up
          $scope.$on('$destroy', function () {
            // TODO doesn't appear to be a way to remove a view
            if (viewInfo.destroy) {
              viewInfo.destroy();
            }
            $scope.$parent.$emit('afRemove', $scope.afNode);
          });
        },
        compile: function(element, attrs) {
          var properties = {
            FlexibleLayout: [
              {
                attrs: ['afDirection'],
                getter: function(attrs) {
                  return function() {
                    return {
                      direction: afUtils.parseAttr(attrs.afDirection)
                    };
                  };
                },
                setter: function(value) {
                  console.log('options', value);
                  this.setOptions(value);
                }
              },
              {
                attrs: ['afRatios'],
                getter: function(attrs) {
                  return function() {
                    return JSON.parse(afUtils.parseAttr(attrs.afRatios));
                  };
                },
                setter: function(value) {
                  console.log('ratios', value);
                  this.setRatios(value);
                }
              }
            ]
          };

          // remember which attributes have been interpolated
          var interpolatedAttrs = afUtils.getInterpolatedAttrs(attrs);

          return function(scope, element, attrs, controller, transclude) {
            // transclude children as children of the parent and remove this element
            transclude(scope, function(clone) {
              element.parent().append(clone);
              element.remove();
            });

            // set properties
            if (properties[attrs.afViewType]) {
              for (var i = 0, len = properties[attrs.afViewType].length; i < len; i++) {
                afUtils.setAndObserveProperty(scope.afNode.view, attrs, interpolatedAttrs, properties[attrs.afViewType][i]);
              }
            }

            // set label
            scope.afNode.label = attrs.afView;
            if (interpolatedAttrs['afView']) {
              attrs.$observe('afView', function(value) {
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