import { baseTraps } from './baseTraps';

let functionTraps = [
  'apply',
  'construct'
];

functionTraps = baseTraps.concat(functionTraps);

export { functionTraps };
