import { baseTraps } from './baseTraps';

let objectTraps = [
  'ownKeys',
  'hasTarget'
];

objectTraps = baseTraps.concat(objectTraps);

export { objectTraps };
