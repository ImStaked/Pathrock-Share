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

- Copy the schema file 
The minimal template already contains a dummy schema.graphql file. 
Because the default file was producing errors I edit it down to this which worked.
But results will likely be incomplete.
```
type Domain @entity {
  id: ID!
  name: String
  labelName: String
  labelhash: Bytes
  parent: Domain
  subdomains: [Domain!]! @derivedFrom(field: "parent")
  subdomainCount: Int!
  resolvedAddress: Account
  resolver: Resolver
  ttl: BigInt
  isMigrated: Boolean!
  createdAt: BigInt!
  owner: Account!
  registrant: Account
  wrappedOwner: Account
  expiryDate: BigInt
}
type Registration @entity {
  id: ID!
  domain: Domain!
  registrationDate: BigInt!
  expiryDate: BigInt!
  cost: BigInt
  registrant: Account!
  labelName: String
}

type WrappedDomain @entity {
  id: ID!
  domain: Domain!
  expiryDate: BigInt!
  fuses: Int!
  owner: Account!
  name: String
}

type Account @entity {
  id: ID!
  domains: [Domain!]! @derivedFrom(field: "owner")
  wrappedDomains: [WrappedDomain!] @derivedFrom(field: "owner")
  registrations: [Registration!] @derivedFrom(field: "registrant")
}

type Resolver @entity {
  id: ID!
  domain: Domain
  address: Bytes!
  addr: Account
  contentHash: Bytes
  texts: [String!]
}

interface ResolverEvent {
  id: ID!
  resolver: Resolver!
  blockNumber: Int!
  transactionID: Bytes!
}

type AddrChanged implements ResolverEvent @entity {
  id: ID!
  resolver: Resolver!
  blockNumber: Int!
  transactionID: Bytes!
  addr: Account!
}

type MulticoinAddrChanged implements ResolverEvent @entity {
  id: ID!
  resolver: Resolver!
  blockNumber: Int!
  transactionID: Bytes!
  coinType: BigInt!
  addr: Bytes!
}

type NameChanged implements ResolverEvent @entity {
  id: ID!
  resolver: Resolver!
  blockNumber: Int!
  transactionID: Bytes!
  name: String!
}

type AbiChanged implements ResolverEvent @entity {
  id: ID!
  resolver: Resolver!
  blockNumber: Int!
  transactionID: Bytes!
  contentType: BigInt!
}

type PubkeyChanged implements ResolverEvent @entity {
  id: ID!
  resolver: Resolver!
  blockNumber: Int!
  transactionID: Bytes!
  x: Bytes!
  y: Bytes!
}

type TextChanged implements ResolverEvent @entity {
  id: ID!
  resolver: Resolver!
  blockNumber: Int!
  transactionID: Bytes!
  key: String!
  value: String
}

type ContenthashChanged implements ResolverEvent @entity {
  id: ID!
  resolver: Resolver!
  blockNumber: Int!
  transactionID: Bytes!
  hash: Bytes!
}

type InterfaceChanged implements ResolverEvent @entity {
  id: ID!
  resolver: Resolver!
  blockNumber: Int!
  transactionID: Bytes!
  interfaceID: Bytes!
  implementer: Bytes!
}

type AuthorisationChanged implements ResolverEvent @entity {
  id: ID!
  resolver: Resolver!
  blockNumber: Int!
  transactionID: Bytes!
  owner: Bytes!
  target: Bytes!
  isAuthorized: Boolean!
}

type VersionChanged implements ResolverEvent @entity {
  id: ID!
  resolver: Resolver!
  blockNumber: Int!
  transactionID: Bytes!
  version: BigInt!
}

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





