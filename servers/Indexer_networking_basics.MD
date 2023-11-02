# Network Configuration

This setup has 4 generally available proxy server endpoints. I will reference them by the port they listen on.  
I can draw a picture if it would be helpful.

## *** sq.pathrocknetwork.org ***
```
Proxy: 443/tcp - Serves metadata and is how users interact to get data
Proxy: 8010/tcp - Administrative Access. Restricted by source IP only our 2 ips whitelisted. 
```
## *** rpc1.pathrocknetwork.org ***
```
Proxy: 5512/tcp - Should not be publicly available but is available to all of the workers.
proxy: 5511/tcp - Adminisrative access.  Restricted by source IP only our 2 ips whitelisted. 
```
