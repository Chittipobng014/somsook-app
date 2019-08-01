import { db } from "../plugins/firebase";

const MEMBERS_COLLECTION = `members`
const BANK_ACCOUNT_COLLECTION = `bankAccount`
const PURCHASE_COLLECTION = `purchase`
const ID_GENERATE = `idGenerate`

const membersCollection = db.collection(MEMBERS_COLLECTION)
const bankAccountCollection = db.collection(BANK_ACCOUNT_COLLECTION)
const purchaseCollection = db.collection(PURCHASE_COLLECTION)
const idGenerateCollention = db.collection(ID_GENERATE)

export {
    membersCollection,
    bankAccountCollection,
    purchaseCollection,
    idGenerateCollention
}