define(['angular', 'famousModule', 'services/afUtils'], function(angular) {
  'use strict';

  return angular.module('angularFamous.afView', ['famous', 'angularFamous.afUtils'])
    .directive('afView', function(FamousCoreRenderNode, afUtils,
                                  FamousViewsFlipper, FamousViewsFlexibleLayout, FamousViewsHeaderFooterLayout) {
      function getViewInfo(viewType) {
        var viewInfo;
        var numChildren = 0;
        if (viewType === 'Flipper') {
          var flipper = new FamousViewsFlipper();
          viewInfo = {
            view: flipper,
            add: function(child) {
              if (numChildren === 0) {
                flipper.setFront(child.renderNode);
              }
              else if (numChildren === 1) {
                flipper.setBack(child.renderNode);
              }
              numChildren++;
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
        else if (viewType === 'HeaderFooterLayout') {
          var headerFooterLayout = new FamousViewsHeaderFooterLayout();
          viewInfo = {
            view: headerFooterLayout,
            add: function(child) {
              if (numChildren === 0) {
                headerFooterLayout.header.add(child.renderNode);
              }
              else if (numChildren === 1) {
                headerFooterLayout.content.add(child.renderNode);
              }
              else if (numChildren === 2) {
                headerFooterLayout.footer.add(child.renderNode);
              }
              numChildren++;
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
          var viewInfo = getViewInfo($attrs.afViewType);
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
            // TODO doesn't appear to be a way to remove children from most views
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
            afOptions: {
              getter: function(scope, attrs) {
                return scope.$eval(attrs.afOptions);
              },
              setter: function(value) {
                this.setOptions(value);
              }
            },
            afRatios: {
              getter: function(scope, attrs) {
                return scope.$eval(attrs.afRatios);
              },
              setter: function(value) {
                this.setRatios(value);
              }
            }
          };
          var viewProperties = {
            FlexibleLayout: ['afOptions', 'afRatios'],
            HeaderFooterLayout: ['afOptions']
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
            if (!!viewProperties[attrs.afViewType]) {
              for (var i = 0, len = viewProperties[attrs.afViewType].length; i < len; i++) {
                var propName = viewProperties[attrs.afViewType][i];
                afUtils.setAndObserveProperty(scope.afNode.view, scope, attrs, interpolatedAttrs, propName, properties[propName]);
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