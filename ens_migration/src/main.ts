import {TypeormDatabase} from '@subsquid/typeorm-store'
import {Domain} from './model'
import {Registration} from './model'
import {WrappedDomain} from './model'
import {Account} from './model'
import {Resolver} from './model'
import {processor} from './processor'
import * as EsnRegistryABI from './abi/Registry'
import * as EnsResolverABI from './abi/PublicResolver' 
import * as EnsBaseRegistrarABI from './abi/BaseRegistrar'
import * as EnsRegistrarControllerOldABI from './abi/EthRegistrarControllerOld'
import * as EnsRegistrarControllerABI from './abi/EthRegistrarController'
import * as ENSNamewrapperABI from './abi/NameWrapper'

processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    const Domains: Domain[] = []
    for (let c of ctx.blocks) {
        for (let log of c.logs) {
          if(log.topics[0] === EsnRegistryABI.events.NewOwner.topic){
            let {node, label, owner} = EsnRegistryABI.events.NewOwner.decode(log); 
            let newowner = Domain({
                node: node,
                label: label,
                owner: owner, 
            });
            if(log.topics[0] === EsnRegistryABI.events.NewResolver.topic){
                let {node, resolver} = EsnRegistryABI.events.NewResolver.decode(log); 
                let newresolver = Domain({
                    node: node,
                    resolver: resolver, 
                });    
        }
          }
        }
    }

    // apply vectorized transformations and aggregations
    const burned = EnsRegistrys.reduce((acc, b) => acc + b.value, 0n) / 1_000_000_000n
    const startBlock = ctx.blocks.at(0)?.header.height
    const endBlock = ctx.blocks.at(-1)?.header.height
    ctx.log.info(`Burned ${burned} Gwei from ${startBlock} to ${endBlock}`)

    // upsert batches of entities with batch-optimized ctx.store.save
    await ctx.store.upsert(EnsRegistrys)
})
