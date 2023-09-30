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
sqd init ens-subsquid --template evm
cd ens-subsquid 
```
- subgraph.yaml ( specifies data sources and events to index )
```
cp ~/ens-subgraph/subgraph.yaml ~/ens-subsquid/
```
- Copy addresses from subgraph.yaml into processor.ts
```
    .addLog({
        address: ['0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'],
        topic0: [
          events.Transfer.topic,
          events.NewOwner.topic,
          events.NewResolver.topic,
          events.NewTTL.topic
        ]
    })
    .addLog({
        address: ['0x314159265dd8dbb310642f98f50c066173c1259b'],
        topic1: [
          events.Transfer.topic,
          events.NewOwner.topic,
          events.NewResolver.topic,
          events.NewTTL.topic
        ]
    })
    .addLog({
        address: ['0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85'],
        topic1: [
          events.NameRegistered.topic,
          events.NameRenewed.topic,
          events.Transfer.topic,
        ]
    })
    .addLog({
        address: ['0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5'],
        topic1: [
          events.NameRegistered.topic,
          events.NameRenewed.topic,
        ]
    })
    .addLog({
        address: ['0x253553366Da8546fC250F225fe3d25d0C782303b'],
        topic1: [
          events.NameRegistered.topic,
          events.NameRenewed.topic,
        ]
    })
    .addLog({
        address: ['0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401'],
        topic0: [
          events.NameWrapped.topic,
          events.NameUnwrapped.topic,
          events.FusesSet.topic,
          events.ExpiryExtended.topic,
          events.TransferSingle.topic,
          events.TransferBatch.topic,
        ]
    })
```
- The minimal template already contains a dummy schema.graphql file. Replace it with the schema from the graph
```
cp ~/ens-subgraph/schema.graphql ~/ens-subsquid/
```
- Generate typings from ABI
```
cp ~/ens-subgraph/abis/* ~/ens-subsquid/abi/
npm i @subsquid/typeorm-codegen --save-dev
sqd typegen
```
- Subscribe to EVM logs
Edit src/processor.ts you can remove the .addTransaction section
```
import { events } from './abi/EnsRegistry'
import { events } from './abi/Resolver'
import { events } from './abi/BaseRegistrar'
import { events } from './abi/EthRegistrarControllerOld'
import { events } from './abi/EthRegistrarController'
import { events } from './abi/NameWrapper'
```
- Next is events




- Next, we generate the entities from the schema using the squid-typeorm-codegen tool of the Squid SDK, then build the squid:
```
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







