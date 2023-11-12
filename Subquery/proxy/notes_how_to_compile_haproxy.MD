sudo apt install libssl-dev build-essential make jq libpcre2-dev libcrypt-dev binutils pkg-config libpthread-workqueue-dev  pcre2-utils cmake libjemalloc-dev

ADDLIB="-ljemalloc" DEFINE=-DTCP_USER_TIMEOUT=18 USE_SYSTEMD=1 USE_TFO=1 USE_NS=1 EXTRA_OBJS="contrib/prometheus-exporter/service-prometheus.o" USE_OPENSSL=1 USE_LUA=1 USE_SLZ=1 USE_SYSTEMD=1 USE_OT=1 USE_PROMEX=1 USE_PCRE2=1 USE_PCRE2_JIT=1

sudo apt install libssl-dev build-essential make jq libpcre2-dev libcrypt-dev binutils pkg-config libpthread-workqueue-dev  pcre2-utils cmake libjemalloc-dev ibghc-zlib-dev zlib1g-dev libpcre++-dev libghc-regex-pcre-dev libghc-regex-base-dev

make -j6 CPU="generic" TARGET="linux-glibc" USE_PROMEX=1 USE_OPENSSL=1 USE_PCRE=1 USE_PCRE_JIT=1 USE_ZLIB=1 USE_GETADDRINFO=1


wget http://git.1wt.eu/web?p=libslz.git;a=snapshot;h=cf8c4668e4b4216e930b56338847d8d46a6bfda9;sf=tgz

wget https://github.com/wtarreau/libslz/archive/refs/tags/v1.2.1.tar.gz
tar -xf v1.2.1.tar.gz

cd libslz-1.2.1/

make install

git clone https://github.com/haproxy/haproxy.git
git checkout v2.9-dev9


make -j6 CPU="generic" TARGET="linux-glibc" USE_PROMEX=1 USE_OPENSSL=1 USE_PCRE=1 USE_PCRE_JIT=1 USE_ZLIB=1 USE_GETADDRINFO=1 USE_IPFREEBIND=1 DEFINE=-DTCP_USER_TIMEOUT=18 USE_SYSTEMD=1 USE_TFO=1 USE_NS=1 EXTRA_OBJS="contrib/prometheus-exporter/service-prometheus.o" USE_OPENSSL=1 USE_LUA=1 USE_SLZ=1 USE_SYSTEMD=1 USE_OT=1 USE_PROMEX=1 USE_PCRE2=1 USE_PCRE2_JIT=1
