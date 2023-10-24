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

### Install NGINX and certbot then get certificate
```
sudo apt install nginx
snap install certbot --classic
DOMAIN="sq.pathrocknetwork.org"
EMAIL="pathrock@pathrocknetwork.org"
certbot certonly -d $DOMAIN --non-interactive --agree-tos --email $EMAIL --nginx
```

### Setup the firewall
```
ADMIN_IP=
PROMETHEUS_SERVER=
sudo iptables -A INPUT -s $ADMIN_IP -j ACCEPT
sudo iptables -A INPUT -s $PROMETHEUS_SERVER -j ACCEPT
sudo iptables -p tcp -m tcp --dport 8011 -j DROP
```

### Create the new site and enable it
```
cat <<EOF >> /etc/nginx/sites-available/sq.pathrocknetwork.org 
# Indexer Proxy
#
server (
    listen 80;
    listen [::]:80;
    server_name sq.pathrocknetwork.org;
    location / {
    proxy_pass http://127.0.0.1:1080;
    }

}
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
# Coordinator Metrics Proxy
server {
    listen 8011;
#    listen [::]:8010 ssl;
    server_name sq.pathrocknetwork.org;
#    ssl_certificate     /etc/letsencrypt/live/sq.pathrocknetwork.org/fullchain.pem;
#    ssl_certificate_key /etc/letsencrypt/live/sq.pathrocknetwork.org/privkey.pem;
    location / {
    proxy_pass http://127.0.0.1:8000;
    }
}

# Indexer Proxy Metrics
server {
    listen 10080;
    server_name sq.pathrocknetwork.org;
    location / {
    proxy_pass http://127.0.0.1:1081;
    }

}
EOF

sudo ln -s /etc/nginx/sites-available/sq.pathrocknetwork.org /etc/nginx/sites-enabled/sq.pathrocknetwork.org
sudo rm /etc/nginx/sites-enabled/default
sudo systemctl reload nginx
```





