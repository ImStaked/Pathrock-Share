# Indexer Setup

### Install Docker
```
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-compose -y
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/bin/docker-compose
```  

###  Get docker compose file 
```
mkdir subquery-indexer && cd subquery-indexer
curl https://raw.githubusercontent.com/imstaked//Pathrock-Share/main/subgraph/indexer/docker-compose.yml -o docker-compose.yml
```

### Configure Subquery Indexer service
- Configure docker logging
  ```
  sudo <<EOF >> /etc/docker/daemon.json
  {
      ...
      "log-driver": "journald"
  }
  EOF
  ```
- Create systemd service
```
sudo <<EOF >> /etc/systemd/system/subquery.service
[Unit]
Description="SubQuery Indexer"
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=on-failure
RestartSec=10
User=subquery
SyslogIdentifier=subquery
SyslogFacility=local7
KillSignal=SIGHUP
WorkingDirectory=/home/subquery/subquery-indexer
ExecStart=/usr/bin/docker-compose up -d

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable subquery
```

### Install NGINX and certbot then get certificate
```
sudo apt install nginx
snap install certbot --classic
DOMAIN="sq.pathrocknetwork.org"
EMAIL="pathrock@pathrocknetwork.org"
certbot certonly -d $DOMAIN --non-interactive --agree-tos --email $EMAIL --nginx
```

### Setup the firewall
- Please Note: the default policy is to allow all traffic. So we will filter accordingly.
```
PUBLIC_IP=
ADMIN_IP=
PROMETHEUS_SERVER=
# Allow the admins ip unrestricted access
sudo iptables -A INPUT -s $ADMIN_IP -j ACCEPT
# Permit the prometheus server to access metrics and drop public requests
sudo iptables -A INPUT -s $PROMETHEUS_SERVER -p tcp -m multiport --dport 8010 -j ACCEPT
# Block public access to admin port,admin proxy port, and db port 
sudo iptables -A INPUT -d $PUBLIC_IP -p tcp -m tcp --dport 8000 -j DROP
sudo iptables -A INPUT -d $PUBLIC_IP -p tcp -m tcp --dport 8010 -j DROP
sudo iptables -A INPUT -d $PUBLIC_ip -p tcp -m tcp --dport 5432 -j DROP
```

### Create the new site and enable it
```
cat <<EOF >> /etc/nginx/sites-available/sq.pathrocknetwork.org 
# Indexer Proxy
# Provides SSL endpoint to query the indexer
server {
    listen 443 ssl;
    listen [::]:443 ssl;

    server_name sq.pathrocknetwork.org;
    ssl_certificate     /etc/letsencrypt/live/sq.pathrocknetwork.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sq.pathrocknetwork.org/privkey.pem;
    location / {

    proxy_pass http://127.0.0.1:1080;

    }

}
# Admin Proxy
# Provides ssl endpoint for administrtor to use the indexer
server {
    listen 8010 ssl;
    listen [::]:8010 ssl;

    server_name sq.pathrocknetwork.org;
    ssl_certificate     /etc/letsencrypt/live/sq.pathrocknetwork.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sq.pathrocknetwork.org/privkey.pem;
    location / {

    proxy_pass http://127.0.0.1:8000;

    }

}



EOF

sudo ln -s /etc/nginx/sites-available/sq.pathrocknetwork.org /etc/nginx/sites-enabled/sq.pathrocknetwork.org
sudo rm /etc/nginx/sites-enabled/default
sudo systemctl reload nginx
```
### prometheus.yml configuration
```
  - job_name: query_coordinator_stats
    scheme: https
    metrics_path: /metrics
    static_configs:
      - targets: ['sq.pathrocknetwork.org:8010'] # this is targeting coordinator endpoint.

  - job_name: query_count
    metrics_path: /metrics
    scheme: https
    bearer_token: 'thisismyAuthtoken'          # this is same as proxy metrics-token
    static_configs:
      - targets: ['sq.pathrocknetwork.org:443']   # this is targeting proxy endpoint.
```




