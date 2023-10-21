import {
    EthereumProject,
    EthereumDatasourceKind,
    EthereumHandlerKind,
  } from "@subql/types-ethereum";
  
  // Can expand the Datasource processor types via the generic param
  const project: EthereumProject = {
    specVersion: "1.0.0",
    version: "0.0.1",
    name: "subquery-example-gravatar",
    description:
      "This project can be use as a starting point for developing your new Ethereum SubQuery project, it indexes all Gravatars on Ethereum",
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
      /**
       * chainId is the EVM Chain ID, for Ethereum this is 1
       * https://chainlist.org/chain/1
       */
      chainId: "1",
      /**
       * These endpoint(s) should be public non-pruned archive node
       * We recommend providing more than one endpoint for improved reliability, performance, and uptime
       * Public nodes may be rate limited, which can affect indexing speed
       * When developing your project we suggest getting a private API key
       */
      endpoint: ["https://eth.api.onfinality.io/public"],
      dictionary: "https://gx.api.subquery.network/sq/subquery/eth-dictionary",
    },

    dataSources: [
        {
          kind: EthereumDatasourceKind.Runtime,
          startBlock: 18280000,
    
          options: {
            // Must be a key of assets
            abi: "TierSetter.json",
            address: "0xF904Bf8eC671c548b6A8C69ABC27D65955E6472E",
          },
          
