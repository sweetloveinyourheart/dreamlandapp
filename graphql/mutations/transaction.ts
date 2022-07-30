import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
    mutation Transaction($realEstate: CreateRealEstateTransaction, $project: CreateProjectTransaction) {
        transaction: newTransaction(realEstate: $realEstate, project: $project) {
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
    realEstate?: {
        itemId: string
        itemType: string
    }
    project?: {
        itemId: string
    }
}