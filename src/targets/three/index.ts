import * as THREE from 'three'
import { invalidate, applyProps, addEffect } from 'react-three-fiber'
import { interpolate } from '../../interpolate'
import animated from '../../animated/createAnimatedComponent'
import * as Globals from '../../animated/Globals'
import colorNames from '../../shared/colors'
import { config } from '../../shared/constants'
import createInterpolation from '../../shared/stringInterpolation'
import { useChain } from '../../useChain'
import { useSpring } from '../../useSpring'
import { useSprings } from '../../useSprings'
import { useTrail } from '../../useTrail'
import { useTransition } from '../../useTransition'
import { merge } from '../../shared/helpers'
import { update } from '../../animated/FrameLoop'
import { ReactType } from 'preact/compat'

// Extend animated with all the available THREE elements
const apply = merge(animated)
const extendedAnimated = apply(THREE)
extendedAnimated.primitive = animated('primitive' as ReactType)

if (addEffect) {
  // Add the update function as a global effect to react-three-fibers update loop
  addEffect(update)
  // Ping react-three-fiber, so that it will call react-springs update function as an effect
  Globals.injectManualFrameloop(() => invalidate())
}

// Set default native-element
Globals.injectDefaultElement('group')
// Use default interpolation (which includes numbers, strings, colors)
Globals.injectStringInterpolator(createInterpolation)
// Inject color names, so that it will be able to deal with things like "peachpuff"
Globals.injectColorNames(colorNames)
// This is how we teach react-spring to set props "natively", the api is (instance, props) => { ... }
Globals.injectApplyAnimatedValues(applyProps, style => style)

export {
  apply,
  update,
  config,
  extendedAnimated as animated,
  extendedAnimated as a,
  interpolate,
  Globals,
  useSpring,
  useTrail,
  useTransition,
  useChain,
  useSprings,
}
