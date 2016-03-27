/**
 * Logging utility class.
 * Exported as singleton so all modules share same instance.
 * @memberOf utils
 */
class Logger {
  /**
   * Logs a message to the console.
   * @param {string} msg - Message to log.
   */
  log(msg) {
    console.log(msg);
  }

  /**
   * Logs an error message to the console.
   * @param {string} msg - Error message to log.
   */
  logError(msg) {
    console.error(msg);
  }

  /**
   * Logs an info message to the console.
   * @param {string} msg - Info message to log.
   */
  logInfo(msg) {
    console.info(msg);
  }

  /**
   * Logs a warning message to the console.
   * @param {string} msg - Warning message to log.
   */
  logWarn(msg) {
    console.warn(msg);
  }

  /**
   * Logs a particular trap to the console.
   * @param {string} trap - Name of the trap that triggered logging.
   * @param {...*} trapArgs - The arguments describing the context of the trap.
   */
  logTrap(trap, ...trapArgs) {
    const target = trapArgs[0];

    switch(trap) {
    case 'apply':
      this.log(`Function call on ${target} this: ${trapArgs[1]}, args: ${trapArgs[2]}`);
      break;
    case 'construct':
      this.log(`Constructor call on ${target}, args: ${trapArgs[1]}`);
      break;
    case 'defineProperty':
      this.log(`Property definition on ${target}, property: ${trapArgs[1]}, descriptor: ${trapArgs[2]}`);
      break;
    case 'deleteProperty':
      this.log(`Property deletion on ${target}, property: ${trapArgs[1]}`);
      break;
    case 'get':
      this.log(`Property access on ${target}, property: ${trapArgs[1]}`);
      break;
    case 'getOwnPropertyDescriptor':
      this.log(`Property descriptor access on ${target}, property: ${trapArgs[1]}`);
      break;
    case 'getPrototypeOf':
      this.log(`[[GetPrototypeOf]] on ${target}`);
      break;
    case 'has':
      this.log(`Property query on ${target}, property: ${trapArgs[1]}`);
      break;
    case 'isExtensible':
      this.log(`Extensibility check on ${target}`);
      break;
    case 'ownKeys':
      this.log(`Own key enumeration on ${target}`);
      break;
    case 'preventExtensions':
      this.log(`Prevent extensions call on ${target}`);
      break;
    case 'set':
      this.log(`Property write on ${target}, property: ${trapArgs[1]}, value: ${trapArgs[2]}`);
      break;
    case 'setPrototypeOf':
      this.log(`setPrototypeOf called on ${target}, prototype: ${trapArgs[1]}`);
      break;
    }
  }
}

// singleton
let logger = new Logger();
export { logger };
