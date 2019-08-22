import { Timestamp } from "../plugins/firebase";

export class Member {

    static register(citizenID: string, name: string, phoneNumber: string, address: string, imageUrl: string) {
        return new Member(citizenID, name, phoneNumber, address, imageUrl)
    }

    id?: string;

    citizenId!: string;

    name!: string;

    phoneNumber!: string;

    createAt!: Date;

    imageUrl!: string

    address!: string

    constructor(citizenID: string, name: string, phoneNumber: string, address: string, imageUrl: string, id?: string) {
        this.citizenId = citizenID
        this.name = name
        this.phoneNumber = phoneNumber
        this.address = address
        this.id = id
        this.imageUrl = imageUrl
        this.createAt = new Date()
    }
}