
## Scam from random public ip  
  - ```nmap -Pn rpc1.pathrocknetwork.org```
    ```
    PORT     STATE  SERVICE
    22/tcp   open   ssh
    53/tcp   closed domain
    4001/tcp open   newoak
    8080/tcp closed http-proxy
    ``` 
## Scan from my admin ip  
  - ```nmap -Pn rpc1.pathrocknetwork.org```
    PORT     STATE    SERVICE
    22/tcp   open     ssh
    80/tcp   open     http
    111/tcp  filtered rpcbind
    4001/tcp open     newoak
    8443/tcp open     https-alt
    9100/tcp open     jetdirect
