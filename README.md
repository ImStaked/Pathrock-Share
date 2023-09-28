# Subsquid setup

- Install Nodejs
```
sudo mkdir -p /etc/apt/keyrings
apt-key add /etc/apt/keyrings/nodesource.gpg
NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt update && sudo apt upgrade -y
sudo apt-get install nodejs -y
```
- Install the subsquid cli
```
npm install -g @subsquid/cli
sqd --version
```
- Set your aquarium deployment key available at https://app.subsquid.io/aquarium
```
sqd auth -k sqd_?????????
sqd deploy --help
```
