/**
 * * @Definition Contains all the actions common accross all of the pages accross the website
*/


module.exports = browser => {
    
    /**
     * @Definition Waits till the page is loaded. Times out of time excceeds pageLoadTimeout.
     * If page is not loaded within given time limit, error message is shown
     * @param {String} url - URL of the page to be loaded
     * @param {String} pageLoadTimeout - Time to be waited for the page to be loaded. 
     *                                   Defaults to value defined in config file
     * @returns nothing 
     */
    browser.addCommand('waitTillPageIsLoaded', (url, pageLoadTimeout = browser.config.pageLoadTimeout) => {
        browser.waitUntil(() => browser.getUrl().includes(url), {
            timeout: pageLoadTimeout,
            timeoutMsg: `${url}: Not loaded!`,
        });
    });

    /**
     * @Definition Fetches the ID of the computer from the URL. 
     *           e.g https://computer-database.herokuapp.com/computers/640
     * @returns nothing 
     */
    browser.addCommand('getComputerIDFromUrl', () => {
        var URL = browser.getUrl()
        browser.log(`${URL} of ID created is ${URL.split("/").slice(-1)[0]}`)
        return URL.split("/").slice(-1)[0] 
    });

    /**
     * @Definition Navigates to the URL as defined path variable prefixed with the browser.config.baseURL
     * @param {String} path - path to be siffixed. e.g "?f=short1"
     * @returns nothing 
     */
    browser.addCommand('navigateToUrl', (path="") => {
        browser.log(`Navigating to URL ${browser.config.baseUrl}${path}`)
        browser.url(`${browser.config.baseUrl}${path}`)
        browser.waitTillPageIsLoaded(browser.config.baseUrl + path)
    });
};