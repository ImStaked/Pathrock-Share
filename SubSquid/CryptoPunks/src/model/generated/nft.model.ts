import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Contract} from "./contract.model"
import {Account} from "./account.model"
import {Event} from "./event.model"
import {Ask} from "./ask.model"
import {Bid} from "./bid.model"

@Entity_()
export class NFT {
    constructor(props?: Partial<NFT>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Contract, {nullable: true})
    contract!: Contract | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    numberOfTransfers!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    numberOfSales!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    tokenId!: bigint

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    owner!: Account

    @OneToMany_(() => Event, e => e.nft)
    events!: Event[]

    @Index_()
    @ManyToOne_(() => Ask, {nullable: true})
    currentAsk!: Ask | undefined | null

    @Index_()
    @ManyToOne_(() => Bid, {nullable: true})
    currentBid!: Bid | undefined | null
}
