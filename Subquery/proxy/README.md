# Haproxy Setup  

1. Install haproxy  
   ```
   VERSION=2.8
   sudo apt install --no-install-recommends software-properties-common
   sudo add-apt-repository ppa:vbernat/haproxy-$VERSION -y
   sudo apt install haproxy=$VERSION.\*
   # Get Detailed Version Info
   haproxy -vv
   sudo systemctl daemon-reload && sudo systemctl enable haproxy && sudo systemctl start haproxy
   ```
3. Install haproxy  
   ```
   
   ```
5. Get ssl cert and configure auto-updates  
   ```

   ```
7. Frontend config  
   ```

   ```
9. Backend config  
   ```

   ```
   
