import {lookupArchive} from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import * as EnsRegistry from './abi/AuctionRegistrar'
import * as ENS_resolver from './abi/PublicResolver' 
import * as ENS_baseregistrar from './abi/BaseRegistrar'
import * as ENS_registrar_controller_old from './abi/EthRegistrarControllerOld'
import * as ENS_registrar_controller from './abi/EthRegistrarController'
import * as ENS_namewrapper from './abi/NameWrapper'

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
          EnsRegistry.events.AuctionStarted.topic,
          EnsRegistry.events.BidRevealed.topic,
          EnsRegistry.events.HashInvalidated.topic,
          EnsRegistry.events.NewBid.topic,
        ]
    })
    .addLog({
        address: ['0x314159265dd8dbb310642f98f50c066173c1259b'],
        topic1: [
          ENS_resolver.events.ABIChanged.topic,
          ENS_resolver.events.AddrChanged.topic,
          ENS_resolver.events.AddressChanged.topic,
          ENS_resolver.events.AuthorisationChanged.topic,
          ENS_resolver.events.ContenthashChanged.topic,
          ENS_resolver.events.InterfaceChanged.topic,
          ENS_resolver.events.NameChanged.topic,
          ENS_resolver.events.PubkeyChanged.topic,
          ENS_resolver.events['TextChanged(bytes32,string,string)'].topic,
          ENS_resolver.events['TextChanged(bytes32,string,string,string)'].topic,
          ENS_resolver.events.VersionChanged.topic,
        ]
    })
    .addLog({
        address: ['0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85'],
        topic1: [
          ENS_baseregistrar.events.NameRegistered.topic,
          ENS_baseregistrar.events.NameRenewed.topic,
          ENS_baseregistrar.events.Transfer.topic,
          ENS_baseregistrar.events.Approval.topic,
          ENS_baseregistrar.events.ApprovalForAll.topic,
          ENS_baseregistrar.events.ControllerAdded.topic,
          ENS_baseregistrar.events.ControllerRemoved.topic,
          ENS_baseregistrar.events.NameMigrated.topic,
          ENS_baseregistrar.events.OwnershipTransferred.topic,
        ]
    })
    .addLog({
        address: ['0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5'],
        topic1: [
          ENS_registrar_controller_old.events.NameRegistered.topic,
          ENS_registrar_controller_old.events.NameRenewed.topic,
          ENS_registrar_controller_old.events.NewPriceOracle.topic,
          ENS_registrar_controller_old.events.OwnershipTransferred.topic,
        ]
    })
    .addLog({
        address: ['0x253553366Da8546fC250F225fe3d25d0C782303b'],
        topic1: [
          ENS_registrar_controller.events.NameRegistered.topic,
          ENS_registrar_controller.events.NameRenewed.topic,
          ENS_registrar_controller.events.OwnershipTransferred.topic,
        ]
    })
    .addLog({
        address: ['0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401'],
        topic0: [
          ENS_namewrapper.events.NameWrapped.topic,
          ENS_namewrapper.events.NameUnwrapped.topic,
          ENS_namewrapper.events.FusesSet.topic,
          ENS_namewrapper.events.ExpiryExtended.topic,
          ENS_namewrapper.events.TransferSingle.topic,
          ENS_namewrapper.events.TransferBatch.topic,
          ENS_namewrapper.events.ApprovalForAll.topic,
          ENS_namewrapper.events.ControllerChanged.topic,
          ENS_namewrapper.events.OwnershipTransferred.topic,
          ENS_namewrapper.events.URI.topic,
        ]
    })


export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>
