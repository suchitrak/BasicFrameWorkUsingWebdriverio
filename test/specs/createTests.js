const {utilMethods} = require('../utilities.js')

const createComputerInputs = [
    {
      testName: 'Only name field provided as AlphaNumericString',
      name: utilMethods.utils_generateRandomAlphaNumericString(),
      introduced: '',
      discontinued: '',
      company: '',
      expectedIntroducedValue: '-',
      expectedDiscontinuedValue: '-',
      expectedCompanyValue: '-'
    },
    {
        testName: 'Only name field provided as NumericString',
        name: utilMethods.utils_generateRandomNumericString(),
        introduced: '',
        discontinued: '',
        company: '',
        expectedIntroducedValue: '-',
        expectedDiscontinuedValue: '-',
        expectedCompanyValue: '-'
    },
    {
        testName: 'Only name field provided as AlphaString',
        name: utilMethods.utils_generateRandomAlphaString(),
        introduced: '',
        discontinued: '',
        company: '',
        expectedIntroducedValue: '-',
        expectedDiscontinuedValue: '-',
        expectedCompanyValue: '-'
    },
    { // Not working 
        testName: 'Only name field provided as SpecialCharsString',
        name: utilMethods.utils_generateRandomSpecialCharsString(),
        introduced: '',
        discontinued: '',
        company: '',
        expectedIntroducedValue: '-',
        expectedDiscontinuedValue: '-',
        expectedCompanyValue: '-'
    },
    {
        testName: 'Only name, introduced field provided as AlphaNumericString',
        name: utilMethods.utils_generateRandomAlphaNumericString(),
        introduced: '1982-09-01',
        discontinued: '',
        company: '',
        expectedIntroducedValue: '01 Sep 1982',
        expectedDiscontinuedValue: '-',
        expectedCompanyValue: '-'
    },
    {
        testName: 'Only name, introduced, discontinued field provided',
        name: utilMethods.utils_generateRandomAlphaNumericString(),
        introduced: '1982-09-01',
        discontinued: '1982-09-01',
        company: '',
        expectedIntroducedValue: '01 Sep 1982',
        expectedDiscontinuedValue: '01 Sep 1982',
        expectedCompanyValue: '-'
    },
    {
        testName: 'all field provided',
        name: utilMethods.utils_generateRandomAlphaNumericString(),
        introduced: '1982-09-01',
        discontinued: '1982-09-01',
        company: 2,
        expectedIntroducedValue: '01 Sep 1982',
        expectedDiscontinuedValue: '01 Sep 1982',
        expectedCompanyValue: 2
    },
    // {
    //     testName: 'existing name all other fields empty',
    //     name: 'existing',
    //     introduced: '',
    //     discontinued: '',
    //     company: '',
    //     expectedIntroducedValue: '-',
    //     expectedDiscontinuedValue: '-',
    //     expectedCompanyValue: '-'
    //   },
    //   {
    //     testName: 'existing name and all other fields exactly the sames',
    //     name: 'existing',
    //     introduced: '1982-09-01',
    //     discontinued: '1982-09-01',
    //     company: 2,
    //     expectedIntroducedValue: '01 Sep 1982',
    //     expectedDiscontinuedValue: '01 Sep 1982',
    //     expectedCompanyValue: 2
    // },
  ];

  const createComputerInputsInvalid = [
    {
      testName: 'All Empty Fields',
      name: "",
      introduced: '',
      discontinued: '',
      company: '',
      errorDisplayedOn: "name"
    },
    {
        testName: 'Empty Name field',
        name: "",
        introduced: '1982-09-01',
        discontinued: '1982-09-01',
        company: 4,
        errorDisplayedOn: "name"
    },
    {
        testName: 'Invalid Introduced Field',
        name: utilMethods.utils_generateRandomAlphaString(),
        introduced: utilMethods.utils_generateRandomAlphaString(),
        discontinued: '',
        company: '',
        errorDisplayedOn: "introduced"
    },
    {
        testName: 'Invalid discontinued Field',
        name: utilMethods.utils_generateRandomSpecialCharsString(),
        introduced: '',
        discontinued: utilMethods.utils_generateRandomSpecialCharsString(),
        company: '',
        errorDisplayedOn: "discontinued"
    },
]


describe('CRUD Operations - Create', () => {
    createComputerInputs.forEach(function (input) {
        let introduced = input.introduced;
        let discontinued = input.discontinued;
        let company = input.company
        let name = input.name; 
        it(`Should be able to add a new computer with ${input.testName}`, () => {
            browser.homePage_Open()
            browser.homePage_clickaddNewComputer()
            browser.createPage_getHeaderOnCreatePage()
            expect(browser.createPage_getHeaderOnCreatePage() === "Add a computer").toBe(true)
            browser.createPage_displayedAsExpected()
            browser.createPage_fillAndSubmitCreateUserForm(name,introduced,discontinued,company)
            expect(browser.homePage_getAlertMessage() === `Done! Computer ${name} has been created`).toBe(true)
            browser.homePage_displayTableFilteredByNameModifyingURL(name)
            expect(browser.homePage_getFirstComputerInTable() === name).toBe(true)
            const [nameres, introducedres, discontinuedres, companyres] = browser.homePage_getValuesCorrespondingToComputerInATable(name)
            expect(nameres === name).toBe(true)
            expect(introducedres).toEqual(input.expectedIntroducedValue)
            expect(discontinuedres).toEqual(input.expectedDiscontinuedValue)
            if(input.expectedCompanyValue != '-'){
                expect(companyres).toEqual(browser.config.additional.listOfCompanies[input.expectedCompanyValue])
            }
            else {
                expect(companyres).toEqual(input.expectedCompanyValue)
            }
            
            browser.homePage_selectFirstComputerInTable()
            browser.homePage_addElementToListOfIDsTOBeCleanedUp()
        });
    })
    createComputerInputsInvalid.forEach(function (input) {
        let introduced = input.introduced;
        let discontinued = input.discontinued;
        let company = input.company
        let name = input.name;
        let errorDisplayedOn =  input.errorDisplayedOn;
        it(`Should display error when trying to create computer with ${input.testName}`, () => {
            browser.homePage_Open()
            browser.homePage_clickaddNewComputer()

            if(errorDisplayedOn == "introduced") {
                var colorBefore = browser.commonCRUDPage_getColorIntroduced()
            }
            if(errorDisplayedOn == "discontinued") {
                var colorBefore = browser.commonCRUDPage_getColorDiscontinued()
            }
            if(errorDisplayedOn == "name") {
                var colorBefore = browser.commonCRUDPage_getColorName()
            }
            
            browser.createPage_fillAndSubmitCreateUserForm(name,introduced,discontinued,company)

            if(errorDisplayedOn == "introduced") {
                var colorAfter = browser.commonCRUDPage_getColorIntroduced()
            }
            if(errorDisplayedOn == "discontinued") {
                var colorAfter = browser.commonCRUDPage_getColorDiscontinued()
            }
            if(errorDisplayedOn == "name") {
                var colorAfter = browser.commonCRUDPage_getColorName()
            }
            expect(colorBefore).not.toEqual(colorAfter)
        });
    })
    
    it(`Should be able to create Mulitple Computers with exact same Values`, () => {
        browser.homePage_Open()
        var name = utilMethods.utils_generateRandomAlphaNumericString();
        var introduced = '1982-09-01';
        var discontinued = '1982-09-01';
        var company = 2;
        var numberOfTestIterations = 5
        
        for( var i = 0; i < numberOfTestIterations; i++) {
            browser.homePage_Open()
            browser.homePage_clickaddNewComputer()
            browser.createPage_getHeaderOnCreatePage()
            browser.createPage_fillAndSubmitCreateUserForm(name,introduced,discontinued,company)
            expect(browser.homePage_getAlertMessage() === `Done! Computer ${name} has been created`).toBe(true)
            browser.homePage_displayTableFilteredByNameModifyingURL(name)
            browser.homePage_selectFirstComputerInTable()
            browser.homePage_addElementToListOfIDsTOBeCleanedUp()
        }
        browser.homePage_Open()
        browser.homePage_displayTableFilteredByNameModifyingURL(name)
        expect(browser.homePage_getNumberOfRowsInTable()).toEqual(numberOfTestIterations)
    });



})

