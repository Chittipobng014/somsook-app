import { membersCollection } from "../modules/db";
import { Member } from "../models/Member";
import { idGenerateService } from './idGenerate.service';

class MemberService {
    constructor() {
        console.log(`Create member service instance`)
    }

    async getAll(): Promise<Member[]> {
        const members: Member[] = []
        const querySnapshot = await membersCollection.get()
        querySnapshot.forEach(doc => {
            members.push({
                id: doc.id,
                citizenId: doc.data().citizenId,
                createAt: doc.data().createAt,
                name: doc.data().name,
                phoneNumber: doc.data().phoneNumber,
                address: doc.data().address,
                imageUrl: doc.data().imageUrl
            })
        })
        console.log(`Fetch all member`)
        return members
    }

    async getById(id: string): Promise<Member> {
        const querySnapshot = await membersCollection.doc(id).get()
        const doc = <Member>querySnapshot.data()
        const member: Member = {
            id: querySnapshot.id,
            citizenId: doc.citizenId,
            createAt: doc.createAt,
            phoneNumber: doc.phoneNumber,
            name: doc.name,
            address: doc.address,
            imageUrl: doc.imageUrl
        }
        console.log(`Fetch member with id ${id}`)
        return member
    }

    async create(member: Member) {
        const currentMemberId: number = await idGenerateService.getMemberId()
        const memberId = `SOMSOOK${currentMemberId}`
        await membersCollection.doc(memberId).set({
            citizenId: member.citizenId,
            createAt: member.createAt,
            phoneNumber: member.phoneNumber,
            name: member.name,
            address: member.address,
            imageUrl: member.imageUrl
        })
        await idGenerateService.increaseMemberId(currentMemberId)
        console.log(`Created new member with data \n\r${JSON.stringify(member)}`)
    }

    update(member: Member) {
        membersCollection.doc(member.id).update({
            citizenId: member.citizenId,
            createAt: member.createAt,
            phoneNumber: member.phoneNumber,
            name: member.name,
            address: member.address,
            imageUrl: member.imageUrl
        }).then(doc => {
            console.log(`Updated new member with data \n\r${JSON.stringify(member, null, 2)}`)
        }).catch(err => {
            return new Error(err)
        })
    }

    async delete(id: string) {
        try {
            await membersCollection.doc(id).delete()
            console.log(`Delete member with id ${id}`)
        } catch (error) {
            console.log(error)
        }
    }
}

export const memberService = new MemberService()