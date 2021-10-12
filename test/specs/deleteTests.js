const {utilMethods} = require('../utilities.js')

describe('CRUD Operations - Delete', () => {
    it('Should return 400 when trying to delete non existant computer', () => {
      var response = browser.api_deleteComputer("/abcd/delete", "POST")
      expect(response).toEqual(400)
    });

    it(`Should be able to delete a the first Computer in Table`, () => {
      browser.homePage_Open()
      browser.homePage_selectFirstComputerInTable()
      browser.editDeletePage_clickDeleteButton()
      var alertMessage = browser.homePage_getAlertMessage()
      expect(alertMessage === 'Done! Computer has been deleted').toBe(true)
  });

    it(`Should not Crash when deleting the same computer from two tabs`, () => {
      browser.homePage_Open()
      var name =  utilMethods.utils_generateRandomAlphaNumericString()
      browser.api_createComputer(name, "", "", "")
      browser.homePage_displayTableFilteredByNameModifyingURL(name)
      browser.homePage_selectFirstComputerInTable()
      browser.homePage_addElementToListOfIDsTOBeCleanedUp()
      browser.homePage_addElementToListOfIDsTOBeCleanedUp()
      var computerID = browser.getComputerIDFromUrl()
      browser.newWindow(`${browser.config.baseUrl}/${computerID}`)
      var firstWindow = browser.getWindowHandle()
      
      browser.newWindow(`${browser.config.baseUrl}/${computerID}`)
      browser.editDeletePage_clickDeleteButton()
      var alertMessage = browser.homePage_getAlertMessage()
      expect(alertMessage === 'Done! Computer has been deleted').toBe(true)
      
      browser.switchToWindow(firstWindow)
      browser.editDeletePage_clickDeleteButton()
      var alertMessage = browser.homePage_getAlertMessage()
      expect(alertMessage === 'Done! Computer has been deleted').toBe(true)
    });

    it(`Should not Crash when computer is already deleted and user tried to edit on other tab`, () => {
      browser.homePage_Open()
      var name =  utilMethods.utils_generateRandomAlphaNumericString()
      browser.api_createComputer(name, "", "", "")
      browser.homePage_displayTableFilteredByNameModifyingURL(name)
      browser.homePage_selectFirstComputerInTable()
      browser.homePage_addElementToListOfIDsTOBeCleanedUp()
      var computerID = browser.getComputerIDFromUrl()
      browser.newWindow(`${browser.config.baseUrl}/${computerID}`)
      var firstWindow = browser.getWindowHandle()
      
      browser.newWindow(`${browser.config.baseUrl}/${computerID}`)
      browser.editDeletePage_clickDeleteButton()
      var alertMessage = browser.homePage_getAlertMessage()
      expect(alertMessage === 'Done! Computer has been deleted').toBe(true)
      
      browser.switchToWindow(firstWindow)
    
      browser.editDeletePage_fillAndSubmitUpdateComputerForm("", "01 Sep 1982", "01 Sep 1982",4)
      browser.homePage_displayTableFilteredByNameModifyingURL(name)
      expect(browser.homePage_isNothingToDisplayExists()).toBe(true)
    });
});


