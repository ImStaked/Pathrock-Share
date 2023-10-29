import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Ask} from "./ask.model"
import {Account} from "./account.model"
import {Contract} from "./contract.model"
import {NFT} from "./nft.model"
import {EventType} from "./_eventType"

@Entity_()
export class AskRemoved {
    constructor(props?: Partial<AskRemoved>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Ask, {nullable: true})
    ask!: Ask

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    from!: Account | undefined | null

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    to!: Account | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    amount!: bigint | undefined | null

    @Index_()
    @ManyToOne_(() => Contract, {nullable: true})
    contract!: Contract | undefined | null

    @Index_()
    @ManyToOne_(() => NFT, {nullable: true})
    nft!: NFT | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    logNumber!: bigint

    @Column_("varchar", {length: 11, nullable: false})
    type!: EventType

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    blockNumber!: bigint

    @Column_("bytea", {nullable: false})
    blockHash!: Uint8Array

    @Column_("bytea", {nullable: false})
    txHash!: Uint8Array

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    timestamp!: bigint
}
