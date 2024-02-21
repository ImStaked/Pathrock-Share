./subql-indexer-proxy --help

```
Indexer Proxy 1.3.9
Command line for starting indexer proxy server

USAGE:
    subql-indexer-proxy [FLAGS] [OPTIONS]

FLAGS:
    -a, --auth       Enable auth
    -d, --debug      Enable debug mode
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
        --bootstrap <bootstrap>...               Bootstrap seeds for p2p network with MultiAddr style
        --endpoint <endpoint>                    Endpoint of this service [default: http://0.0.0.0:8080]
        --free-plan <free-limit>                 Free query for consumer limit everyday [default: 60]
        --host <host>                            IP address for the server [default: 0.0.0.0]
    -j, --jwt-secret <jwt-secret>                Secret key for generate auth token [default: ThisIsYourJWT]
        --metrics-token <metrics-token>
            The auth bearer for prometheus fetch metrics [default: thisismyAuthtoken]

        --network <network>                      Blockchain network type [default: ]
        --network-endpoint <network-endpoint>    Blockchain network endpoint [default: ]
        --p2p-port <p2p-port>                    port of p2p network
    -p, --port <port>                            Port the service will listen on [default: 8080]
        --redis-endpoint <redis-endpoint>        Redis client address [default: redis://127.0.0.1/]
        --secret-key <secret-key>                Secret key for decrypt key [default: ThisIsYourSecret]
        --service-url <service-url>              Coordinator service endpoint [default: http://127.0.0.1:8000]
        --telemetry <telemetry>                  Open telemetry for SubQuery [default: true]
        --token-duration <token-duration>        Auth token duration hours [default: 12]
```
