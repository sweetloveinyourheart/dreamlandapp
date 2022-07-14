import { TransactionStatus } from "../enums/transaction"

export interface TransactionInterface {
    item: {
        itemId: string
        itemType: string
    }
    status: TransactionStatus
    createAt: Date
}