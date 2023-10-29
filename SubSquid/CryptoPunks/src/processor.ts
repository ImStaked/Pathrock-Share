import {lookupArchive} from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'

import { events as ERC721SaleEvent, events } from './abi/ERC721Sale'
import { events as OpenseaEvent } from './abi/Opensea'
import { events as RaribleEvent } from './abi/RaribleExchangeV1'
import { events as cryptopunksEvent } from './abi/cryptopunks'
import { events as WrappedPunksEvent } from './abi/wrappedpunks'

export const ERC721Sale_CONTRACT =
  '0x131aebbfe55bca0c9eaad4ea24d386c5c082dd58'.toLowerCase();
  // 10_786_971
export const Opensea_CONTRACT =
  '0x7be8076f4ea4a4ad08075c2508e481d6c946d12b'.toLowerCase();
export const Rarible_CONTRACT =
  '0xcd4ec7b66fbc029c116ba9ffb3e59351c20b5b06'.toLowerCase();
  // 11_274_515
export const CryptoPunks_CONTRACT =
  '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB'.toLowerCase();
  // 3_914_494
export const WrappedPunks_CONTRACT =
  '0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6'.toLowerCase();


export const processor = new EvmBatchProcessor()
    .setDataSource({
        // Change the Archive endpoints for run the squid
        // against the other EVM networks
        // For a full list of supported networks and config options
        // see https://docs.subsquid.io/evm-indexing/
        archive: lookupArchive('eth-mainnet'),

        // Must be set for RPC ingestion (https://docs.subsquid.io/evm-indexing/evm-processor/)
        // OR to enable contract state queries (https://docs.subsquid.io/evm-indexing/query-state/)
        chain: {
            url: 'https://rpc.ankr.com/eth',
            rateLimit: 10
        }
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
        from: 10_821_736,
    })
    .addLog({
        address: [WrappedPunks_CONTRACT],
        topic0: [
            WrappedPunksEvent.Approval.topic,
            WrappedPunksEvent.ApprovalForAll.topic,
            WrappedPunksEvent.OwnershipTransferred.topic,
            WrappedPunksEvent.Paused.topic,
            WrappedPunksEvent.ProxyRegistered.topic,
            WrappedPunksEvent.Transfer.topic,
            WrappedPunksEvent.Unpaused.topic,
        ],
    })


    .setBlockRange({
        from: 10_821_736,
    })
    .addLog({
        address: [CryptoPunks_CONTRACT],
        topic0: [
            cryptopunksEvent.Assign.topic,
            cryptopunksEvent.Transfer.topic,
            cryptopunksEvent.PunkTransfer.topic,
            cryptopunksEvent.PunkOffered.topic,
            cryptopunksEvent.PunkBidEntered.topic,
            cryptopunksEvent.PunkBidWithdrawn.topic,
            cryptopunksEvent.PunkBought.topic,
            cryptopunksEvent.PunkNoLongerForSale.topic,
        ]
    })


    .setBlockRange({
        from: 11_274_515,
    })
    .addLog({
        address: [Rarible_CONTRACT],
        topic0: [
            RaribleEvent.Buy.topic,
            RaribleEvent.Cancel.topic,
            RaribleEvent.OwnershipTransferred.topic,
        ]
    })


    .setBlockRange({
        from: 	14_232_889,
    })
    .addLog({
        address: [Opensea_CONTRACT],
        topic0: [
            OpenseaEvent.OrderApprovedPartOne.topic,
            OpenseaEvent.OrderApprovedPartTwo.topic,
            OpenseaEvent.OrderCancelled.topic,
            OpenseaEvent.OrdersMatched.topic,
            OpenseaEvent.OwnershipRenounced.topic,
            OpenseaEvent.OwnershipTransferred.topic,
        ]
    })   


    .setBlockRange({
        from: 	10_786_971,
    })
    .addLog({
        address: [ERC721Sale_CONTRACT],
        topic0: [
            ERC721SaleEvent.Buy.topic,
            ERC721SaleEvent.Cancel.topic,
            ERC721SaleEvent.OwnershipTransferred,topic,
        ]
    })        




    .addTransaction({
        to: ['0x0000000000000000000000000000000000000000'],
    })

    processor.run(new TypeormDatabase(), async (ctx) => {
        for (let c of ctx.blocks) {
          for (let log of c.logs) {
            if (log.address === CONTRACT_ADDRESS && log.topics[0] == events.Deposit.topic) {
              // type-safe decoding of the Deposit event data
              const amt = events.Deposit.decode(log).wad
            }
          }
      })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>
