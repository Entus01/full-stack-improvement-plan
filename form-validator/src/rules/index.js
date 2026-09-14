import { required } from './required.js';
import { minLength } from './minLength.js';
import { maxLength } from './maxLength.js';
import { min } from './min.js';
import { max } from './max.js';
import { pattern } from './pattern.js';
import { oneOf } from './oneOf.js';
import { equals } from './equals.js';
import { fileType } from './fileType.js';
import { maxFileSize } from './maxFileSize.js';

export const RULES = {
  required,
  minLength,
  maxLength,
  min,
  max,
  pattern,
  oneOf,
  equals,
  fileType,
  maxFileSize,
};

export const SUPPORTED_TYPES = [
  'text',
  'textarea',
  'email',
  'password',
  'number',
  'checkbox',
  'radio',
  'file',
];
