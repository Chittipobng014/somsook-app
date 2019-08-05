import { Member } from "./Member";
import { BankAccount } from "./BankAcount";
import { Purchase } from "./Purchase";
import { SubPurchase } from "./SubPurchase";

export class MemberSummary {
    member!: Member

    bankAccounts!: BankAccount[]

    purchases!: Purchase[]

    subPurchases!: SubPurchase[]
}