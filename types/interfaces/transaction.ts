import { TransactionStatus } from "../enums/transaction"

export interface TransactionInterface {
    realEstate?: {
        itemId: string
        itemType: string
    }
    project?: {
        itemId: string
    }
    status: TransactionStatus
    createAt: Date
}