const {utilMethods} = require('../utilities.js')

describe('CRUD Operations - using API', () => {
    it('Should be able to create and delete a new computer using an API', () => {
        var name = utilMethods.utils_generateRandomAlphaNumericString()
        var introduced = '1982-09-01'
        var discontinued = '1982-09-01'
        var company = 2
        browser.api_createComputer(name, introduced, discontinued, company)
        browser.homePage_Open()
        browser.homePage_searchForComputer(name)
        expect(browser.homePage_getFirstComputerInTable()).toEqual(name.trim())
        browser.homePage_selectFirstComputerInTable()
        var computerID = browser.getComputerIDFromUrl()
        browser.api_deleteComputer(`/${computerID}/delete`, "POST")
        browser.homePage_Open()
        browser.homePage_searchForComputer(name)
        expect(browser.homePage_isNothingToDisplayExists()).toBe(true)
    });

    xit('Utility used for cleaning, in case any of the computers are left over', () => {
        for(var i= 800; i< 950; i++) {
            browser.api_deleteComputer(`/${i}/delete`, "POST")
        } 
    });
});


