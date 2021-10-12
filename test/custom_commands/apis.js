/**
 * * @Definition Contains all the custom commands created to Create and delete computer using APIs
 * Uses Node fetch library for invoking the calls
*/

const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

module.exports = browser => {
    browser.addCommand('api_createComputer', (name, introduced, discontinued, company) => {
        var postRequestHeaders = new fetch.Headers();
        postRequestHeaders.append("Connection", "keep-alive");
        postRequestHeaders.append("Cache-Control", "max-age=0");
        postRequestHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("name", name);
        urlencoded.append("introduced", introduced);
        urlencoded.append("discontinued", discontinued);
        urlencoded.append("company", company);

        var requestOptions = {
            method: 'POST',
            headers: postRequestHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        const getPostResponse = browser.call(async () => {
            return new Promise((resolve, reject) => {
                return fetch(browser.config.baseUrl, requestOptions)
                .then(response => {
                    return response.text()
                })
                .then(response => {
                    return resolve(response);
                })
                .catch(error => {
                    console.log('error', error)
                    return reject(error);
                });
            });
        });
        browser.homePage_Open()
        browser.homePage_displayTableFilteredByNameModifyingURL(name)
        browser.homePage_selectFirstComputerInTable()
        browser.homePage_addElementToListOfIDsTOBeCleanedUp()
        return getPostResponse
    });

    browser.addCommand('api_deleteComputer', (path) => {
        var postRequestHeaders = new fetch.Headers();
        postRequestHeaders.append("Connection", "keep-alive");
        postRequestHeaders.append("Cache-Control", "max-age=0");

        var requestOptions = {
            method: 'POST',
            headers: postRequestHeaders,
            redirect: 'follow'
        };
        const getPostResponse = browser.call(async () => {
            return new Promise((resolve, reject) => {
                return fetch(browser.config.baseUrl + path, requestOptions)
                .then(response => {
                    if(response.status != 200) {
                        return response.status
                    }
                    return response.text()
                })
                .then(response => {
                    return resolve(response);
                })
                .catch(error => {
                    console.log('error', error)
                    return reject(error);
                });
            });
        });
        return getPostResponse
    });
};