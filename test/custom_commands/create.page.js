/**
 * @Definition Contains all the selectors and actions specific to Create page. 
 * Create page is https://computer-database.herokuapp.com/computers/new. 
 * User is taken to this page from home page. When user clicks on Add a new Computer button
 * All the custom commands on this page are prefixed with createPage_. 
 * So as to allow following page object model without having to create an object of the page everytime
 */
const {commonSelectors} = require('./commonSelectorsEditDeletedCreate.page')

module.exports = browser => {
    /**
     * @Definition Contains all the selectors specific to the Create Page plus the selectors common to  Edit/Delete page too
     */
    let selectors = {
        ...commonSelectors,
        buttonCreateComputer: "input[value = 'Create this computer']",
    }

    /**
     * @Definition Sets the computer fields with the values passed in argument and save button is clicked
     * @param  {String} computerName, introducedDate, discontinuedDate, company field values
     * @returns nothing 
     */
    browser.addCommand('createPage_fillAndSubmitCreateUserForm', (computerName, introducedDate, discontinuedDate, company) => {
        $(selectors.name).setValue(computerName);
        $(selectors.introduced).setValue(introducedDate);
        $(selectors.discontinued).setValue(discontinuedDate);
        $(selectors.company).selectByAttribute('value', company);
        $(selectors.buttonCreateComputer).click();
    });
    
    /**
     * @Definition Validates if all the selectors in the page are displayed as expected
     * @returns nothing 
     */
    browser.addCommand('createPage_displayedAsExpected', () => {
        for (selector in selectors) {
            expect($(selectors[selector]).isExisting()).toBe(true);
        };
    });
    /**
     * @Definition Gets the Header information on create Page
     * @param  {String} computerName, introducedDate, discontinuedDate, company field values
     * @returns nothing 
     */
    browser.addCommand('createPage_getHeaderOnCreatePage', () => {
        return $(selectors.pageH1Text).getText()
    });
}
    

   