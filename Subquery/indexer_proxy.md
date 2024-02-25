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
        --bootstrap /ip4/8.219.198.62/quic/7370,/ip4/167.235.2.206/quic/7370,/ip4/116.202.82.81/quic/7370,/ip4/157.90.33.62/quic/7370,/ip4/49.13.124.193/quic/7370,/ip4/5.9.61.237/quic/7370,/ip4/5.9.186.198/quic/7370,/ip4/185.246.85.43/quic/7370,/ip4/185.246.86.7/quic/7370,/ip4/65.109.30.26/quic/7370,/ip4/65.108.71.82/quic/7370,/ip4/135.181.232.227/quic/7370,/ip4/37.27.12.144/quic/7370,/ip4/37.27.27.85/quic/7370,/ip4/65.108.131.99/quic/7370,/ip4/62.171.152.211/quic/7370,/ip4/5.161.205.253/quic/7370,/ip4/142.215.53.18/quic/7370,/ip4/142.215.53.21/quic/7370,/ip4/212.68.160.177/quic/7370,/ip4/85.239.242.145/quic/7370,/ip4/207.148.117.171/quic/7370
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
