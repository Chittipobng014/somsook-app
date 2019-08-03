export class SubPurchase {
    id?: string

    type!: `item` | `money`

    deposit!: number

    reward!: number

    item!: string

    itemAmount!: string

    memberId!: string

    purchaseId!: string

    bankAccountId!: string
}