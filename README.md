<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [BasicFrameWorkUsingWebdriverio](#basicframeworkusingwebdriverio)
  - [Summary](#summary)
  - [Execute tests](#execute-tests)
    - [To execute all tests](#to-execute-all-tests)
    - [To execute api tests](#to-execute-api-tests)
    - [To execute create tests](#to-execute-create-tests)
    - [To execute updateReplace tests](#to-execute-updatereplace-tests)
    - [To execute delete tests](#to-execute-delete-tests)
    - [To execute tests with logLevel info](#to-execute-tests-with-loglevel-info)
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

## Execute tests

### To execute all tests
```
yarn test:all
```

### To execute api tests 
```
yarn test:api
```

### To execute create tests 
```
yarn test:create
```

### To execute updateReplace tests 
```
yarn test:updateReplace
```

### To execute delete tests 
```
yarn test:delete
```
### To execute tests with logLevel info
```
yarn test:delete --loglevel=info
```

## Improvements that could be made to the framework
1. Add a html parser. So the response from the API could be parsed and list of companies and details of existing computers could be stored as part of test data. 
2. Add more P3,P4 Tests
3. lint needs to be added
4. Can be made an Async framework
5. Jenkins/Browserstack execution

