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
# Permit the prometheus server to access metrics
sudo iptables -A INPUT -s $PROMETHEUS_SERVER -p tcp -m tcp --dport 10080 -j ACCEPT
# Block public access to admin port and admin proxy port because the admin has been granted full access above.
sudo iptables -A INPUT -d $PUBLIC_IP -p tcp -m tcp --dport 8000 -j DROP
sudo iptables -A INPUT -d $PUBLIC_IP -p tcp -m tcp --dport 8010 -j DROP
# Block public access to metrics port because prometheus ip is allowed above
sudo iptables -A INPUT -d $PUBLIC_IP -p tcp -m tcp --dport 10080 -j DROP
# Since the database is hosted locally we will block access to the db port on the public ip address
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
# Provides ssl endpoint for admin to use the indexer
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

# Indexer Proxy Metrics
# Exposes metrics from proxy port 
server {
    listen 10080;
    server_name sq.pathrocknetwork.org;
    location /metrics/ {

    proxy_pass http://127.0.0.1:1080/metrics/;

    }

}
# Exposes metrics from administratove port without exposing any other paths.
server {
    listen 8011;
    server_name sq.pathrocknetwork.org;
    location /metrics/ {

    proxy_pass http://127.0.0.1:8000/metrics/;

    }

}

EOF

sudo ln -s /etc/nginx/sites-available/sq.pathrocknetwork.org /etc/nginx/sites-enabled/sq.pathrocknetwork.org
sudo rm /etc/nginx/sites-enabled/default
sudo systemctl reload nginx
```





