import { purchaseCollection } from "../modules/db";
import { Purchase } from '../models/Purchase';

class PurchaseService {
    constructor() {
        console.log(`Create purchase service instance`)
    }

    async getByBankAccountId(id: string) {
        const purchases: Purchase[] = []
        const querySnapshot = await purchaseCollection.where(`bankAccountId`, `==`, id).get()
        querySnapshot.forEach(doc => {
            purchases.push({
                id: doc.id,
                amount: doc.data().amount,
                bankAccountId: doc.data().bankAccountId,
                memberId: doc.data().memberId,
                name: doc.data().name,
                type: doc.data().type
            })
        })
        console.log(`Fetch all purchases of bank account id: ${id}`)
        return purchases
    }

    async getByMemberId(id: string) {
        const purchases: Purchase[] = []
        const querySnapshot = await purchaseCollection.where(`memberId`, `==`, id).get()
        querySnapshot.forEach(doc => {
            purchases.push({
                id: doc.id,
                amount: doc.data().amount,
                bankAccountId: doc.data().bankAccountId,
                memberId: doc.data().memberId,
                name: doc.data().name,
                type: doc.data().type
            })
        })
        console.log(`Fetch all purchases of member id: ${id}`)
        return purchases
    }

    async create(purchase: Purchase) {
        const newPurchase = await purchaseCollection.add({
            type: purchase.type,
            name: purchase.name,
            amount: purchase.amount,
            memberId: purchase.memberId,
            bankAccountId: purchase.bankAccountId
        })
        console.log(`Create new purchases with data \n\r${JSON.stringify(purchase, null, 2)}`)
        return newPurchase
    }

    async delete(id: string) {
        await purchaseCollection.doc(id).delete()
        console.log(`Delete bank account id ${id}`)
    }
}

export const purchaseService = new PurchaseService()