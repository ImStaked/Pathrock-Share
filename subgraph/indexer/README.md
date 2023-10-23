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

### Install openresty ( just testing it out because you said someone used it )
```
sudo apt-get -y install --no-install-recommends wget gnupg ca-certificates
wget -O - https://openresty.org/package/pubkey.gpg | sudo gpg --dearmor -o /usr/share/keyrings/openresty.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/openresty.gpg] http://openresty.org/package/ubuntu $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/openresty.list > /dev/null
sudo apt-get update
sudo apt-get -y install --no-install-recommends openresty
```  

### Install certbot and get certificate
```
snap install certbot --classic
DOMAIN="sq.pathrocknetwork.org"
EMAIL="pathrock@pathrocknetwork.org"
certbot certonly -d $DOMAIN --non-interactive --agree-tos --email $EMAIL --nginx
```





