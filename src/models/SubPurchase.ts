export class SubPurchase {
    id?: string

    type!: `item` | `money`

    deposit!: number | null

    reward!: number | null

    item!: string | null

    itemAmount!: string | null

    memberId!: string

    purchaseId!: string

    bankAccountId!: string

    createAt!: number
}