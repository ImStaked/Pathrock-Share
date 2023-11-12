### haproxy -vv
  ```
  HAProxy version 2.9-dev9 2023/11/04 - https://haproxy.org/
  Status: development branch - not safe for use in production.
  Known bugs: https://github.com/haproxy/haproxy/issues?q=is:issue+is:open
  Running on: Linux 5.15.0-88-generic #98-Ubuntu SMP Mon Oct 2 15:23:16 UTC 2023 aarch64
  Build options :
    TARGET  = linux-glibc
    CPU     = arm64
    CC      = cc
    CFLAGS  = -g -Wall -Wextra -Wundef -Wdeclaration-after-statement -Wfatal-errors -Wtype-limits -Wshift-negative-value -Wshift-overflow=2 -Wduplicated-cond -Wnull-dereference -fwrapv -Wno-address-of-packed-member -Wno-unused-label -Wno-sign-compare -Wno-unused-parameter -Wno-clobbered -Wno-missing-field-initializers -Wno-cast-function-type -Wno-string-plus-int -Wno-atomic-alignment -DTCP_USER_TIMEOUT=18
    OPTIONS = txtUSE_GETADDRINFO=1 USE_OPENSSL=1 USE_LUA=1 USE_SLZ=1 USE_TFO=1 USE_NS=1 USE_SYSTEMD=1 USE_OT=1 USE_PROMEX=1 USE_PCRE2=1 USE_PCRE2_JIT=1
    DEBUG   = -DDEBUG_STRICT -DDEBUG_MEMORY_POOLS
  
  Feature list : -51DEGREES +ACCEPT4 +BACKTRACE -CLOSEFROM +CPU_AFFINITY +CRYPT_H -DEVICEATLAS +DL -ENGINE +EPOLL -EVPORTS +GETADDRINFO -KQUEUE -LIBATOMIC +LIBCRYPT +LINUX_CAP +LINUX_SPLICE +LINUX_TPROXY +LUA +MATH -MEMORY_PROFILING +NETFILTER +NS -OBSOLETE_LINKER +OPENSSL -OPENSSL_AWSLC -OPENSSL_WOLFSSL +OT -PCRE +PCRE2 +PCRE2_JIT -PCRE_JIT +POLL +PRCTL -PROCCTL +PROMEX -PTHREAD_EMULATION -QUIC -QUIC_OPENSSL_COMPAT +RT +SHM_OPEN +SLZ +SSL -STATIC_PCRE -STATIC_PCRE2 +SYSTEMD +TFO +THREAD +THREAD_DUMP +TPROXY -WURFL -ZLIB
  
  Default settings :
    bufsize = 16384, maxrewrite = 1024, maxpollevents = 200
  
  Built with multi-threading support (MAX_TGROUPS=16, MAX_THREADS=256, default=4).
  Built with OpenSSL version : OpenSSL 3.0.2 15 Mar 2022
  Running on OpenSSL version : OpenSSL 3.0.2 15 Mar 2022
  OpenSSL library supports TLS extensions : yes
  OpenSSL library supports SNI : yes
  OpenSSL library supports : TLSv1.0 TLSv1.1 TLSv1.2 TLSv1.3
  OpenSSL providers loaded : default
  Built with Lua version : Lua 5.4.4
  Built with the Prometheus exporter as a service
  Built with network namespace support.
  Built with OpenTracing support.
  Built with libslz for stateless compression.
  Compression algorithms supported : identity("identity"), deflate("deflate"), raw-deflate("deflate"), gzip("gzip")
  Built with transparent proxy support using: IP_TRANSPARENT IPV6_TRANSPARENT IP_FREEBIND
  Built with PCRE2 version : 10.39 2021-10-29
  PCRE2 library supports JIT : yes
  Encrypted password support via crypt(3): yes
  Built with gcc compiler version 11.4.0
  
  Available polling systems :
        epoll : pref=300,  test result OK
         poll : pref=200,  test result OK
       select : pref=150,  test result OK
  Total: 3 (3 usable), will use epoll.
  
  Available multiplexer protocols :
  (protocols marked as <default> cannot be specified using 'proto' keyword)
           h2 : mode=HTTP  side=FE|BE  mux=H2    flags=HTX|HOL_RISK|NO_UPG
         fcgi : mode=HTTP  side=BE     mux=FCGI  flags=HTX|HOL_RISK|NO_UPG
           h1 : mode=HTTP  side=FE|BE  mux=H1    flags=HTX|NO_UPG
    <default> : mode=HTTP  side=FE|BE  mux=H1    flags=HTX
         none : mode=TCP   side=FE|BE  mux=PASS  flags=NO_UPG
    <default> : mode=TCP   side=FE|BE  mux=PASS  flags=
  
  Available services : prometheus-exporter
  Available filters :
          [BWLIM] bwlim-in
          [BWLIM] bwlim-out
          [CACHE] cache
          [COMP] compression
          [FCGI] fcgi-app
          [  OT] opentracing
          [SPOE] spoe
          [TRACE] trace
  ```
