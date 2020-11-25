import underscore from 'underscore';
import { assignment } from './lib/assignment';
import { isPlainObject } from './lib/is-plain-object';
import { param } from './lib/param';

export default {
  ...underscore,
  deepMerge: assignment,
  isPlainObject,
  param,
};
