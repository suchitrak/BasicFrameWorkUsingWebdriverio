# BasicFrameWorkUsingWebdriverio


## Summary
This framework features
1. Page Object model, without having to create classes
2. Storing of resources(Computer Names) created during Automation
3. Clean up of all the resources created during exit 
4. Using data driven testing
5. Custom logger command. 

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

