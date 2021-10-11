const computerPage = require('./computer.page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class DeletePage extends computerPage {
    /**
     * define selectors using getter methods
     */
    get deleteButton () { 
        var selector = $("input[value='Delete this computer']")
        selector.waitForDisplayed(5000)
        return selector
    }

    async deleteComputer() {
        this.deleteButton.click()
    }
}


module.exports = new DeletePage();