# Indexer Setup

[Indexer Services Source with some CLI setup instructions](https://github.com/subquery/network-indexer-services)
[Near Dictionary Source](https://github.com/subquery/near-dictionary)
[Near Subql](https://github.com/subquery/subql-near)


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







