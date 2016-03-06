class Logger {
  log(msg) {
    console.log(msg);
  }

  logError(msg) {
    console.error(msg);
  }

  logInfo(msg) {
    console.info(msg);
  }

  logWarn(msg) {
    console.warn(msg);
  }
}

// singleton
let logger = new Logger();
export { logger };
