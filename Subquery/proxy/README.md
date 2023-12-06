# Haproxy Setup  

1. Install haproxy with the built in prometheus module
   ```
   VERSION=2.8
   sudo apt install --no-install-recommends software-properties-common
   sudo add-apt-repository ppa:vbernat/haproxy-$VERSION -y
   sudo apt install haproxy=$VERSION.\*
   # Get Detailed Version Info
   haproxy -vv
   sudo systemctl daemon-reload && sudo systemctl enable haproxy && sudo systemctl start haproxy
   ```
2. Get ssl cert and configure auto-updates  
   ```
   #!/bin/bash
   DOMAIN="rpc1.pathrocknetwork.org"

   # Install Certbot
   snap install certbot --classic

   # Request Cert
   sudo certbot certonly --standalone -d rpc1.pathrocknetwork.org --non-interactive --agree-tos --email pathrock@protonmail.com --http-01-port=80
   
   # Make SSL directory and combine the 2 cert files into 1 file for haproxy
   sudo mkdir -p /etc/ssl/"$DOMAIN"
   bash -c "cat /etc/letsencrypt/live/"$DOMAIN"/fullchain.pem /etc/letsencrypt/live/"$DOMAIN"/privkey.pem > /etc/ssl/"$DOMAIN"/"$DOMAIN".pem"
   
   # Snap should renew the cert automatically
   # Create Script that runs weekly so when certbot renews the ssl we will put it where it goes before the old cert expires it should renew more than 7 day before expiry
   touch /opt/update-certs.sh
   cat > /opt/update-certs.sh <<EOF
   DOMAIN="rpc1.pathrocknetwork.org"
   bash -c "cat /etc/letsencrypt/live/"$DOMAIN"/fullchain.pem /etc/letsencrypt/live/"$DOMAIN"/privkey.pem > /etc/ssl/"$DOMAIN"/"$DOMAIN".pem"
   service haproxy reload
   EOF
   chmod +x /opt/update-certs.sh
   
   # Schedule script to run daily
   crontab -e  
   0 0 * * 0 root bash /opt/update-certs.sh >> /root/scripts/update-cert.log
   ```
3. Haproxy config.  
   For a more detailed basic explaination on the general concepts please refer to [this guide](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts)  
   ```
   CONFIG_FILE=/etc/haproxy/haproxy.cfg
   ```
   - Stats Page
   ```
   ############### 
   # Proxy Stats
   ########
   listen stats
       bind :::1976 v4v6 ssl crt /etc/ssl/rpc1.pathrocknetwork.org/rpc1.pathrocknetwork.org.pem
       mode http
       stats enable
       stats hide-version
       stats realm Haproxy\ Statistics
       stats uri /
       # Basic Auth user:pass
       stats auth Pathrock:Network
   ```
   Prometheus
   ```
   frontend prometheus
      bind :::8405 v4v6 ssl crt /etc/ssl/rpc1.pathrocknetwork.org/rpc1.pathrocknetwork.org.pem
      http-request use-service prometheus-exporter
      no log
   ```
   Astar
   ```
   ###################### 
   # Astar
   ########
   frontend astar
       bind :::8844 v4v6 ssl crt /etc/ssl/rpc1.pathrocknetwork.org/rpc1.pathrocknetwork.org.pem
       maxconn 5000
       option forwardfor

       # Only permit ssl connections 
       http-request redirect scheme https unless { ssl_fc }

       # Use an ACL to upgrade websocket connections
       acl hdr_connection_upgrade hdr(Connection)  -i upgrade
       acl hdr_upgrade_websocket  hdr(Upgrade)     -i websocket

       # Upgraded connections are directed to specific backend
       use_backend astar_websocket_backend if hdr_connection_upgrade hdr_upgrade_websocket

       # All other requests go to a different backend that requires different options than http backend
       default_backend astar_backend
   
   backend astar_websocket_backend
       # Load balancing method to use possible options are roundrobin, leastconn, and source
       balance roundrobin
       option forwardfor
   
       # Websocket Setting
       option http-server-close

       # 
       server pathrock_astar_ws 10.241.140.3:9933 check maxconn 1000 inter 5s fall 3 rise 10 weight 10 cookie pathrock_astar_ws
       server imstaked_astar_ws 65.108.68.51:9933 check maxconn 1000 inter 5s fall 3 rise 10 weight 10 cookie imstaked_astar_ws
       
   backend astar_backend
       balance roundrobin
       option forwardfor
       server pathrock_astar_rpc 10.241.140.3:9933 check maxconn 1000 inter 5s fall 3 rise 10 weight 10 cookie pathrock_astar_rpc
       server imstaked_astar_rpc 65.108.68.51:9933 check maxconn 1000 inter 5s fall 3 rise 10 weight 10 cookie imstaked_astar_rpc
   ```

   
