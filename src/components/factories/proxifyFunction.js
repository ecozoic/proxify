import { FunctionTrapHandler } from '../handlers';

export function proxifyFunction(fn) {
  return new Proxy(fn, new FunctionTrapHandler());
}
