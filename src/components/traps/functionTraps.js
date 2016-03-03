import { baseTraps } from './baseTraps';

let functionTraps = [
  'ownKeys',
  'has',
  'hasTarget',
  'apply',
  'construct'
];

functionTraps = baseTraps.concat(functionTraps);

export functionTraps;
