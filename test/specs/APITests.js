
describe('CRUD Operations', () => {
    it('Should be able to add a new computer', () => {
        console.log(browser.api_createComputer("abcd7", "", "", "" ))
    });

    it('Should be able to delete an existing computer', () => {
        var response = browser.api_deleteComputer("/575/delete", "POST")
    });
});


