#  162.55.85.47  -- rpc1.pathrocknetwork.org 

### Testing all ports FROM an anonymous IP address. This is what the public sees. 
  - IPv4  
    ```nmap -Pn rpc1.pathrocknetwork.org```
    ```
    PORT     STATE  SERVICE
    22/tcp   open   ssh
    53/tcp   closed domain
    4001/tcp open   newoak
    8080/tcp closed http-proxy
    ```
    11/11/23 port scan
    ```
    22/tcp    open   ssh
    53/tcp    closed domain
    4001/tcp  open   IPFS
    8080/tcp  closed INDEXER_ADMIN
    9999/tcp  closed POLKADOT_RPC
    12345/tcp open   SQUID_WORKER
    ``` 
  - IPv6 disabled to many networks
    ```nmap -6Pn -T4 2a01:4f8:271:1505::2```
    ```
    PORT     STATE  SERVICE
    53/tcp   closed domain
    4001/tcp open   newoak
    8011/tcp closed unknown
    8080/tcp closed http-proxy
    ```
  - IPV6 disabled 11-11

### Scan from my admin ip  
    - IPv4 scan  
    ```nmap -Pn sq.pathrocknetwork.org```
    ```
    Other addresses for sq.pathrocknetwork.org (not scanned): 2001:41d0:700:641e::
    rDNS record for 141.95.97.30: ns3215867.ip-141-95-97.eu
    PORT     STATE    SERVICE
    443/tcp  open     INDEXER 
    646/tcp  filtered ldp
    1080/tcp open     INDEXER_PROXY
    2288/tcp filtered netml
    5432/tcp filtered postgresql
    8000/tcp filtered http-alt
    8010/tcp filtered xmpp
    8011/tcp filtered unknown
    9100/tcp filtered jetdirect
    ``` 
    nmap -6Pn sq.pathrocknetwork.org
    ```
    Unfinished
    ```
  - Admin access is only via ipv4 so no need to scan from my admin ip


### 12-7-23 Scan results = secure
  ```
  Nmap scan report for rpc1.pathrocknetwork.org (162.55.85.47)
  Host is up (0.18s latency).
  rDNS record for 162.55.85.47: static.47.85.55.162.clients.your-server.de
  Not shown: 994 filtered ports
  PORT      STATE  SERVICE
  22/tcp    open   ssh
  53/tcp    closed domain
  4001/tcp  open   ipfs
  8080/tcp  closed http-proxy
  9999/tcp  closed abyss
  12345/tcp open   squid
  ```
