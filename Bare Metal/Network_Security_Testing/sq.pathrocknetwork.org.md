## 141.95.97.30 - sq.pathrocknetwork.org   

### Testing all ports FROM an anonymous IP address. This is what the public sees.    
  - All restricted ports are protected. No sensistive ports open at this time.  
    IPv4 scan 
    ```nmap -Pn 141.95.97.30```  
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
    IPv6 scan 
    ```nmap -6Pn -T4 2p001:41d0:700:641e::```  
    ```
    PORT      STATE    SERVICE
    443/tcp   open     https
    ```
    
  - Only 2 IP addresses have admin access. To whitelist an ip as an admin use ```sudo ipset administrators IP```    
    This scan is from my admin ip.  
    IPv4 scan ```nmap -Pn 141.95.97.30```  
    ```
    443/tcp  open  https
    1080/tcp open  socks
    8000/tcp open  http-alt
    8010/tcp open  xmpp
    9100/tcp open  jetdirect
    ```


## SCANNED 12-7-23
  Problem found. Ports 8000 and 8010 open to all.
  ```
  Other addresses for sq.pathrocknetwork.org (not scanned): 2001:41d0:700:641e::
  rDNS record for 141.95.97.30: ns3215867.ip-141-95-97.eu
  Not shown: 991 closed ports
  PORT     STATE    SERVICE
  22/tcp   open     ssh
  443/tcp  open     https
  646/tcp  filtered ldp
  1080/tcp open     socks
  5432/tcp filtered postgresql
  8000/tcp open     http-alt
  8010/tcp filtered xmpp
  8011/tcp filtered unknown
  9100/tcp filtered jetdirect
  ```
 
  Problem corrected with rules in the forward table.  
  I verified that admin ip addresses can connect and everyone else can not. 
  ```
  Other addresses for sq.pathrocknetwork.org (not scanned): 2001:41d0:700:641e::
  rDNS record for 141.95.97.30: ns3215867.ip-141-95-97.eu
  Not shown: 991 closed ports
  PORT     STATE    SERVICE
  22/tcp   open     ssh
  443/tcp  open     https
  646/tcp  filtered ldp
  1080/tcp open     socks
  5432/tcp filtered postgresql
  8000/tcp filtered http-alt
  8010/tcp filtered xmpp
  8011/tcp filtered unknown
  9100/tcp filtered jetdirect
  ```
