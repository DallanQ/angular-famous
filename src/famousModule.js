var requirements = [
  'angular',
  'famous/core/Context',
  'famous/core/ElementAllocator',
  'famous/core/Engine',
  'famous/core/Entity',
  'famous/core/EventEmitter',
  'famous/core/EventHandler',
  'famous/core/Group',
  'famous/core/Modifier',
  'famous/core/OptionsManager',
  'famous/core/RenderNode',
  'famous/core/Scene',
  'famous/core/SpecParser',
  'famous/core/Surface',
  'famous/core/Transform',
  'famous/core/View',
  'famous/core/ViewSequence',
  'famous/events/EventArbiter',
  'famous/events/EventFilter',
  'famous/events/EventMapper',
  'famous/inputs/Accumulator', // new
  'famous/inputs/DesktopEmulationMode', // new
  'famous/inputs/FastClick',
  'famous/inputs/GenericSync',
  'famous/inputs/MouseSync',
  'famous/inputs/PinchSync',
  'famous/inputs/RotateSync',
  'famous/inputs/ScaleSync',
  'famous/inputs/ScrollSync',
  'famous/inputs/TouchSync',
  'famous/inputs/TouchTracker',
  'famous/inputs/TwoFingerSync',
  'famous/math/Matrix',
  'famous/math/Quaternion',
  'famous/math/Random',
  'famous/math/Utilities',
  'famous/math/Vector',
  'famous/modifiers/Draggable',
  'famous/modifiers/Fader',
  'famous/modifiers/ModifierChain',
  'famous/modifiers/StateModifier',
  'famous/physics/bodies/Body',
  'famous/physics/bodies/Circle',
  'famous/physics/bodies/Particle',
  'famous/physics/bodies/Rectangle',
  'famous/physics/constraints/Collision',
  'famous/physics/constraints/Constraint',
  'famous/physics/constraints/Curve',
  'famous/physics/constraints/Distance',
  'famous/physics/constraints/Snap',
  'famous/physics/constraints/Surface',
  'famous/physics/constraints/Wall',
  'famous/physics/constraints/Walls',
  'famous/physics/forces/Drag',
  'famous/physics/forces/Force',
  'famous/physics/forces/Repulsion',
  'famous/physics/forces/RotationalDrag',
  'famous/physics/forces/RotationalSpring',
  'famous/physics/forces/Spring',
  'famous/physics/forces/VectorField',
  'famous/physics/integrators/SymplecticEuler',
  'famous/physics/PhysicsEngine',
  'famous/surfaces/CanvasSurface',
  'famous/surfaces/ContainerSurface',
  'famous/surfaces/FormContainerSurface',
  'famous/surfaces/ImageSurface',
  'famous/surfaces/InputSurface',
  'famous/surfaces/SubmitInputSurface',
  'famous/surfaces/TextareaSurface',
  'famous/surfaces/VideoSurface',
  'famous/transitions/CachedMap',
  'famous/transitions/Easing',
  'famous/transitions/MultipleTransition',
  'famous/transitions/SnapTransition',
  'famous/transitions/SpringTransition',
  'famous/transitions/Transitionable',
  'famous/transitions/TransitionableTransform',
  'famous/transitions/TweenTransition',
  'famous/transitions/WallTransition',
  'famous/utilities/KeyCodes',
  'famous/utilities/Timer',
  'famous/utilities/Utility',
  'famous/views/ContextualView', // new
  'famous/views/Deck',
  'famous/views/EdgeSwapper',
  'famous/views/FlexibleLayout',
  'famous/views/Flipper',
  'famous/views/GridLayout',
  'famous/views/HeaderFooterLayout',
  'famous/views/Lightbox',
  'famous/views/RenderController',
  'famous/views/ScrollContainer',
  'famous/views/Scroller',
  'famous/views/Scrollview',
  'famous/views/SequentialLayout',
  'famous/widgets/NavigationBar',
  'famous/widgets/Slider',
  'famous/widgets/TabBar',
  'famous/widgets/ToggleButton'
];

// can't define this as famous because we have to set up require.config.paths.famous to point to bower_components
define(requirements, function (angular) {
  'use strict';

  var famous = angular.module('famous', []);

  function toName(req) { // converts famous/core/Context to famousCoreContext
    return req.replace(/(^|\/)./g, function(s) { return s.replace('/','').toUpperCase(); });
  }

  function argGetter(arg) {
    return function() {
      return arg;
    };
  }

  // skip past angular
  for (var i = 1, len = requirements.length; i < len; i++) {
    famous.factory(toName(requirements[i]), argGetter(arguments[i]));
  }

  return famous;
});
