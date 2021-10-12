const CommonActionsEditDeletedCreateCommands = require('./test/custom_commands/commonActionsEditDeletedCreate.page.js');
const EditOrDeleteCommands = require('./test/custom_commands/editOrDelete.page.js');
const homePageCommands = require('./test/custom_commands/home.page.js');
const CreatePageCommands = require('./test/custom_commands/create.page.js');
const ApiCommands = require('./test/custom_commands/apis.js');
const CommonActions = require('./test/custom_commands/commonActions.page');
const LoggerCommands = require('./test/custom_commands/loggerCommands.js')

const cleanUp  = require('./test/cleanUp.js');
let browserObject = '';
exports.config = {
    specs: [
        './test/specs/**/*.js'
    ],
    suites: {
        api: [
            './test/specs/APITests.js'
        ],
        create: [
            './test/specs/createTests.js'
        ],
        updateReplace: [
            './test/specs/updateAndReplaceTests.js'
        ],
        delete: [
            './test/specs/deleteTests.js'
        ],
        homePageDisplay: [
            './test/specs/homePageDisplayTests.js'
        ]
    },
    maxInstances: 10,
    
    capabilities: [{
        browserName: 'chrome',
        acceptInsecureCerts: true
    }],
    logLevel: 'error',
    baseUrl: 'http://computer-database.herokuapp.com/computers',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,

    /*
    Additional parameters used: 
    1. Timeouts - time to wait for page/element to load
    2. cleanUpOnExit if set to true, deletes all the resources created during automation
    3. computerIdsCreated - The ID of a new computer created by automation is added here. The computerIDs created here are deleted on exit
    4. listOfCompanies is populated at the beginning to get the list of companies that can be used during automation
    */
    additional : {
        timeOuts : {
            pageLoadTimeout: 5000,
            elementTimeoutWait: 5000,
        },
        resources: {
            cleanUpOnExit: true,
            computerIdsCreated: [],
        },
        listOfCompanies: []
    },
    connectionRetryCount: 3,
    services: ['chromedriver'],
    
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    before() {
        CommonActions(browser)
        CommonActionsEditDeletedCreateCommands(browser);
        EditOrDeleteCommands(browser);
        homePageCommands(browser);
        ApiCommands(browser)
        CreatePageCommands(browser)
        browserObject = browser;
        LoggerCommands(browser)
    },
    beforeSuite() {
        browser.commonCRUDPage_getAllCompanies()
    },
    after() {
        cleanUp(browserObject);
    },

    afterTest(test, context, result) {
        if (result.error) {
            browser.saveScreenshot(`target/reports/${test}-Onfailure.png`);
        }
    }
}
