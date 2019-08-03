import { subPurchaseCollection } from "../modules/db";
import { SubPurchase } from '../models/SubPurchase';

class SubPurchaseService {
    constructor() {
        console.log(`Create sub purchase service instance`)
    }

    async getByBankAccountId(id: string) {
        const subPurchases: SubPurchase[] = []
        const querySnapshot = await subPurchaseCollection.where(`bankAccountId`, `==`, id).get()
        querySnapshot.forEach(doc => {
            subPurchases.push({
                id: doc.id,
                bankAccountId: doc.data().bankAccountId,
                memberId: doc.data().memberId,
                purchaseId: doc.data().purchaseId,
                type: doc.data().type,
                deposit: doc.data().deposit,
                item: doc.data().item,
                itemAmount: doc.data().itemAmount,
                reward: doc.data().reward,
            })
        })
        console.log(`Fetch all purchases of bank account id: ${id}`)
        return subPurchases
    }

    async getByMemberId(id: string) {
        const subPurchases: SubPurchase[] = []
        const querySnapshot = await subPurchaseCollection.where(`memberId`, `==`, id).get()
        querySnapshot.forEach(doc => {
            subPurchases.push({
                id: doc.id,
                bankAccountId: doc.data().bankAccountId,
                memberId: doc.data().memberId,
                purchaseId: doc.data().purchaseId,
                type: doc.data().type,
                deposit: doc.data().deposit,
                item: doc.data().item,
                itemAmount: doc.data().itemAmount,
                reward: doc.data().reward,
            })
        })
        console.log(`Fetch all purchases of member id: ${id}`)
        return subPurchases
    }

    async getByPurchaseId(id: string) {
        const subPurchases: SubPurchase[] = []
        const querySnapshot = await subPurchaseCollection.where(`purchaseId`, `==`, id).get()
        querySnapshot.forEach(doc => {
            subPurchases.push({
                id: doc.id,
                bankAccountId: doc.data().bankAccountId,
                memberId: doc.data().memberId,
                purchaseId: doc.data().purchaseId,
                type: doc.data().type,
                deposit: doc.data().deposit,
                item: doc.data().item,
                itemAmount: doc.data().itemAmount,
                reward: doc.data().reward,
            })
        })
        console.log(`Fetch all purchases of purchase id: ${id}`)
        return subPurchases
    }

    async create(subPurchase: SubPurchase) {
        const newSubPurchase = await subPurchaseCollection.add({
            type: subPurchase.type,
            item: subPurchase.item,
            deposit: subPurchase.deposit,
            memberId: subPurchase.memberId,
            bankAccountId: subPurchase.bankAccountId,
            purchaseId: subPurchase.purchaseId,
            reward: subPurchase.reward,
            itemAmount: subPurchase.itemAmount
        })
        console.log(`Create new purchases with data \n\r${JSON.stringify(subPurchase, null, 2)}`)
        return newSubPurchase
    }

    async delete(id: string) {
        await subPurchaseCollection.doc(id).delete()
        console.log(`Delete bank account id ${id}`)
    }
}

export const subPurchaseService = new SubPurchaseService()