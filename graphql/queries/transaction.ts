import { gql } from "@apollo/client";
import { TransactionInterface } from "../../types/interfaces/transaction";


export const GET_TRANSACTIONS = gql`
    query Transaction($status: TransactionStatus!) {
        transactions: getUserTransaction(status: $status) {
            item {
                itemId
                itemType
            }
            status
            createdAt
        }
    }
`

export interface GetTransactionsData {
    transactions: TransactionInterface[]
}

export const GET_APARTMENT_BY_ID = gql`
    query Apartment($id: String!) {
        apartment: getApartmentPostById(id: $id) {
            title
            media {
                images
            }
            detail {
                pricing {
                    total
                }
                address {
                    province
                    district
                    ward
                    street
                    houseNumber
                }
            }
            
            owner {
                type
                user {
                    phone
                    name
                }
            }
        
            directLink
            postStatus
        }
    }
`

export const GET_HOUSE_BY_ID = gql`
    query House($id: String!) {
        house: getHousePostById(id: $id) {
            title
            media {
                images
            }
            detail {
                pricing {
                    total
                }
                address {
                    province
                    district
                    ward
                    street
                    houseNumber
                }
            }
            
            owner {
                type
                user {
                    phone
                    name
                }
            }
        
            directLink
            postStatus
        }
    }
`

export const GET_LAND_BY_ID = gql`
    query Land($id: String!) {
        land: getLandPostById(id: $id) {
            title
            media {
                images
            }
            detail {
                pricing {
                    total
                }
                address {
                    province
                    district
                    ward
                    street
                    houseNumber
                }
            }
            
            owner {
                type
                user {
                    phone
                    name
                }
            }
        
            directLink
            postStatus
        }
    }
`

export const GET_BUSINESS_PREMISES_BY_ID = gql`
    query BusinessPremises($id: String!) {
        businessPremises: getBusinessPremisesPostById(id: $id) {
            title
            media {
                images
            }
            detail {
                pricing {
                    total
                }
                address {
                    province
                    district
                    ward
                    street
                    houseNumber
                }
            }
            
            owner {
                type
                user {
                    phone
                    name
                }
            }
        
            directLink
            postStatus
        }
    }
`

export const GET_MOTAL_BY_ID = gql`
    query Motal($id: String!) {
        motal: getMotalPostById(id: $id) {
            title
            media {
                images
            }
            detail {
                pricing {
                    total
                }
                address {
                    province
                    district
                    ward
                    street
                    houseNumber
                }
            }
            
            owner {
                type
                user {
                    phone
                    name
                }
            }
        
            directLink
            postStatus
        }
    }
`