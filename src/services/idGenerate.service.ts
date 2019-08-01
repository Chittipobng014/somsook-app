import { idGenerateCollention } from '../modules/db';

class IdGenerateService {
    constructor() {
        console.log(`Create id generate service instance`)
    }

    async getMemberId() {
        const querySnapshot = await idGenerateCollention.doc(`memberId`).get()
        const doc: any = querySnapshot.data()
        return doc.id
    }

    async increaseMemberId(currentId: number) {
        await idGenerateCollention.doc(`memberId`).update({
            id: currentId + 1
        })
    }
}

export const idGenerateService = new IdGenerateService()