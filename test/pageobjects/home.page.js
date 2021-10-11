const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
    /**
     * define selectors using getter methods
     */
    get searchbox () { return $('#searchbox') }
    get searchsubmit () { return $('#searchsubmit') }
    get addANewComputer () { $('#add').waitForDisplayed(5000); return $('#add') }
    get pagination () { return $('#pagination')}
    get header () { return $('.topbar')}

    get alert () { return $('.alert-message warning')}

    /**
     * a method to encapsule automation code to interact with the page
     */
    async homePage_searchForComputer (computerName) {
        await this.searchbox.setValue(computerName);
        await this.searchsubmit.click();
    }

    async homePage_getHeaderTest () {
        await this.header.textContent();
    }

    async homePage_areTheContentsOfThePageCorrectlyDisplayed () {
        await this.searchbox.exists();
        await this.searchsubmit.exists();
        await this.addANewComputer.exists();
        await this.pagination.exists();
        await this.header.exists();
    }

    async homePage_getHeaderTest () {
        await this.header.textContent();
    }


}

module.exports = new HomePage();
