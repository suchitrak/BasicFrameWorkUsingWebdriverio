/**
 * @Definition Contains all the selectors and actions specific to Edit or Delete page. 
 * Ecit/Delete page is https://computer-database.herokuapp.com/computers/<computerID>. 
 * User is taken to this page from home page. When user clicks on any of the computer name link
 * All the custom commands on this page are prefixed with editDeletePage_. 
 * So as to allow following page object model without having to create an object of the page everytime
 */

const {commonSelectors} = require('./commonSelectorsEditDeletedCreate.page')

module.exports = browser => {
    /**
     * @Definition Contains all the selectors specific to the Edit/Delete Page plus the selectors common to Create page too
     */
    let selectors = {
        ...commonSelectors,
        deleteButton: "input[value='Delete this computer']",
        buttonSaveThisComputer: "input[value = 'Save this computer']",
    }

    /**
     * @Definition Validates if all the elements on the page are displayed as expected
     */
    browser.addCommand('editDeletePage_displayedAsExpected', () => {
        for (selector in selectors) {
            console.log(`Checking if selector ${selectors[selector]} exists`);
            expect($(selectors[selector]).isExisting()).toBe(true);
        };
    });

    /**
     * @Definition clicks on the delete button. This deletes the current computer on which the button is displayed
     * After deleting browser moves to Home Page 
     * @returns nothing 
     */
    browser.addCommand('editDeletePage_clickDeleteButton', () => {
        $(selectors.deleteButton).waitForDisplayed(browser.config.additional.timeOuts.elementTimeoutWait)
        $(selectors.deleteButton).click()
    });

    /**
     * @Definition Edits the computer fields with the values passed in argument. If "" is passed. No action is taken on the field
     * if a value other than "" is passed the field is updated with the value in parameter and save button is clicked
     * @param  {String} computerName, introducedDate, discontinuedDate, company field values to be updated it
     * @returns nothing 
     */
    browser.addCommand('editDeletePage_fillAndSubmitUpdateComputerForm', (computerName, introducedDate, discontinuedDate, company) => {
        if(computerName != "") {
            $(selectors.name).setValue(computerName);
        }
        if(introducedDate != "") {
            $(selectors.introduced).setValue(introducedDate);
        }
        if(discontinuedDate != "") {
            $(selectors.discontinued).setValue(discontinuedDate);
        }
        if(company != "") {
            $(selectors.company).selectByAttribute('value', company);
        }
        $(selectors.buttonSaveThisComputer).click();
    });

}
