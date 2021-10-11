const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AddPage extends Page {
    /**
     * define selectors using getter methods
     */
    get name () { 
        var selector = $('#name')
        selector.waitForDisplayed(5000)
        return $('#name') 
    }
    get nameHelpline () { 
        var selector = $('#name + .help-inline')
        selector.waitForDisplayed(5000)
        return selector
    }

    get introduced () { 
        var selector =  $('#introduced')
        selector.waitForDisplayed(5000)
        return selector
    }
    get introducedHelpline () { 
        selector = $('#introduced + .help-inline')
        selector.waitForDisplayed(5000)
        return selector
    }

    get discontinued () { return $('#discontinued') }
    get discontinuedHelpline () { return $('#discontinued + .help-inline')}

    get company () { return $('#company')}

    get header () { return $('.topbar')}

    get submitButton () { return $('.actions input')}

    get cancelButton () { return $('.actions a')}

    /**
     * a method to encapsule automation code to interact with the page
     */
    async createPage_fillAndSubmitCreateUserForm(computerName, introducedDate, discontinuedDate, company) {
        await this.name.setValue(computerName);
        // await this.introduced.setValue(introducedDate);
        // await this.discontinued.setValue(discontinuedDate);
        
        // await this.company.selectByAttribute('value', '4');
        // await this.company.setValue(company);
        await this.submitButton.click();
    }

    async homePage_areTheContentsOfThePageCorrectlyDisplayed () {
        await this.name.waitForDisplayed({ timeout: 3000 });
        await this.name.exists()
        await this.nameHelpline.exists()

        await this.introduced.exists()
        await this.introducedHelpline.exists()

        await this.discontinued.exists()
        await this.discontinuedHelpline.exists()

        await this.company.exists()

        await this.header.exists()

        await this.submitButton.exists()

        await this.cancelButton.exists()
    }

    async homePage_getHeaderTest () {
        await this.header.textContent();
    }


}

module.exports = new AddPage();
