# Migrate ENS Subgraph

- ENS thegraph link
https://thegraph.com/hosted-service/subgraph/ensdomains/ens

## Environment Setup
- Install Nodejs
```
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
sudo apt-key add /etc/apt/keyrings/nodesource.gpg
NODE_MAJOR=20
sudo echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
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
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-compose -y
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/bin/docker-compose
```

- Install the subsquid cli
```
sudo npm install -g @subsquid/cli
sqd --version
```
- Create a new user and use that
```
sudo useradd -U -s /bin/bash -m -d /home/subsquid subsquid
sudo usermod -a -G docker subsquid
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
sqd init ens-squid --template evm
cd ens-squid 
```
- Copy Files
```
cp ~/ens-subgraph/schema.graphql ~/ens-squid/
cp ~/ens-subgraph/subgraph.yaml ~/ens-squid/
cp ~/ens-subgraph/abis/* ~/ens-squid/abi/
```

- rm ~/ens-squid/src/processor.ts && nano ~/ens-squid/src/processor.ts
```
import {lookupArchive} from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import * as EnsRegistry from './abi/Registry'
import * as EnsResolver from './abi/PublicResolver' 
import * as EnsBaseRegistrar from './abi/BaseRegistrar'
import * as EnsRegistrarControllerOld from './abi/EthRegistrarControllerOld'
import * as EnsRegistrarController from './abi/EthRegistrarController'
import * as ENSNamewrapper from './abi/NameWrapper'

export const processor = new EvmBatchProcessor()
    .setDataSource({
        // Change the Archive endpoints for run the squid
        // against the other EVM networks
        // For a full list of supported networks and config options
        // see https://docs.subsquid.io/evm-indexing/
        archive: lookupArchive('eth-mainnet'),

        // Must be set for RPC ingestion (https://docs.subsquid.io/evm-indexing/evm-processor/)
        // OR to enable contract state queries (https://docs.subsquid.io/evm-indexing/query-state/)
        chain: 'https://rpc.ankr.com/eth',
    })
    .setFinalityConfirmation(75)
    .setFields({
        transaction: {
            from: true,
            value: true,
            hash: true,
        },
    })
    .setBlockRange({
        from: 3_332_417,
    })
    .addLog({
        address: ['0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'],
        topic0: [
          EnsRegistry.events.NewOwner.topic,
          EnsRegistry.events.NewResolver.topic,
          EnsRegistry.events.NewTTL.topic,
          EnsRegistry.events.Transfer.topic,
        ]
    })
    .addLog({
        address: ['0x314159265dd8dbb310642f98f50c066173c1259b'],
        topic0: [
          EnsRegistry.events.NewOwner.topic,
          EnsRegistry.events.NewResolver.topic,
          EnsRegistry.events.NewTTL.topic,
          EnsRegistry.events.Transfer.topic,
          EnsResolver.events.ABIChanged.topic,
          EnsResolver.events.AddrChanged.topic,
          EnsResolver.events.AddressChanged.topic,
          EnsResolver.events.AuthorisationChanged.topic,
          EnsResolver.events.ContenthashChanged.topic,
          EnsResolver.events.InterfaceChanged.topic,
          EnsResolver.events.NameChanged.topic,
          EnsResolver.events.PubkeyChanged.topic,
          EnsResolver.events['TextChanged(bytes32,string,string)'].topic,
          EnsResolver.events['TextChanged(bytes32,string,string,string)'].topic,
          EnsResolver.events.VersionChanged.topic,
        ]
    })
    .addLog({
        address: ['0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85'],
        topic0: [
          EnsBaseRegistrar.events.NameRegistered.topic,
          EnsBaseRegistrar.events.NameRenewed.topic,
          EnsBaseRegistrar.events.Transfer.topic,

        ]
    })
    .addLog({
        address: ['0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5'],
        topic0: [
          EnsRegistrarControllerOld.events.NameRegistered.topic,
          EnsRegistrarControllerOld.events.NameRenewed.topic,
        ]
    })
    .addLog({
        address: ['0x253553366Da8546fC250F225fe3d25d0C782303b'],
        topic0: [
          EnsRegistrarController.events.NameRegistered.topic,
          EnsRegistrarController.events.NameRenewed.topic,
        ]
    })
    .addLog({
        address: ['0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401'],
        topic0: [
          ENSNamewrapper.events.NameWrapped.topic,
          ENSNamewrapper.events.NameUnwrapped.topic,
          ENSNamewrapper.events.FusesSet.topic,
          ENSNamewrapper.events.ExpiryExtended.topic,
          ENSNamewrapper.events.TransferSingle.topic,
          ENSNamewrapper.events.TransferBatch.topic,
        ]
    })


export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>

```
- Run Typegen
```
npm i @subsquid/typeorm-codegen --save-dev
sqd typegen
```

- Import the 6 entities in main.ts and edit what looks like functions to me. One for each entity?
```
import {ENS_registry} from './model'
import {ENS_resolver) from './model'
import {ENS_baseregistrar) from './model'
import {ENS_registrar_controller_old) from './model'
import {ENS_registrar_controller) from './model'
import {ENS_namewrapper) from './model'
import = as ENS_registryABI from './abi/EnsRegistry'
import = as ENS_resolverABI from './abi/Resolver' 
import = as ENS_baseregistrarABI from './abi/BaseRegistrar'
import = as ENS_registrar_controller_oldABI from './abi/EthRegistrarControllerOld'
import = as ENS_registrar_controllerABI from './abi/EthRegistrarController'
import = as ENS_namewrapperABI from './abi/NameWrapper'

processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    const ens_registrys: ENS_registry[] = []
    for (let c of ctx.blocks) {
        for (let log of c.logs) {
            // decode and normalize the log data
            if(log.topics[0] === ENS_registryABI.events.Transfer.topic{
              let(UGGG HAVE TO START OVER)
            }
        }
    }

```




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







