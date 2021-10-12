const CommonActionsEditDeletedCreateCommands = require('./test/custom_commands/commonActionsEditDeletedCreate.page.js');
const EditOrDeleteCommands = require('./test/custom_commands/editOrDelete.page.js');
const homePageCommands = require('./test/custom_commands/home.page.js');
const CreatePageCommands = require('./test/custom_commands/create.page.js');
const ApiCommands = require('./test/custom_commands/apis.js');
const CommonActions = require('./test/custom_commands/commonActions.page');

const cleanUp  = require('./test/cleanUp.js');
const {utilMethods} = require('./test/utilities.js')
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
        security: [
            './test/specs/basicSecurityTests.js'
        ]
    },
    maxInstances: 10,
    
    capabilities: [{
        browserName: 'chrome',
        acceptInsecureCerts: true
    }],
    logLevel: 'debug',
    baseUrl: 'http://computer-database.herokuapp.com/computers',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,

    additional : {
        timeOuts : {
            pageLoadTimeout: 5000,
            elementTimeoutWait: 5000,
        },
        resources: {
            cleanUpOnExit: true,
            computerIdsCreated: [],
        },
        apiParameters: {
            requestBodyContentType: {
                urlencoded: "x-www-form-urlencoded",
            },
            getOrPost: {
                post: "POST",
                get: "GET",
            }
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
    },
    beforeSuite() {
        browser.commonCRUDPage_getAllCompanies()
    },
    after() {
        cleanUp(browserObject);
    },
    
}
