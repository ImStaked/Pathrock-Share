# Subquery Learning Excersise

### Prepare System
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

### Create Gravatar Project
- Initialize a project named Gravatar
  ```
  subql init Gravatar
  cd Gravatar
  ```
  
- Install the new project’s dependencies
  ```
  npm install
  ```
    
- Three files will need to be updated
  1. Project Manifest File
  
      > ./Gravatar/project.ts
 
    - Update the datasources section of the project manifest file
      ```
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
  2. GraphQL Schema File

    > ./Gravatar/schema.graphql  
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
      - Regenerate your types directory every time the schema is changed.
        ```
        npm run-script codegen
        ```
  3. Mapping functions
     > ./Gravatar/mappingHandlers.ts  
    ```
    import {
    NewGravatarLog,
    UpdatedGravatarLog,
    } from "../types/abi-interfaces/Gravity";
    import { Gravatar } from "../types";
    import assert from "assert";

    export async function handleNewGravatar(log: NewGravatarLog): Promise<void> {
    logger.info("New Gravar at block " + log.blockNumber.toString());

    assert(log.args, "Require args on the logs");

    const gravatar = Gravatar.create({
        id: log.args.id.toHexString()!,
        owner: log.args.owner,
        displayName: log.args.displayName,
        imageUrl: log.args.imageUrl,
        createdBlock: BigInt(log.blockNumber),
    });

    await gravatar.save();
    }

    export async function handleUpdatedGravatar(
    log: UpdatedGravatarLog
    ): Promise<void> {
    logger.info("Updated Gravar at block " + log.blockNumber.toString());

    assert(log.args, "Require args on the logs");

    const id: string = log.args.id.toHexString()!;

    // We first check if the Gravatar already exists, if not we create it
    let gravatar = await Gravatar.get(id);
    if (gravatar == null || gravatar == undefined) {
        gravatar = Gravatar.create({
        id,
        createdBlock: BigInt(log.blockNumber),
        owner: "",
        displayName: "",
        imageUrl: "",
        });
    }
    // Update with new data
    gravatar.owner = log.args.owner;
    gravatar.displayName = log.args.displayName;
    gravatar.imageUrl = log.args.imageUrl;
    await gravatar.save();
    } 
    ``` 
- EVM Project Scaffolding
  - The Gravatar ABI code is located [here](https://etherscan.io/address/0x2e645469f354bb4f5c8a05b3b30a929361cf77ec#code)
  - Copy Contract ABI section and Export the data as json. Save this as Gravity.json
    ```
    mkdir -p abis
    curl -s "https://api.etherscan.io/api?module=contract&action=getabi&address=0x2e645469f354bb4f5c8a05b3b30a929361cf77ec&apikey=WASC1BREZPBZQDWS9T6XX1KBMQ11FMX6FF" | jq .result > abis/Gravity.json
    ```  
    
- Regenerate types directory
  ```
  npm run-script codegen
  ```  
  
- Build the project
  ```
  npm run-script build
  ```  
  
- Run the Project Locally with Docker
  ```
  npm run-script start:docker
  ```
- Query the project
  - Query Address: ```http://HOST_ADDRESS:3000```  
  - You should see a graphql playground and the schemas that are ready to query
  - Example Query
    ```
    query {
      gravatars(first: 2, orderBy: CREATED_BLOCK_DESC) {
        nodes {
          id
          owner
          displayName
          imageUrl
          createdBlock
        }
      }
    }
    ```
