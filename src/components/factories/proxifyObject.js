import { ObjectTrapHandler } from '../handlers';

export function proxifyObject(obj) {
  return new Proxy(obj, new ObjectTrapHandler());
}
