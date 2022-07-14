import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
    mutation Transaction($item: CreateTransactionInput!) {
        transaction: newTransaction(item: $item) {
            status
        }
    }
`
export interface CreateTransactionData {
    transaction: {
        status: any
    }
}

export interface CreateTransactionVars {
    item: {
        itemId: string
        itemType: string
    }
}