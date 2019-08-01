import { Timestamp } from "../plugins/firebase";

export class Member {
    id?: string;

    citizenId!: string;

    name!: string;

    phoneNumber!: string;

    createAt!: Date;

    address!: string

    constructor(citizenID: string, name: string, phoneNumber: string, address: string, id?: string) {
        this.citizenId = citizenID
        this.name = name
        this.phoneNumber = phoneNumber
        this.address = address
        this.id = id
        this.createAt = new Date()
    }

    public static register(citizenID: string, name: string, phoneNumber: string, address: string) {
        return new Member(citizenID, name, phoneNumber, address)
    }
}