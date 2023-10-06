import {TypeormDatabase} from '@subsquid/typeorm-store'
import { Registration } from './model/generated/registration.model'
import { RegistrationEvent } from './model/generated/registrationEvent.model'
import { Domain } from './model/generated/domain.model'
import { DomainEvent } from './model/generated/domainEvent.model'
import { Account } from './model/generated/account.model'
import { Resolver } from './model/generated/resolver.model'
import { ResolverEvent } from './model/generated/resolverEvent.model'
import { WrappedDomain } from './model/generated/wrappedDomain.model'

import {processor} from './processor'

import * as EsnRegistryABI from './abi/Registry'
import * as EnsResolverABI from './abi/PublicResolver' 
import * as EnsBaseRegistrarABI from './abi/BaseRegistrar'
import * as EnsRegistrarControllerOldABI from './abi/EthRegistrarControllerOld'
import * as EnsRegistrarControllerABI from './abi/EthRegistrarController'
import * as ENSNamewrapperABI from './abi/NameWrapper'
import { id } from 'ethers'

processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    const Registrations: Registration[] = [];
    for (let c of ctx.blocks) {
        for (let log of c.logs) {
        if(log.topics[0] === EsnRegistryABI.events.NewOwner.topic){
            let {node, label, owner} = EsnRegistryABI.events.NewOwner.decode(log);
            let newowner = new Registration({
                node: node,
                label: label,
                owner: owner, 
                });
                Registrations.push(newowner);
        if(log.topics[0] === EsnRegistryABI.events.NewResolver.topic){
                let {node, resolver} = EsnRegistryABI.events.NewResolver.decode(log); 
                let newresolver = new Registration({
                    node: node,
                    resolver: resolver, 
                });
                Registrations.push(newresolver);
   
        if(log.topics[0] === EsnRegistryABI.events.NewTTL.topic){
                let {node,ttl} = EsnRegistryABI.events.NewTTL.decode(log); 
                let newTTL = new Registration({
                    node: node,
                    ttl: ttl,Registration
                });
                Registrations.push(newTTL);

        if(log.topics[0] === EsnRegistryABI.events.Transfer.topic){
                let {node,owner} = EsnRegistryABI.events.Transfer.decode(log); 
                let transfer = new Registration({
                    node: node,
                    owner: owner,
                });
                Registrations.push(transfer);
            }
        }
    }
}

    processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
        const Resolvers: Resolver[] = []
        for (let c of ctx.blocks) {
            for (let log of c.logs) {
            if(log.topics[0] === EnsResolverABI.events.ABIChanged.topic){
                let {node, contentType} = EnsResolverABI.events.ABIChanged.decode(log); 
                let abiChanged = new Resolver({
                    id: node,
                    contentType: contentType,
                    });
                    Resolvers.push(abiChanged);

            if(log.topics[0] === EnsResolverABI.events.AddrChanged.topic){
                let {node,a} = EnsResolverABI.events.AddrChanged.decode(log); 
                let addrChanged = new Resolver({
                    node: node,
                    a: a,
                    });
                    Resolvers.push(addrChanged);

            if(log.topics[0] === EnsResolverABI.events.AddressChanged.topic){
                let {node,coinType,newAddress} = EnsResolverABI.events.AddressChanged.decode(log); 
                let addressChanged = new Resolver({
                    node: node,
                    coinType: coinType,
                    newAddress: newAddress,
                    });
                    Resolvers.push(addressChanged); 

            if(log.topics[0] === EnsResolverABI.events.AuthorisationChanged.topic){
                let {node,owner,target,isAuthorised} = EnsResolverABI.events.AuthorisationChanged.decode(log); 
                let AuthorisationChanged = new Resolver({
                    node: node,
                    owner: owner,
                    target: target,
                    isAuthorised: isAuthorised,
                    });
                    Resolvers.push(AuthorisationChanged)

            if(log.topics[0] === EnsResolverABI.events.ContenthashChanged.topic){
                let {node,hash} = EnsResolverABI.events.ContenthashChanged.decode(log); 
                let ContenthashChanged = new Resolver({
                    id: node,
                    hash: hash,
                    });
                    Resolvers.push(ContenthashChanged)

            if(log.topics[0] === EnsResolverABI.events.InterfaceChanged.topic){
                let {node,interfaceID,implementer} = EnsResolverABI.events.InterfaceChanged.decode(log); 
                let InterfaceChanged = new Resolver({
                    node: node,
                    interfaceID: interfaceID,
                    implementer: implementer,
                    });
                    Resolvers.push(InterfaceChanged)

            if(log.topics[0] === EnsResolverABI.events.NameChanged.topic){
                let {node,name} = EnsResolverABI.events.NameChanged.decode(log); 
                let NameChanged = new Resolver({
                    node: node,
                    name: name,
                    });
                    Resolvers.push(NameChanged)

            if(log.topics[0] === EnsResolverABI.events.PubkeyChanged.topic){
                let {node,x,y} = EnsResolverABI.events.PubkeyChanged.decode(log); 
                let PubkeyChanged = new Resolver({
                    id: node,
                    x: x,
                    y: y,
                    });
                    Resolvers.push(PubkeyChanged)

            if(log.topics[0] === EnsResolverABI.events['TextChanged(bytes32,string,string)'].topic){
                let {node,indexedKey,key} = EnsResolverABI.events['TextChanged(bytes32,string,string,string)'].decode(log); 
                let TextChanged = new Resolver({
                    id: node,
                    indexedKey: indexedKey,
                    key: key,
                    });
                    Resolvers.push(TextChanged)

            if(log.topics[0] === EnsResolverABI.events['TextChanged(bytes32,string,string,string)'].topic){
                let {node,indexedKey,key,value} = EnsResolverABI.events['TextChanged(bytes32,string,string,string)'].decode(log); 
                let Text2Changed = new Resolver({
                    id: node,
                    indexedKey: indexedKey,
                    key: key,
                    value: value,
                    });
                    Resolvers.push(Text2Changed)

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
