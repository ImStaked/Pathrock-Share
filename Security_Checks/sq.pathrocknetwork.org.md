## 141.95.97.30 - sq.pathrocknetwork.org 


- Ports listening for connections 
    ```
    Protocol       Port               
    tcp            443            IP v4 v6           LISTEN          Subquery Safe (Proxy from 1080)
    tcp            1080           IP v4              LISTEN          Subquery Safe  
    tcp            1976           IP v4              LISTEN          Proxy Statistics
    tcp            22100          IP v4              LISTEN          SSH / safe
    tcp            8010           IP v4              LISTEN          Admin Only / Restricted (Proxy from 8000)
    tcp            8000           IP v4              LISTEN          Admin Only / Restricted 
    tcp            8405           IP v4              LISTEN          Proxy Server Prometheus Metrics Port
    ```
### Testing all ports FROM an anonymous IP address. This is what the public sees.  
- All restricted ports are protected. No sensistive ports open at this time.
    ```
    nmap -Pn 141.95.97.30 
    PORT      STATE    SERVICE
    443/tcp   open     https
    646/tcp   filtered ldp
    1080/tcp  open     socks
    5432/tcp  filtered postgresql
    8000/tcp  filtered http-alt
    8010/tcp  filtered xmpp
    8011/tcp  filtered unknown
    9100/tcp  filtered jetdirect
    ```
    IPv6 scan - ```nmap -6Pn -T4 2p001:41d0:700:641e::```
    ```
    PORT      STATE    SERVICE
    443/tcp   open     https
    ```
    
- Only 2 IP addresses have admin access. To whitelist an ip as an admin use ```sudo ipset administrators IP```  
    This scan is from my admin ip.
    ```
    443/tcp  open  https
    1080/tcp open  socks
    8000/tcp open  http-alt
    8010/tcp open  xmpp
    9100/tcp open  jetdirect
    ```

