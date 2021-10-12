describe('Home Page Display', () => {
    it(`Should display Pagination as expected`, () => {
        browser.homePage_Open()
        const [text, href] = browser.homePage_getPaginationPrev()
        expect(text === '← Previous').toBe(true)
        expect(browser.homePage_getPaginationCurrent()).toHaveTextContaining("Displaying 1 to 10 of ")
        const [textNext, hrefNext] = browser.getPaginationNext()
        expect(textNext === 'Next →').toBe(true)
        expect(hrefNext === '/computers?p=1').toBe(true)
    });
    it(`Should display contents of the page as expected`, () => {
        browser.homePage_areTheContentsOfThePageCorrectlyDisplayed()
    })
});


