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
        topic1: [
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
        topic1: [
          EnsBaseRegistrar.events.NameRegistered.topic,
          EnsBaseRegistrar.events.NameRenewed.topic,
          EnsBaseRegistrar.events.Transfer.topic,

        ]
    })
    .addLog({
        address: ['0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5'],
        topic1: [
          EnsRegistrarControllerOld.events.NameRegistered.topic,
          EnsRegistrarControllerOld.events.NameRenewed.topic,
        ]
    })
    .addLog({
        address: ['0x253553366Da8546fC250F225fe3d25d0C782303b'],
        topic1: [
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
