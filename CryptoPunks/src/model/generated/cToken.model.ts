import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"

@Entity_()
export class CToken {
    constructor(props?: Partial<CToken>) {
        Object.assign(this, props)
    }

    /**
     * TxHash + logNumber
     */
    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    from!: Account

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    to!: Account

    @Column_("text", {nullable: false})
    owner!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    amount!: bigint | undefined | null

    @Column_("text", {nullable: true})
    punkId!: string | undefined | null

    @Column_("text", {nullable: false})
    referenceId!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    blockNumber!: bigint

    @Column_("bytea", {nullable: false})
    blockHash!: Uint8Array

    @Column_("bytea", {nullable: false})
    txHash!: Uint8Array

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    timestamp!: bigint
}
