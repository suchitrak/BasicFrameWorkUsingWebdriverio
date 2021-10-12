const logger = require('@wdio/logger').default;
const log = logger("BasicFrameworkTests");
module.exports = browser => {
    /**
     * Logs are logged, based on the logLevel set in the config.js file
     * @param {string} log - text to be logged
     * @param {string} logLevel - loglevel
     *          Possible values - trace, debug, info, warn, error
     *          Optional param. If no value is passed for logLevel, Default value will be - debug
     *
     */
    browser.addCommand('log', (logText, logLevel = 'info') => {
        if (logLevel === 'info') {
            log.info(logText);
        } else if (logLevel === 'debug') {
            log.debug(logText);
        } else if (logLevel === 'trace') {
            log.trace(logText);
        } else if (logLevel === 'error') {
            log.error(logText);
        } else if (logLevel === 'warn') {
            log.warn(logText);
        }
    });
};