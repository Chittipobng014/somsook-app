import { memberService } from "./member.service";
import { bankAccountService } from "./bankAccount.service";
import { purchaseService } from "./purchase.service";
import { subPurchaseService } from "./subPurchase.service";
import { MemberSummary } from "../models/MemberSummary";

class ReportService {
    constructor() {
        console.log(`Create report service instance`)
    }

    async memberSummary(id: string): Promise<MemberSummary> {
        const member = await memberService.getById(id)
        const [bankAccounts, purchases, subPurchases] = await Promise.all([
            bankAccountService.getByMemberId(<string>member.id),
            purchaseService.getByMemberId(<string>member.id),
            subPurchaseService.getByMemberId(<string>member.id)
        ])
        const summary: MemberSummary = {
            member,
            bankAccounts,
            purchases,
            subPurchases
        }
        return summary
    }
}

export const reportService = new ReportService()