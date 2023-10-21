import {TypeormDatabase} from '@subsquid/typeorm-store'
import { BlockHeader, Log } from '@subsquid/evm-processor';
import { Account, Ask, AskCreated, AskRemoved, Assign, Bid, BidCreated, BidRemoved, Contract, CToken, EpnsNotificationCounter, EpnsPushNotification } from './model';
import { Event, MetaData, NFT, Offer, Punk, Sale, Trait, Transfer, Unwrap, UserProxy, Wrap } from './model';
import {
    ERC721Sale_CONTRACT,
    Opensea_CONTRACT,
    Rarible_CONTRACT,
    WrappedPunks_CONTRACT,
    CryptoPunks_CONTRACT,
    processor,
  } from './processor';

import { events as ERC721SaleEvent } from './abi/ERC721Sale'
import { events as OpenseaEvent } from './abi/Opensea'
import { events as RaribleEvent } from './abi/RaribleExchangeV1'
import { events as cryptopunksEvent } from './abi/cryptopunks'
import { events as WrappedPunksEvent } from './abi/wrappedpunks'


processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    const burns: Burn[] = []
    for (let c of ctx.blocks) {
        for (let tx of c.transactions) {
            // decode and normalize the tx data
            burns.push(
                new Burn({
                    id: tx.id,
                    block: c.header.height,
                    address: tx.from,
                    value: tx.value,
                    txHash: tx.hash,
                })
            )
        }
    }
    // apply vectorized transformations and aggregations
    const burned = burns.reduce((acc, b) => acc + b.value, 0n) / 1_000_000_000n
    const startBlock = ctx.blocks.at(0)?.header.height
    const endBlock = ctx.blocks.at(-1)?.header.height
    ctx.log.info(`Burned ${burned} Gwei from ${startBlock} to ${endBlock}`)

    // upsert batches of entities with batch-optimized ctx.store.save
    await ctx.store.upsert(burns)
})
