<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [BasicFrameWorkUsingWebdriverio](#basicframeworkusingwebdriverio)
  - [Summary](#summary)
  - [Execute tests](#execute-tests)
    - [Install Build](#install-build)
    - [To execute all tests](#to-execute-all-tests)
    - [To execute create tests](#to-execute-create-tests)
    - [To execute updateReplace tests](#to-execute-updatereplace-tests)
    - [To execute delete tests](#to-execute-delete-tests)
    - [To execute tests with logLevel info](#to-execute-tests-with-loglevel-info)
    - [To execute Display tests](#to-execute-display-tests)
    - [To execute api tests](#to-execute-api-tests)
  - [Improvements that could be made to the framework](#improvements-that-could-be-made-to-the-framework)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# BasicFrameWorkUsingWebdriverio


## Summary
This framework features
1. Page Object model, without having to create classes
2. Storing of resources(Computer Names) created during Automation
3. Clean up of all the resources created during exit 
4. Using data driven testing
5. Custom logger command. 
6. Used Spec reporter to display results
7. Executes some of the tests on multiple tabs
8. Tested on Mac Chrome browser
9. Screenshot on Failure

## Execute tests

### Install Build
```
yarn install
```

### To execute all tests
```
yarn test:all
```
Laucnhes 5 instances of chrome and exExecutes the tests in parallel 34 tests in 54 seconds

### To execute create tests 
```
yarn test:create
```
Has 17 tests and takes 50s to execute

### To execute updateReplace tests 
```
yarn test:updateReplace
```
Has 10 tests and takes 25s to complete
### To execute delete tests 
```
yarn test:delete
```
Has 4 tests and takes 9s to execute

### To execute tests with logLevel info
```
yarn test:delete --loglevel=info
```
### To execute Display tests 
```
yarn test:homePageDisplay
```
Has 2 tests and takes around 10 s to execute
### To execute api tests 
```
yarn test:api
```

Has 1 test and takes 3s to execute

## Improvements that could be made to the framework
1. Add a html parser. So the response from the API could be parsed and list of companies and details of existing computers could be stored as part of test data. 
2. Add more P3,P4 Tests
3. lint needs to be added
4. Can be made an Async framework
5. Jenkins/Browserstack execution

