import { gql } from "@apollo/client"
import { ApartmentType, BusinessPremisesType, Direction, Furniture, HouseType, LandType, LegalDocuments, RealEstateCategory } from "../../types/enums/realEstate"
import { ApartmentInterface } from "../../types/interfaces/apartment"
import { BusinessPremisesInterface } from "../../types/interfaces/businessPremises"
import { HouseInterface } from "../../types/interfaces/house"
import { LandInterface } from "../../types/interfaces/land"
import { MotalInterface } from "../../types/interfaces/motal"
import { PaginationFilter } from "../../types/interfaces/realEstate"

export const GET_ALL_POSTS = gql`
    query Posts($filter: RealEstateFilter!, $paging: PaginationArgs, $search: String) {
        posts: getRealEstatePosts(filter: $filter, paging: $paging, search: $search) {
            apartments {
                __typename
                title
                media {
                    images
                }
                detail {
                    acreage {
                        totalAcreage
                    }
                    pricing {
                        total
                    }
                    address {
                        province
                    }
                    
                }
                
                overview {
                    numberOfBedrooms
                }
                timeStamp
                category
                directLink
                index
            }
            houses {
                __typename
                title
                media {
                    images
                }
                detail {
                    acreage {
                        totalAcreage
                    }
                    pricing {
                        total
                    }
                    address {
                        province
                    }
                    
                }
                
                overview {
                    numberOfBedrooms
                }
                timeStamp
                category
                directLink
                index
            }
            
            lands {
                __typename
                title
                media {
                    images
                }
                detail {
                    acreage {
                        totalAcreage
                    }
                    pricing {
                        total
                    }
                    address {
                        province
                    }
                    
                }
                timeStamp
                category
                directLink
                index
            }
            businessPremises {
                __typename
                title
                media {
                    images
                }
                detail {
                    acreage {
                        totalAcreage
                    }
                    pricing {
                        total
                    }
                    address {
                        province
                    }
                    
                }
                timeStamp
                category
                directLink
                index
            }
            motals {
                __typename
                title
                media {
                    images
                }
                detail {
                    acreage {
                        totalAcreage
                    }
                    pricing {
                        total
                    }
                    address {
                        province
                    }
                }
                timeStamp
                category
                directLink
                index
            }
        }
    }
`

export interface RsFilterInterface {
    category: RealEstateCategory
    outstanding?: boolean
    address?: {
        province?: string
        district?: string
        ward?: string
    }
    price?: {
        min: number
        max?: number
    }
    acreage?: {
        min: number
        max?: number
    }
    type?: ApartmentType | HouseType | LandType | BusinessPremisesType | string
    numberOfBedrooms?: number
    doorDirection?: Direction
    balconyDirection?: Direction
    legalDocuments?: LegalDocuments
    furniture?: Furniture
}

export interface AllPostsVars {
    filter: RsFilterInterface
    paging?: PaginationFilter
    search?: string
}

export interface AllPostsData {
    posts: {
        apartments: (ApartmentInterface & { __typename: string })[]
        houses: (HouseInterface & { __typename: string })[]
        lands: (LandInterface & { __typename: string })[]
        businessPremises: (BusinessPremisesInterface & { __typename: string })[]
        motals: (MotalInterface & { __typename: string })[]
    }
}

export const GET_APARTMENT_POSTS = gql`
    query Apartments($filter: ApartmentFilter!, $paging: PaginationArgs) {
        apartments: getApartments(filter: $filter, paging: $paging) {
            __typename
            title
            media {
                images
            }
            detail {
                acreage {
                    totalAcreage
                }
                pricing {
                    total
                }
                address {
                    province
                }
            }
            
            overview {
                numberOfBedrooms
            }
            timeStamp
            category
            directLink
        }
    }
`
export interface ApartmentPostData {
    apartments: (ApartmentInterface & { __typename: string })[]
}

export interface ApartmentPostVars {
    filter: RsFilterInterface
    paging?: PaginationFilter
}

export const GET_HOUSE_POSTS = gql`
    query Houses($filter: HouseFilter!, $paging: PaginationArgs) {
        houses: getHouses(filter: $filter, paging: $paging) {
            __typename
            title
            media {
                images
            }
            detail {
                acreage {
                    totalAcreage
                }
                pricing {
                    total
                }
                address {
                    province
                }
            }
            
            overview {
                numberOfBedrooms
            }
            timeStamp
            category
            directLink
            index
        }
    }
`
export interface HousePostData {
    houses: (HouseInterface & { __typename: string })[]
}

export interface HousePostVars {
    filter: RsFilterInterface
    paging?: PaginationFilter
}

export const GET_LAND_POSTS = gql`
    query Lands($filter: LandFilter!, $paging: PaginationArgs) {
        lands: getLands(filter: $filter, paging: $paging) {
            __typename
            title
            media {
                images
            }
            detail {
                acreage {
                    totalAcreage
                }
                pricing {
                    total
                }
                address {
                    province
                }
            }
            timeStamp
            category
            directLink
            index
        }
    }
`

export interface LandPostVars {
    filter: RsFilterInterface,
    paging?: PaginationFilter
}

export interface LandPostData {
    lands: (LandInterface & { __typename: string })[]
}

export const GET_BUSINESS_PREMISES_POSTS = gql`
    query BusinessPremises($filter: BusinessPremisesFilter!, $paging: PaginationArgs) {
        businessPremises: getBusinessPremises(filter: $filter, paging: $paging) {
            __typename
            title
            media {
                images
            }
            detail {
                acreage {
                    totalAcreage
                }
                pricing {
                    total
                }
                address {
                    province
                }
            }
            timeStamp
            category
            directLink
            index
        }
    }
`

export interface BusinessPremisesPostData {
    businessPremises: (BusinessPremisesInterface & { __typename: string })[]
}

export interface BusinessPremisesPostVars {
    filter: RsFilterInterface
    paging?: PaginationFilter
}

export const GET_MOTAL_POSTS = gql`
    query Motals($filter: MotalFilter!, $paging: PaginationArgs) {
        motals: getMotals(filter: $filter, paging: $paging) {
            __typename
            title
            media {
                images
            }
            detail {
                acreage {
                    totalAcreage
                }
                pricing {
                    total
                }
                address {
                    province
                }
            }
            timeStamp
            category
            directLink
            index
        }
    }
`

export interface MotalPostsData {
    motals: (MotalInterface & { __typename: string })[],
}

export interface MotalPostsVars {
    filter: RsFilterInterface
    paging?: PaginationFilter
}