const logger = require('@wdio/logger').default;

const log = logger(__filename);

const cleanUpFunctions = {
    cleanUp(browser) {

        if (browser.config.additional.resources.cleanUpOnExit) {
            browser.config.additional.resources.computerIdsCreated.forEach(computerID => {
                console.log(`Deleting the computer IDs created during test Automation as part of clean up ${computerID}`);
                browser.api_deleteComputer(`/${computerID}/delete`);
            });
        }
    },
};

module.exports = cleanUpFunctions.cleanUp;
