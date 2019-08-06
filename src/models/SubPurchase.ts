export class SubPurchase {
    id?: string

    type!: `item` | `money`

    name!: string

    deposit!: number | null

    reward!: number | null

    item!: string | null

    itemAmount!: number | null

    memberId!: string

    purchaseId!: string

    bankAccountId!: string

    createAt!: string
}