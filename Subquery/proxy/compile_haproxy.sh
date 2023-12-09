HAPROXY_Ver="v3.0-dev0"
USE_PROMEX=1 USE_OPENSSL=1 USE_GETADDRINFO=1 USE_IPFREEBIND=1 DEFINE=-DTCP_USER_TIMEOUT=18 USE_SYSTEMD=1 USE_TFO=1 USE_NS=1 USE_LUA=1 USE_SLZ=1 USE_OT=1 USE_PCRE2=1 USE_PCRE2_JIT=1

cd ~
git clone https://github.com/quictls/openssl
 cd openssl
 git checkout OpenSSL_1_1_1t+quic
 sudo mkdir -p /opt/quictls
./Configure --libdir=lib --prefix=/opt/quictls linux-aarm64
make
sudo make install

# Compile Haproxy Latest Version with reqiured features
sudo apt install libssl-dev build-essential make jq libpcre2-dev libcrypt-dev binutils pkg-config libpthread-workqueue-dev cmake pcre2-utils libjemalloc-dev  zlib1g-dev libpcre++-dev libghc-regex-pcre-dev pkgconf libghc-regex-base-dev liblua5.4-dev libopentracing-c-wrapper-dev libsystemd-dev -y

# install libslz library
wget https://github.com/wtarreau/libslz/archive/refs/tags/v1.2.1.tar.gz
tar -xf v1.2.1.tar.gz && cd libslz-1.2.1/
make install

# Make haproxy
git clone https://github.com/haproxy/haproxy.git && cd haproxy
git checkout $HAPROXY_Ver

make -j8 CPU="arm64" TARGET="linux-glibc" ADDLIB="-ljemalloc" USE_PROMEX=1 USE_OPENSSL=1 USE_GETADDRINFO=1 USE_IPFREEBIND=1 DEFINE=-DTCP_USER_TIMEOUT=18 USE_SYSTEMD=1 USE_TFO=1 USE_NS=1 USE_LUA=1 USE_SLZ=1 USE_OT=1 USE_PCRE2=1 USE_PCRE2_JIT=1
cp haproxy /usr/sbin/haproxy
