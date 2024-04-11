# Dedicated Hosts standard IPSET config

## ADMIN  
- Create an ipset named admin 
  ```
  ipset create admin hash:ip
  ```
- Whitelist sysadmins personal ip addresses for ssh access
  ```
  ipset add admin 5.161.49.184
  ipset add admin 37.24.110.30
  ```

## SERVER  
- Create ipset named server
  ```
  ipset create server hash:net
  ```
- Add all server IP and netmask
  ```
  ipset add server 10.0.0.0/23
  ipset add server 162.55.85.47/32
  ipset add server 65.108.68.51/32
  ipset add server 144.76.58.93/32
  ipset add server 168.119.212.48/32
  ipset add server 46.4.123.170/32
  ipset add server 65.109.38.38/32
  ipset add server 65.109.68.68/32
  ipset add server 65.21.136.62/32
  ipset add server 135.181.63.61/32
  ipset add server 65.108.229.11/32
  ```

# WHITELIST  
- Create ipset named whitelist 
  ```
  ipset create whitelist hash:ip
  ```
- Add required ip's to the whitelist
  ```
  ipset add whitelist ???-IP-???
  ```

