
describe('CRUD Operations', () => {
    xit('Should be able to add a new computer', () => {
        console.log(browser.api_createComputer("abcd7", "", "", "" ))
    });

    it('Should be able to delete an existing computer', () => {
        for(var i = 580; i<720; i++)
        browser.api_deleteComputer(`/${i}/delete`, "POST")
    });
});


