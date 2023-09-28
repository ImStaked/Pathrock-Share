# Subsquid setup

### VPS specs
  - CPU - AMD RYZEN 7
  - VCPU - 4
  - MEM - 8GB 

#### Install Nodejs
```
sudo mkdir -p /etc/apt/keyrings
apt-key add /etc/apt/keyrings/nodesource.gpg
NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt update && sudo apt upgrade -y
sudo apt-get install nodejs -y
```
#### Install Docker
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
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-compose
```
#### Install the subsquid cli
```
npm install -g @subsquid/cli
sqd --version
```
#### Set your aquarium deployment key available at https://app.subsquid.io/aquarium
```
sqd auth -k sqd_?????????
sqd deploy --help
```
#### Scaffold from the minimal evm template
```
sqd init quest1 --template evm
cd quest1
```
#### Install dependencies
```
npm ci
```
#### Set the network 
```
nano $HOME/quest1/src/processor.ts
```
#### Launch Postgres docker container and detach
```
spd up
```
#### Inspect and run the processor as a systemd service
```
cat <<EOF >> /etc/systemd/system/subsquid_processor.service
[Unit]
Description=Subsquid Processor
After=network.target
StartLimitIntervalSec=60
StartLimitBurst=3

[Service]
User=root
Type=simple
Restart=always
RestartSec=30
ExecStart=/usr/bin/sqd process

[Install]
WantedBy=default.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable subsquid_processor
```
- Deploy
```
sqd deploy --org pathrocknetwork ./quest1
```
