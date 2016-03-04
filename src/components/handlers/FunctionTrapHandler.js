/**
 * Created by Mark.Mosby on 3/1/2016.
 */
import { BaseTrapHandler } from './baseTrapHandler';
import logger from '../logger';

export class FunctionTrapHandler extends BaseTrapHandler {
  apply(target, key) {
    // TODO
    logger.log(`apply called with ${target}, key: ${key}`);
  }

  construct(target, key) {
    // TODO
    logger.log(`construct called with ${target}, key: ${key}`);
  }
}
