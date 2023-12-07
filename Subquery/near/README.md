# Near Subquery

## Near Archive Node

- Prerequisites  
  ```
  sudo apt install -y git binutils-dev libcurl4-openssl-dev zlib1g-dev libdw-dev libiberty-dev cmake gcc g++ python docker.io protobuf-compiler libssl-dev pkg-config clang llvm cargo awscli
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
  ```  
- Compile the binary
  ```
  git clone https://github.com/near/nearcore
  cd nearcore
  git fetch origin --tag
  git checkout tags/1.36.0 -b mynode
  make release
  sudo cp target/release/neard /usr/local/bin/
  ```
- Setup the node
  ```
  sudo su near
  neard --home ~/.near init --chain-id mainnet --download-genesis --download-config
  rm ~/.near/config.json
  wget https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/mainnet/config.json -P ~/.near/
  ```
  - Make sure config has 
    ```
    {
      "archive": true,
      "tracked_shards": [0],
    }

- Download Data
  ```
  aws s3 --no-sign-request cp s3://near-protocol-public/backups/mainnet/archive/latest .
  LATEST=$(cat latest)
  aws s3 --no-sign-request cp --no-sign-request --recursive s3://near-protocol-public/backups/mainnet/archive/$LATEST ~/.near/data
  ```
- Systemd Setup
  ```
  neard --home ~/.near run
  ```


#### Links  
  - Code  
  [Source Code](https://github.com/subquery/near-dictionary/blob/main/src/mappings/mappingHandlers.ts)
