import { bankAccountCollection } from "../modules/db";
import { BankAccount } from '../models/BankAcount';

class BankAccountService {

    constructor() {
        console.log(`Create bank account service instance`)
    }
    public async getByMemberId(memberId: string) {
        const bankAccounts: BankAccount[] = []
        const querySnapshot = await bankAccountCollection.where(`memberId`, `==`, memberId).get()
        querySnapshot.forEach(doc => {
            bankAccounts.push({
                id: doc.id,
                campus: doc.data().campus,
                memberId: doc.data().memberId,
                number: doc.data().number,
                provider: doc.data().provider
            })
        })
        console.log(`Fetch all bank account of member id ${memberId}`)
        return bankAccounts
    }

    async getById(id: string) {
        const querySnapshot = await bankAccountCollection.doc(id).get()
        const doc = <BankAccount>querySnapshot.data()
        const bankAccount: BankAccount = {
            id: querySnapshot.id,
            campus: doc.campus,
            memberId: doc.memberId,
            number: doc.number,
            provider: doc.provider
        }
        console.log(`Fetch bank account with id: ${id}`)
        return bankAccount
    }

    public async create(bankAccount: BankAccount) {
        const newBankAccount = await bankAccountCollection.add({
            provider: bankAccount.provider,
            campus: bankAccount.campus,
            number: bankAccount.number,
            memberId: bankAccount.memberId
        })
        console.log(`Create new bank account with data ${JSON.stringify(bankAccount, null, 2)}`)
        return newBankAccount
    }

    async update(bankAccount: BankAccount) {
        const updated = await bankAccountCollection.doc(bankAccount.id).update({
            provider: bankAccount.provider,
            campus: bankAccount.campus,
            number: bankAccount.number,
            memberId: bankAccount.memberId
        })
        console.log(`Update bank account id: ${bankAccount.id} with data\n\r${JSON.stringify(bankAccount, null, 2)}`)
        return updated
    }

    public async delete(id: string) {
        await bankAccountCollection.doc(id).delete()
        console.log(`Delete bank account id: ${id}`)
    }
}

export const bankAccountService = new BankAccountService()