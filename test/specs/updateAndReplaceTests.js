const {utilMethods} = require('../utilities.js')
const updateComputerInputs = [
    {
      testName: 'Update existing Introduced field value with a new valid value',
      name: utilMethods.utils_generateRandomAlphaNumericString(),
      introduced: '1982-09-01',
      discontinued: '',
      company: '',
      updateField: 'introduced',
      updateValue: '1983-10-02',
      expectedIntroducedValue: '02 Oct 1983',
      expectedDiscontinuedValue: '-',
      expectedCompanyValue: '-'
    },
    {
        testName: 'Update empty Introduced field value with a new valid value',
        name: utilMethods.utils_generateRandomAlphaNumericString(),
        introduced: '',
        discontinued: '',
        company: '',
        updateField: 'introduced',
        updateValue: '1983-10-02',
        expectedIntroducedValue: '02 Oct 1983',
        expectedDiscontinuedValue: '-',
        expectedCompanyValue: '-'
    },
    {
        testName: 'Update existing discontinued field value with a new valid value',
        name: utilMethods.utils_generateRandomAlphaNumericString(),
        introduced: '1982-09-01',
        discontinued: '1982-09-01',
        company: '',
        updateField: 'discontinued',
        updateValue: '1983-10-02',
        expectedIntroducedValue: '01 Sep 1982',
        expectedDiscontinuedValue: '02 Oct 1983',
        expectedCompanyValue: '-'
      },
      {
          testName: 'Update empty discontinued field value with a new valid value',
          name: utilMethods.utils_generateRandomAlphaNumericString(),
          introduced: '1982-09-01',
          discontinued: '',
          company: '',
          updateField: 'discontinued',
          updateValue: '1983-10-02',
          expectedIntroducedValue: '01 Sep 1982',
          expectedDiscontinuedValue: '02 Oct 1983',
          expectedCompanyValue: '-'
      },
      {
        testName: 'Update existing company field value with a new valid value',
        name: utilMethods.utils_generateRandomAlphaNumericString(),
        introduced: '1982-09-01',
        discontinued: '1982-09-01',
        company: 4,
        updateField: 'company',
        updateValue: 5,
        expectedIntroducedValue: '01 Sep 1982',
        expectedDiscontinuedValue: '01 Sep 1982',
        expectedCompanyValue: 5
      },
      {
          testName: 'Update empty company field value with a new valid value',
          name: utilMethods.utils_generateRandomAlphaNumericString(),
          introduced: '1982-09-01',
          discontinued: '',
          company: '',
          updateField: 'company',
          updateValue: 4,
          expectedIntroducedValue: '01 Sep 1982',
          expectedDiscontinuedValue: '-',
          expectedCompanyValue: 4
      },
      {
        testName: 'Replace computer my updating name for a computer that has existing Introduced field value',
        name: utilMethods.utils_generateRandomAlphaNumericString(),
        introduced: '1982-09-01',
        discontinued: '',
        company: '',
        updateField: 'name',
        updateValue: function() {
            return this.name + "new";
          },
        expectedIntroducedValue: '01 Sep 1982',
        expectedDiscontinuedValue: '-',
        expectedCompanyValue: '-'
      },
      {
        testName: 'Replace computer my updating name for a computer that has existing discontinued field value',
        name: utilMethods.utils_generateRandomAlphaNumericString(),
        introduced: '',
        discontinued: '1982-09-01',
        company: '',
        updateField: 'name',
        updateValue: function() {
            return this.name + "new";
          },
        expectedIntroducedValue: '-',
        expectedDiscontinuedValue: '01 Sep 1982',
        expectedCompanyValue: '-'
      },
      {
        testName: 'Replace computer my updating name for a computer that has existing company field value',
        name: utilMethods.utils_generateRandomAlphaNumericString(),
        introduced: '1982-09-01',
        discontinued: '',
        company: 4,
        updateField: 'name',
        updateValue: function() {
            return this.name + "new";
          },
        expectedIntroducedValue: '01 Sep 1982',
        expectedDiscontinuedValue: '-',
        expectedCompanyValue: 4
      },
      {
        testName: 'Replace computer my updating name for a computer that has existing special characters',
        name: utilMethods.utils_generateRandomSpecialCharsString(),
        introduced: '1982-09-01',
        discontinued: '',
        company: '',
        updateField: 'name',
        updateValue: function() {
            return this.name + "new";
          },
        expectedIntroducedValue: '01 Sep 1982',
        expectedDiscontinuedValue: '-',
        expectedCompanyValue: '-'
      },
  ];


describe('CRUD Operations', () => {
    updateComputerInputs.forEach(function (input) {
        var testName = input.testName 
        var name = input.name 
        var introduced = input.introduced 
        var discontinued = input.discontinued 
        var company = input.company 
        var updateField = input.updateField 
        var updateValue = input.updateValue 
        var expectedIntroducedValue = input.expectedIntroducedValue 
        var expectedDiscontinuedValue = input.expectedDiscontinuedValue 
        var expectedCompanyValue = input.expectedCompanyValue 
        it(`Should be able to ${testName}`, () => {
            browser.api_createComputer(name, introduced, discontinued, company)
            browser.homePage_displayTableFilteredByNameModifyingURL(name)
            browser.homePage_selectFirstComputerInTable()
            browser.homePage_addElementToListOfIDsTOBeCleanedUp()
            if(updateField == "introduced"){
                browser.editDeletePage_fillAndSubmitUpdateComputerForm("", updateValue,"","")
            }
            if(updateField == "discontinued"){
                browser.editDeletePage_fillAndSubmitUpdateComputerForm("", "", updateValue, "")
            }
            if(updateField == "company"){
                browser.editDeletePage_fillAndSubmitUpdateComputerForm("", "", "",updateValue)
            }
            if(updateField == "name"){
                updateValue = input.updateValue()
                browser.editDeletePage_fillAndSubmitUpdateComputerForm(updateValue, "", "","")
                name = updateValue
            }
            browser.homePage_displayTableFilteredByNameModifyingURL(name)
            const [nameres, introducedres, discontinuedres, companyres] = browser.homePage_getValuesCorrespondingToComputerInATable(name)
            expect(nameres).toEqual(name)
            expect(introducedres).toEqual(expectedIntroducedValue)
            expect(discontinuedres).toEqual(expectedDiscontinuedValue)
            if(expectedCompanyValue != '-'){
                expect(companyres).toEqual(browser.config.additional.listOfCompanies[expectedCompanyValue])
            }
            else {
                expect(companyres).toEqual(expectedCompanyValue)
            }
        });
    })
});


