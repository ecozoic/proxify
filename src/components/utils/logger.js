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
}

// singleton
let logger = new Logger();
export { logger };
