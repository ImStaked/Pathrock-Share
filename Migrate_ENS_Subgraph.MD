# Migrate ENS Subgraph

- ENS thegraph link
https://thegraph.com/hosted-service/subgraph/ensdomains/ens

## Environment Setup
- Install Nodejs
```
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
apt-key add /etc/apt/keyrings/nodesource.gpg
NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt update && sudo apt upgrade -y
sudo apt-get install nodejs -y
```
- Install Docker
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

- Install the subsquid cli
```
npm install -g @subsquid/cli
sqd --version
```
- Create a new user and use that
```
useradd -U -s /bin/bash -m -d /home/subsquid subsquid
usermod -a -G docker subsquid
su subsquid && cd ~
sqd --version
```
- Set your aquarium deployment key available at https://app.subsquid.io/aquarium
```
sqd auth -k sqd_?????????
```
- Clone the ens subgraph repo
```
git clone https://github.com/ensdomains/ens-subgraph
```

- Initialize with basic evm template
```
sqd init ens --template evm
cd ens
```
- subgraph.yaml ( specifies data sources and events to index )
```
cp ~/ens-subgraph/subgraph.yaml ~/ens/
```
- The minimal template already contains a dummy schema.graphql file. Replace it with the schema from the graph
```
cp ~/ens-subgraph/schema.graphql ~/ens/
```
- Next, we generate the entities from the schema using the squid-typeorm-codegen tool of the Squid SDK, then build the squid:
```
npm i @subsquid/typeorm-codegen --save-dev
sqd codegen
sqd build
```
- After that, start the local database and generate migrations from the generated entities using the squid-typeorm-migration tool:
```
screen
sqd up
sqd migration:generate
screen -d
```

## Generate typings from ABI
- Copy ./abis/Gravity.json from the subgraph project and paste it to ./abi folder in the subsquid project. To generate the typings, run:
```
cp ~/ens-subgraph/abis/* ~/testing/abi/
sqd typegen
```
# Subscribe to EVM logs
While in The Graph data source is defined in the manifest file subgraph.yaml, in Subsquid subscriptions to EVM data, including logs, are performed at the processor object definition customarily located at src/processor.ts. The processor is configured directly by the code, unlike subgraphs which require handlers and events to be defined in the manifest file.





