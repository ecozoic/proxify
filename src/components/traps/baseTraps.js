// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#A_complete_traps_list_example

export const baseTraps = [
  'defineProperty',
  'deleteProperty',
  'get',
  'getOwnPropertyDescriptor',
  'getPrototypeOf',
  'has',
  'isExtensible',
  'ownKeys',
  'preventExtensions',
  'set',
  'setPrototypeOf'
];
