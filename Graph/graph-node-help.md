Graph Protocol, Inc.
Scalable queries for a decentralized future
```
USAGE:
    graph-node [OPTIONS]

OPTIONS:
        --admin-port <PORT>
            Port for the JSON-RPC admin server [default: 8020]

        --arweave <{HOST:PORT|URL}>
            HTTP base URL for arweave gateway [env: GRAPH_NODE_ARWEAVE_URL=] [default:
            https://arweave.net]

        --check-config
            validate the configuration and exit

        --config <CONFIG>
            the name of the configuration file [env: GRAPH_NODE_CONFIG=]

        --debug
            Enable debug logging

        --debug-fork <IPFS_HASH>
            IPFS hash of the subgraph manifest that you want to fork [env: GRAPH_DEBUG_FORK=]

        --disable-block-ingestor <DISABLE_BLOCK_INGESTOR>
            Ensures that the block ingestor component does not execute [env:
            DISABLE_BLOCK_INGESTOR=]

        --elasticsearch-password <PASSWORD>
            Password to use for Elasticsearch logging [env: ELASTICSEARCH_PASSWORD]

        --elasticsearch-url <URL>
            Elasticsearch service to write subgraph logs to [env: ELASTICSEARCH_URL=]

        --elasticsearch-user <USER>
            User to use for Elasticsearch logging [env: ELASTICSEARCH_USER=]

        --ethereum-ipc [<NETWORK_NAME:[CAPABILITIES]:FILE>...]
            Ethereum network name (e.g. 'mainnet'), optional comma-seperated capabilities (eg
            'full,archive'), and an Ethereum IPC pipe, separated by a ':' [env: ETHEREUM_IPC=]

        --ethereum-rpc [<NETWORK_NAME:[CAPABILITIES]:URL>...]
            Ethereum network name (e.g. 'mainnet'), optional comma-seperated capabilities (eg
            'full,archive'), and an Ethereum RPC URL, separated by a ':' [env: ETHEREUM_RPC=]

        --ethereum-ws [<NETWORK_NAME:[CAPABILITIES]:URL>...]
            Ethereum network name (e.g. 'mainnet'), optional comma-seperated capabilities (eg
            'full,archive`, and an Ethereum WebSocket URL, separated by a ':' [env: ETHEREUM_WS=]

        --expensive-queries-filename <FILE>
            a file with a list of expensive queries, one query per line. Attempts to run these
            queries will return a QueryExecutionError::TooExpensive to clients [env:
            GRAPH_NODE_EXPENSIVE_QUERIES_FILE=] [default: /etc/graph-node/expensive-queries.txt]

        --fork-base <URL>
            Base URL for forking subgraphs [env: GRAPH_FORK_BASE=]

    -h, --help
            Print help information

        --http-port <PORT>
            Port for the GraphQL HTTP server [env: GRAPH_GRAPHQL_HTTP_PORT=] [default: 8000]

        --index-node-port <PORT>
            Port for the index node server [default: 8030]

        --ipfs <HOST:PORT>
            HTTP addresses of IPFS nodes [env: IPFS=]

        --metrics-port <PORT>
            Port for the Prometheus metrics server [default: 8040]

        --node-id <NODE_ID>
            a unique identifier for this node. Should have the same value between consecutive node
            restarts [env: GRAPH_NODE_ID=] [default: default]

        --postgres-host-weights <WEIGHT,>
            Comma-separated list of relative weights for selecting the main database and secondary
            databases. The list is in the order MAIN,REPLICA1,REPLICA2,...A host will receive
            approximately WEIGHT/SUM(WEIGHTS) fraction of total queries. Defaults to weight 1 for
            each host [env: GRAPH_POSTGRES_HOST_WEIGHTS=]

        --postgres-secondary-hosts <URL,>
            Comma-separated list of host names/IP's for read-only Postgres replicas, which will
            share the load with the primary server [env: GRAPH_POSTGRES_SECONDARY_HOSTS=]

        --postgres-url <URL>
            Location of the Postgres database used for storing entities [env: POSTGRES_URL=]

        --start-block <BLOCK_HASH:BLOCK_NUMBER>
            block hash and number that the subgraph passed will start indexing at [env:
            GRAPH_START_BLOCK=]

        --store-connection-pool-size <STORE_CONNECTION_POOL_SIZE>
            Limits the number of connections in the store's connection pool [env:
            STORE_CONNECTION_POOL_SIZE=] [default: 10]

        --subgraph <[NAME:]IPFS_HASH>
            name and IPFS hash of the subgraph manifest [env: SUBGRAPH=]

        --unsafe-config
            Allows setting configurations that may result in incorrect Proofs of Indexing.

    -V, --version
            Print version information

        --ws-port <PORT>
            Port for the GraphQL WebSocket server [env: GRAPH_GRAPHQL_WS_PORT=] [default: 8001]

````
