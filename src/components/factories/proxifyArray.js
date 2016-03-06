import { ArrayTrapHandler } from '../handlers';

export function proxifyArray (arr) {
  return new Proxy(arr, new ArrayTrapHandler());
}
