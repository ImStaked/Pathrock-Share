# Subquery Learning Excersise

## Prepare System
- Add User Account and log in
  ```
  useradd -U -s /bin/bash -m -d /home/subquery subquery
  usermod -a -G sudo subquery
  usermod -a -G admin subquery
  usermod -a -G adm subquery
  passwd subquery
  su subquery
  ```
- Install Prerequisites
  ```
  cd $HOME
  git clone https://github.com/ImStaked/Pathrock-Share.git
  chmod +x Pathrock-Share/subquery/prerequisites.sh
  $HOME/Pathrock-Share/subquery/prerequisites.sh
  ```
- Install the SubQuery CLI
  ```
  sudo npm install -g @subql/cli
  ```

## Initialize Subquery Project
- Usage
  ```
  subql init [PROJECTNAME] [-f] [-l <value>] [--install-dependencies] [--npm] [--abiPath <value>]
  ```
- Example
  * Initialize a project named Gravatar
    ```
    subql init Gravatar
    cd Gravatar
    ```
  #### Install the new project’s dependencies
    ```
    npm install
    ```
## Three files will need to be updated
- Edit the datasources section of the project manifest file(project.ts) to look like this
  ```
  {
    dataSources: [
      {
        kind: EthereumDatasourceKind.Runtime,
        startBlock: 6175243,
  
        options: {
          // Must be a key of assets
          abi: "gravity",
          address: "0x2E645469f354BB4F5c8a05B3b30A929361cf77eC",
        },
        assets: new Map([["gravity", { file: "./abis/Gravity.json" }]]),
        mapping: {
          file: "./dist/index.js",
          handlers: [
            {
              kind: EthereumHandlerKind.Event,
              handler: "handleNewGravatar",
              filter: {
                topics: ["NewGravatar(uint256,address,string,string)"],
              },
            },
            {
              kind: EthereumHandlerKind.Event,
              handler: "handleUpdatedGravatar",
              filter: {
                topics: ["UpdatedGravatar(uint256,address,string,string)"],
              },
            },
          ],
        },
      },
    ],
  }
  ```
- GraphQL Schema
  - Add the schema for Gravatar
  ```
  sudo tee $HOME/Gravitar/schema.graphql > /dev/null <<'EOF'
  type Gravatar @entity {
  id: ID!
  owner: Bytes!
  displayName: String!
  imageUrl: String!
  createdBlock: BigInt!
  EOF
  ```
  - Whenever changes are made to the schema file, please ensure that you regenerate your types directory.
    ```
    npm run-script codegen
    ```
- Mapping functions
  ```
  /src/mappings/
  ``` 

## EVM Project Scaffolding
  - The Gravatar ABI code is located [here](https://etherscan.io/address/0x2e645469f354bb4f5c8a05b3b30a929361cf77ec#code)
  - Copy Contract ABI section and Export the data as json. Save this as Gravity.json
    ```
    sudo tee $HOME/Gravatar/Gravity.json > /dev/null <<'EOF'
    [{"constant":false,"inputs":[{"name":"_imageUrl","type":"string"}],"name":"updateGravatarImage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"setMythicalGravatar","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"getGravatar","outputs":[{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"gravatarToOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ownerToGravatar","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_displayName","type":"string"}],"name":"updateGravatarName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_displayName","type":"string"},{"name":"_imageUrl","type":"string"}],"name":"createGravatar","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"gravatars","outputs":[{"name":"owner","type":"address"},{"name":"displayName","type":"string"},{"name":"imageUrl","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"},{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"displayName","type":"string"},{"indexed":false,"name":"imageUrl","type":"string"}],"name":"NewGravatar","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"},{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"displayName","type":"string"},{"indexed":false,"name":"imageUrl","type":"string"}],"name":"UpdatedGravatar","type":"event"}]
    EOF
    ```
