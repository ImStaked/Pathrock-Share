# Near Subquery


### Near Archive Node

- Download Data
  ```
  aws s3 --no-sign-request cp s3://near-protocol-public/backups/testnet/archive/latest .
  LATEST=$(cat latest)
  aws s3 --no-sign-request cp --no-sign-request --recursive s3://near-protocol-public/backups/testnet/archive/$LATEST ~/.near/data
  ```


#### Links  
  - Code  
  [Source Code](https://github.com/subquery/near-dictionary/blob/main/src/mappings/mappingHandlers.ts)
