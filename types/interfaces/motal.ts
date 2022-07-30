import {  Direction, Furniture, LegalDocuments, OwnerType, PostStatus, RealEstateCategory, RealEstateStatus } from "../enums/realEstate"
import { RealEstateFilter } from "./realEstate"

interface Address {
    houseNumber?: string
    showHouseNumber?: boolean
    province: string
    district: string
    ward: string
    street: string
}

interface Position {
    blockName?: string
    floorNumber?: string
    code?: {
        value: string
        showCode?: boolean
    }
}


export interface MotalInterface {
    _id: string
    title: string
    description: string
    category: RealEstateCategory
    
    media: {
        images: string[]
        videos: string[]
    }

    detail: {    
        position: Position
        address: Address
        acreage: {
            totalAcreage: number
        }
        pricing: {
            total: number
            deposit?: number
        }

    }

    overview?: {
        doorDirection?: Direction
        legalDocuments?: LegalDocuments
        numberOfFloors?: number 
        furniture?: Furniture
    }

    owner: {
        name: string
        phone: string
    }

    timeStamp: Date
    postStatus: PostStatus
    googleMapsLink: string
    directLink: string
    index: number

}

export type MotalFilter = RealEstateFilter & {
    numberOfBedrooms?: number
    doorDirection?: Direction
    legalDocuments?: LegalDocuments
}