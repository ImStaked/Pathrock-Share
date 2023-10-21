import {
    EthereumProject,
    EthereumDatasourceKind,
    EthereumHandlerKind,
  } from "@subql/types-ethereum";
  
  // Can expand the Datasource processor types via the generic param
  const project: EthereumProject = {
    specVersion: "1.0.0",
    version: "0.0.1",
    name: "pionNodes",
    description:
      "This project indexes all Nodes on Pion",
    runner: {
      node: {
        name: "@subql/node-ethereum",
        version: ">=3.0.0",
      },
      query: {
        name: "@subql/query",
        version: "*",
      },
    },
    schema: {
      file: "./schema.graphql",
    },
    network: {
      chainId: "1",
      /**
       * These endpoint(s) should be public non-pruned archive node
       * We recommend providing more than one endpoint for improved reliability, performance, and uptime
       * Public nodes may be rate limited, which can affect indexing speed
       * When developing your project we suggest getting a private API key
       */
      endpoint: [""],
      dictionary: "https://gx.api.subquery.network/sq/subquery/eth-dictionary",
    },

    dataSources: [
        {
          kind: EthereumDatasourceKind.Runtime,
          startBlock: 18280000,
// TierSetter
          options: {
            // Must be a key of assets
            abi: "TierSetter",
            address: "0xF904Bf8eC671c548b6A8C69ABC27D65955E6472E",
          },
           assets: new Map([["TierSetter", { file: "./abis/TierSetter.json" }]]),
          mapping: {
            file: "./dist/index.js",
            handlers: [
                {
                kind: EthereumHandlerKind.Event,
                handler: "handleSetTier",
                filter: {
                  topics: [""setTier(address,uint8,uint256,bytes)""],
                },
                    
                {
                kind: EthereumHandlerKind.Event,
                handler: "handleOwnershipTransferred",
                filter: {
                  topics: [""OwnershipTransferred(address,address)""],
                },                
              },           
            ]
          }

// Must set default to the project instance
export default project;
