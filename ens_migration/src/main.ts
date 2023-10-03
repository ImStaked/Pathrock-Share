import {TypeormDatabase} from '@subsquid/typeorm-store'
import {DomainEvent} from './model'
import {ResolverEvent} from './model'
import {RegistrationEvent} from './model'
import {} from './model'
import {processor} from './processor'

import * as EsnRegistryABI from './abi/Registry'
import * as EnsResolverABI from './abi/PublicResolver' 
import * as EnsBaseRegistrarABI from './abi/BaseRegistrar'
import * as EnsRegistrarControllerOldABI from './abi/EthRegistrarControllerOld'
import * as EnsRegistrarControllerABI from './abi/EthRegistrarController'
import * as ENSNamewrapperABI from './abi/NameWrapper'

processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    const DomainEvents: DomainEvent[] = []
    for (let c of ctx.blocks) {
        for (let log of c.logs) {
        if(log.topics[0] === EsnRegistryABI.events.NewOwner.topic){
            let {node, label, owner} = EsnRegistryABI.events.NewOwner.decode(log); 
            let newowner = DomainEvent({
                node: node,
                label: label,
                owner: owner, 
                });
        if(log.topics[0] === EsnRegistryABI.events.NewResolver.topic){
                let {node, resolver} = EsnRegistryABI.events.NewResolver.decode(log); 
                let newresolver = DomainEvent({
                    node: node,
                    resolver: resolver, 
                });   
        if(log.topics[0] === EsnRegistryABI.events.NewTTL.topic){
                let {node,ttl} = EsnRegistryABI.events.NewTTL.decode(log); 
                let newowner = DomainEvent({
                    node: node,
                    ttl: ttl,
                });
        if(log.topics[0] === EsnRegistryABI.events.Transfer.topic){
                let {node,owner} = EsnRegistryABI.events.Transfer.decode(log); 
                let newowner = DomainEvent({
                    node: node,
                    owner: owner,
                });
            }
        }
    }
}

    processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
        const ResolverEvents: ResolverEvent[] = []
        for (let c of ctx.blocks) {
            for (let log of c.logs) {
            if(log.topics[0] === EnsResolverABI.events.ABIChanged.topic){
                let {node, contentType} = EnsResolverABI.events.ABIChanged.decode(log); 
                let newowner = ResolverEvent({
                    node: node,
                    contentType: contentType,
                    });
            if(log.topics[0] === EnsResolverABI.events.AddrChanged.topic){
                let {node,a} = EnsResolverABI.events.AddrChanged.decode(log); 
                let newowner = ResolverEvent({
                    node: node,
                    a: a,
                    });
            if(log.topics[0] === EnsResolverABI.events.AddressChanged.topic){
                let {node,coinType,newAddress} = EnsResolverABI.events.AddressChanged.decode(log); 
                let newowner = ResolverEvent({
                    node: node,
                    coinType: coinType,
                    newAddress: newAddress,
                    });
            if(log.topics[0] === EnsResolverABI.events.AuthorisationChanged.topic){
                let {node,owner,target,isAuthorised} = EnsResolverABI.events.AuthorisationChanged.decode(log); 
                let newowner = ResolverEvent({
                    node: node,
                    owner: owner,
                    target: target,
                    isAuthorised: isAuthorised,
                    });
            if(log.topics[0] === EnsResolverABI.events.ContenthashChanged.topic){
                let {node,hash} = EnsResolverABI.events.ContenthashChanged.decode(log); 
                let newowner = ResolverEvent({
                    node: node,
                    hash: hash,
                    });
            if(log.topics[0] === EnsResolverABI.events.InterfaceChanged.topic){
                let {node,interfaceID,implementer} = EnsResolverABI.events.InterfaceChanged.decode(log); 
                let newowner = ResolverEvent({
                    node: node,
                    interfaceID: interfaceID,
                    implementer: implementer,
                    });
            if(log.topics[0] === EnsResolverABI.events.NameChanged.topic){
                let {node,name} = EnsResolverABI.events.NameChanged.decode(log); 
                let newowner = ResolverEvent({
                    node: node,
                    name: name,
                    });
            if(log.topics[0] === EnsResolverABI.events.PubkeyChanged.topic){
                let {node,x,y} = EnsResolverABI.events.PubkeyChanged.decode(log); 
                let newowner = ResolverEvent({
                    node: node,
                    x: x,
                    y: y,
                    });
            if(log.topics[0] === EnsResolverABI.events['TextChanged(bytes32,string,string)'].topic){
                let {node,indexedKey,key} = EnsResolverABI.events['TextChanged(bytes32,string,string,string)'].decode(log); 
                let newowner = ResolverEvent({
                    node: node,
                    indexedKey: indexedKey,
                    key: key,
                    });
            if(log.topics[0] === EnsResolverABI.events['TextChanged(bytes32,string,string,string)'].topic){
                let {node,indexedKey,key,value} = EnsResolverABI.events['TextChanged(bytes32,string,string,string)'].decode(log); 
                let newowner = ResolverEvent({
                    node: node,
                    indexedKey: indexedKey,
                    key: key,
                    value: value,
                    });
            if(log.topics[0] === EnsResolverABI.events.VersionChanged.topic){
                let {node,newVersion} = EnsResolverABI.events.VersionChanged.decode(log); 
                let newowner = ResolverEvent({
                    node: node,
                    newVersion: newVersion,
                    });
                }
            }
        }
}
processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    const DomainEvents: DomainEvent[] = []
    for (let c of ctx.blocks) {
        for (let log of c.logs) {
        if(log.topics[0] === EnsBaseRegistrarABI.events.NameRegistered.topic){
            let {id, owner, expires} = EnsBaseRegistrarABI.events.NameRegistered.decode(log); 
            let newowner = RegistrationEvent({
                id: id,
                owner: owner,
                expires: expires.
                });
        if(log.topics[0] === EnsBaseRegistrarABI.events.NameRenewed.topic){
                let {id, expires} = EnsBaseRegistrarABI.events.NameRenewed.decode(log); 
                let newresolver = RegistrationEvent({
                    id: id,
                    expires: expires, 
                });   
        if(log.topics[0] === EnsBaseRegistrarABI.events.Transfer.topic){
                let {from,to,tokenId} = EnsBaseRegistrarABI.events.Transfer.decode(log); 
                let newowner = RegistrationEvent({
                    from: from,
                    to: to,
                    tokenId: tokenId,
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
