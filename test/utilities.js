/*
Contains all the utility methods used to generate different kinds of strings that can be used as test data
*/

function generateRandomString(characters, length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

const utilMethods = {
    utils_generateRandomAlphaNumericString(length = 5) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return generateRandomString(characters, length)
    },
    utils_generateRandomNumericString(length = 5) {
        const characters = '0123456789';
        return generateRandomString(characters, length)
    },
    utils_generateRandomAlphaString(length = 5) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        return generateRandomString(characters, length)
    },
    utils_generateRandomSpecialCharsString(length = 4) {
        const characters = '!@#^%$*'
        return generateRandomString(characters, length)
    },
    utils_getRandomCompanyIndex() {       
        const numberOfCompanies = browser.config.additional.listOfCompanies.length
        return getRandomIntInclusive(1, numberOfCompanies)
    },
}

module.exports = { utilMethods };
