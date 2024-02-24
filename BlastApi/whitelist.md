## BlastApi Whitelist

- **Create an ipset for blast api whitelist and add the ip's**  
  ```
  ipset create blast_api hash:ip
  ```

- **Add the ip addresses to the whitelist**  
  [BlastApi Whitelist](https://docs.blastapi.io/running-a-node/ip-whitelist)
  ```
  ipset add blast_api 162.19.232.109
  ipset add blast_api 162.19.232.108
  ipset add blast_api 162.19.232.110
  ipset add blast_api 141.95.94.21
  ipset add blast_api 141.95.94.20
  ipset add blast_api 141.95.94.19
  ipset add blast_api 15.204.140.80
  ipset add blast_api 15.204.141.67
  ipset add blast_api 15.204.198.207
  ipset add blast_api 135.148.211.147
  ipset add blast_api 135.148.211.148
  ipset add blast_api 135.148.211.149
  ipset add blast_api 15.235.144.191
  ipset add blast_api 15.235.144.206
  ipset add blast_api 15.235.144.207
  ipset add blast_api 139.99.67.135
  ipset add blast_api 139.99.53.186
  ipset add blast_api 139.99.53.189
  ipset add blast_api 15.204.52.134
  ipset add blast_api 15.204.52.125
  ipset add blast_api 15.204.52.131
  ipset add blast_api 147.135.102.151
  ipset add blast_api 147.135.102.200
  ipset add blast_api 51.81.232.143
  ```
  
- **Create firewall rules as needed**    
  *Example:*  
  ```
  iptables -A INPUT -m set --match-set blast_api src -p tcp -m tcp --dport 443 -j ACCEPT
  ```
  
- **Install package to make ipset persistent**  
  ```
  sudo apt install ipset-persistent
  ```

- **Save the IPset**
  ```
  ipset save > /etc/iptables/ipsets
  ```

  
