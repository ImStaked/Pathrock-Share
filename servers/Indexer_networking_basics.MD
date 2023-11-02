# This setup currently has 4 generally available proxy server endpoints. I will reference them by the port they listen on.

## Host = sq.pathrocknetwork.org
```
Proxy: 443/tcp - Serves metadata and is how users interact to get data
Proxy: 8010/tcp - Administrative Access Only *see above port scan*
```

## Host = rpc1.pathrocknetwork.org  
```
wscat --connect wss://rpc1.pathrocknetwork.org:8844
Connected (press CTRL+C to quit)
```
Proxy: 5512/tcp - Should not be publicly available
proxy: 5511/tcp - Should not be publicly available
```
