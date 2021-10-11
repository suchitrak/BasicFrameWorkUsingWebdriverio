/**
 * @Definition Contains all the actions common to Create, Delete, Edit page. 
 * All the custom commands on this page are prefixed with commonCRUDPage_. 
 * So as to allow following page object model without having to create an object of the page everytime
 */
const {commonSelectors} = require('./commonSelectorsEditDeletedCreate.page')

module.exports = browser => {

    /**
     * @Definition Gets all the companies and adds it to the browser.config.additional.listOfCompanies. 
     * This list will be used during tests to get one of the value to which the company needs to set to
     * @param 
     * @returns nothing 
     */
    browser.addCommand('commonCRUDPage_getAllCompanies', () => {
        browser.homePage_Open()
        browser.homePage_clickaddNewComputer()
        $$(commonSelectors.companyOptionList).map(option => browser.config.additional.listOfCompanies.push(option.getText()))
    });

    /**
     * @Definition Gets the css property (border-bottom-color) of Introduced field. 
     * The color of the field changes when invalid values are provided
     * @param 
     * @returns css property border-bottom-color of the field 
     */
    browser.addCommand('commonCRUDPage_getColorIntroduced', () => {
        return $(commonSelectors.introduced).getCSSProperty('border-bottom-color').parsed.hex
    });

    /**
     * @Definition Gets the css property (border-bottom-color) of discontinued field. 
     * The color of the field changes when invalid values are provided
     * @param 
     * @returns css property border-bottom-color of the field 
     */
    browser.addCommand('commonCRUDPage_getColorDiscontinued', () => {
        return $(commonSelectors.discontinued).getCSSProperty('border-bottom-color').parsed.hex
    });

    /**
     * @Definition Gets the css property (border-bottom-color) of name field. 
     * The color of the field changes when invalid values are provided
     * @param 
     * @returns css property border-bottom-color of the field 
     */
    browser.addCommand('commonCRUDPage_getColorName', () => {
        return $(commonSelectors.name).getCSSProperty('border-bottom-color').parsed.hex
    });
}
    

   