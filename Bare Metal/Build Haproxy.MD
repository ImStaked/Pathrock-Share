#### Requires various libraries QUIC \ ZLIB 

```
#!/bin/bash
VERSION=v2.9-dev11

git clone https://github.com/haproxy/haproxy.git
cd haproxy
git checkout "$VERSION"
make -j4 TARGET=linux-glibc     USE_LUA=1     USE_PCRE=1     USE_ZLIB=1     USE_SYSTEMD=1     USE_PROMEX=1     USE_QUIC=1     USE_OPENSSL=1     SSL_INC=/opt/quictls/include     SSL_LIB=/opt/quictls/lib     LDFLAGS="-Wl,-rpath,/opt/quictls/lib"
```
