#  rpc1.pathrocknetwork.org - 162.55.85.47

### Testing all ports FROM an anonymous IP address. This is what the public sees. 
  - ```nmap -Pn rpc1.pathrocknetwork.org```
    ```
    PORT     STATE  SERVICE
    22/tcp   open   ssh
    53/tcp   closed domain
    4001/tcp open   newoak
    8080/tcp closed http-proxy
    ``` 
  - IPv6  
    ```nmap -6Pn -T4 2a01:4f8:271:1505::2```
    ```
    PORT     STATE  SERVICE
    53/tcp   closed domain
    4001/tcp open   newoak
    8011/tcp closed unknown
    8080/tcp closed http-proxy
    ```


### Scan from my admin ip  
  - ```nmap -Pn rpc1.pathrocknetwork.org```
    ```
    PORT     STATE    SERVICE
    22/tcp   open     ssh
    80/tcp   open     http
    111/tcp  filtered rpcbind
    4001/tcp open     newoak
    8443/tcp open     https-alt
    9100/tcp open     jetdirect
    ``` 
  - Admin access is only via ipv4 so no need to scan from my admin ip
