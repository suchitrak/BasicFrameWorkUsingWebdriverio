/**
 * @Definition Contains all the selectors and actions specific to home Page. 
 * Home page is the landing page of http://computer-database.herokuapp.com/computers
 * All the custom commands on this page are prefixed with homePage_. 
 * So as to allow following page object model without having to create an object of the page everytime
 */


module.exports = browser => {
    let selectors = {
        searchbox: '#searchbox',
        searchsubmit: '#searchsubmit',
        addANewComputer: '#add',
        pagination: '#pagination',
        header: '.topbar',
        alert: '#main div',
        firstElementInTable: 'tbody tr td a',
        paginationCurrent: '.current',
        paginationNext: '.next',
        paginationPrev: '.prev',
        nothingToDisplay: '.well em',
        rowsInTable: 'table tbody tr'
    }
    /**
     * @Definition Navigates to http://computer-database.herokuapp.com/computers page
     * @returns nothing 
     */
    browser.addCommand('homePage_Open', () => {
        browser.navigateToUrl()
        $(selectors.addANewComputer).waitForDisplayed(5000)
    });

    /**
     * @Definition Click on Add new Computer Button
     * @returns nothing 
     */
    browser.addCommand('homePage_clickaddNewComputer', () => {
        $(selectors.addANewComputer).waitForDisplayed(5000)
        $(selectors.addANewComputer).click()
    });

    /**
     * @Definition Searches for the computer
     * @param  {String} computerName - name of computer to be searched
     * @returns nothing 
     */
    browser.addCommand('homePage_searchForComputer', computerName => {
        selectors.waitForDisplayed(browser.config.elementTimeoutWait)
        selectors.searchbox.setValue(computerName);
        selectors.searchsubmit.click();
    });

    /**
     * @Definition gets header Displayed on the home page
     * @returns nothing 
     */
    browser.addCommand('homePage_getHeaderTest', () => {
        return selectors.header.textContent();
    });

    /**
     * @Definition Validates if all the elements on the page are displayed as expected
     * @returns nothing 
     */
    browser.addCommand('homePage_areTheContentsOfThePageCorrectlyDisplayed', () => {
        selectors.forEach((selector) => {
            console.log(selector);
            expect($(selector).exists()).toBe(true);
        });
    });

    /**
     * @Definition Gets the Alert message displayed when a computer is created/Updated/Replaced/Deleted
     * @returns The Alert Message  
     */
    browser.addCommand('homePage_getAlertMessage', () => {
        return $(selectors.alert).getText();
    });

    /**
     * @Definition Gets the First Element found on the computer Table 
     * @returns The First Element found on the computer Table 
     */
    browser.addCommand('homePage_getFirstComputerInTable', () => {
        $(selectors.firstElementInTable).waitForDisplayed(5000)
        return $(selectors.firstElementInTable).getText()
    });

    /**
     * @Definition Clicks the first element in the table 
     * @returns The First Element found on the computer Table 
     */
    browser.addCommand('homePage_selectFirstComputerInTable', () => {
        $(selectors.firstElementInTable).waitForDisplayed(5000)
        $(selectors.firstElementInTable).click()
    });

    /**
     * @Definition Adds the computerID to browser.config.additional.resources.computerIdsCreated. 
     * The Ids in this array will later be deleted using the delete API at the end of tests
     * @returns Nothing
     */
    browser.addCommand('homePage_addElementToListOfIDsTOBeCleanedUp', () => {
        var idOfComputerCreated = browser.getComputerIDFromUrl()
        browser.config.additional.resources.computerIdsCreated.push(idOfComputerCreated)
    });

    /**
     * @Definition Searches for the row containing the computer name.
     * Navigates to the parent to fetch the entire row. And then fetches the element of each cell
     * @returns [name, introduced, discontinued, company]
     */
    browser.addCommand('homePage_getValuesCorrespondingToComputerInATable', (name) => {
        name = $(`//a[contains(text(),'${name}')]/../../*[1]`).getText()
        introduced = $(`//a[contains(text(),'${name}')]/../../*[2]`).getText()
        discontinued = $(`//a[contains(text(),'${name}')]/../../*[3]`).getText()
        company = $(`//a[contains(text(),'${name}')]/../../*[4]`).getText()

        return [name, introduced, discontinued, company]
    });
    /**
     * @Definition Navigates to http://computer-database.herokuapp.com/computers?f=name page
     * This allows to filter the table. This is same as filtering the computer names from UI
     * @returns nothing 
     */
    browser.addCommand('homePage_displayTableFilteredByNameModifyingURL', (name) => {
        browser.navigateToUrl(`?f=${name}`)
    });

    /**
     * @Definition Gets previous pagination button details
     * @returns text on the pagination and link on the pagination 
     */
    browser.addCommand('homePage_getPaginationPrev', () => {
        return [$(selectors.paginationPrev).getText() , $(`${selectors.paginationPrev} a`).getAttribute('href')]
    });
    /**
     * @Definition Gets details of current page e.g. Displaying 1 to 10 of 604
     * @returns text on the pagination
     */
    browser.addCommand('homePage_getPaginationCurrent', () => {
        return $(selectors.paginationCurrent)
    });

    /**
     * @Definition Gets next pagination button details
     * @returns text on the pagination and link on the pagination 
     */
    browser.addCommand('getPaginationNext', () => {
        return [$(selectors.paginationNext).getText() , $(`${selectors.paginationNext} a`).getAttribute('href')]
    });

    /**
     * @Definition When search from UI using filter button or search from URL using ?f=name returns no search results
     * "Nothing to display" is displayed 
     * @returns True if "Nothing to display" is displayed. False otherwise
     */
    browser.addCommand('homePage_isNothingToDisplayExists', () => {
        return $(selectors.nothingToDisplay).isDisplayed()
    });

    /**
     * @Definition Gets Number of rows in Table
     * @returns Number of rows on the table
     */
    browser.addCommand('homePage_getNumberOfRowsInTable', () => {
        return $$(selectors.rowsInTable).length
    });
}


