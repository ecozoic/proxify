import { baseTrapHandler } from './trapHandler';

/**
 * Object that defines the traps used to proxy objects.
 * Extends {@link handlers.BaseTrapHandler}.
 * @memberOf handlers
 */
var objTrapHandler = Object.create(baseTrapHandler);

export { objTrapHandler };
