# @subql/query

## Run this package

To quickly setup the project, add a `.env` file in the `subql/packages/query` folder with the following content:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_DATABASE=postgres
```

then run the following command

```
$ NODE_OPTIONS="-r dotenv/config" yarn start -- --name <subuqery_name> --playground
```

OR Create a systemd service
```
subql-query --aggregate true --indexer 127.0.0.1:3001 --max-connection 10 --name schema_qmxwfcf8858yy92 --port 4000 --playground true --query-timeout 2500 --subscription --log-level info --log-path /home/subquery/subquery/logs/kusama-query.log 
```


HELP CONTENTS
```
Options:
      --help                     Show help                             [boolean]
      --version                  Show version number                   [boolean]
      --aggregate                Enable aggregate feature
                                                       [boolean] [default: true]
      --disable-hot-schema       Hot reload schema on schema-changes
                                                      [boolean] [default: false]
      --dictionary-optimisation  Dictionary optimisation
                                                      [boolean] [default: false]
      --indexer                  Url that allows query to access indexer
                                 metadata                               [string]
      --log-level                Specify log level to print.
          [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                     "silent"] [default: "info"]
      --log-path                 Path to create log file e.g ./src/name.log
                                                                        [string]
      --log-rotate               Rotate log files in directory specified by
                                 log-path             [boolean] [default: false]
      --max-connection           Max connection to pg pool[number] [default: 10]
  -n, --name                     Project name                [string] [required]
      --output-fmt               Print log as json or plain text
                      [string] [choices: "json", "colored"] [default: "colored"]
      --pg-ca                    Postgres ca certificate - to enables TLS/SSL
                                 connections to your PostgreSQL, path to the
                                 server certificate file are required, e.g
                                 /path/to/server-certificates/root.crt  [string]
      --pg-key                   Postgres client key - Path to key file e.g
                                 /path/to/client-key/postgresql.key     [string]
      --pg-cert                  Postgres client certificate - Path to client
                                 certificate e.g
                                 /path/to/client-certificates/postgresql.crt
                                                                        [string]
  -p, --port                     The port the service will bind to      [number]
      --playground               Enable graphql playground             [boolean]
      --playground-settings      Pass the settings to the graphql playground
                                 (JSON format)                          [string]
      --query-limit              Set limit on number of query results per entity
                                                         [number] [default: 100]
      --query-batch-limit        Set limit on number on the maximum batch
                                 queries                                [number]
      --query-depth-limit        Set limit on query depth               [number]
      --query-alias-limit        Set limit on query alias limit         [number]
      --query-complexity         Level of query complexity              [number]
      --query-timeout            Query timeout in milliseconds
                                                       [number] [default: 10000]
      --query-explain            Explain query in SQL statement        [boolean]
      --unsafe                   Disable limits on query depth and allowable
                                 number returned query records         [boolean]
      --subscription             Enable subscription service
                                                      [boolean] [default: false]
```
