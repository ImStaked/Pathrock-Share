# Network Configuration

This setup has 4 generally available proxy server endpoints. I will reference them by the port they listen on.  
I can draw a picture if it would be helpful.

## Host = sq.pathrocknetwork.org
```
Proxy: 443/tcp - Serves metadata and is how users interact to get data
Proxy: 8010/tcp - Administrative Access Only *see above port scan*
```

## Host = rpc1.pathrocknetwork.org  
```
Proxy: 5512/tcp - Should not be publicly available
proxy: 5511/tcp - Should not be publicly available
```
