import { 
    ApartmentType, 
    Direction, 
    Furniture, 
    LegalDocuments, 
    OwnerType, 
    PostStatus, 
    RealEstateCategory, 
    RealEstateStatus 
} from "../enums/realEstate"
import { ProjectInterface } from "./project"
import { RealEstateFilter } from "./realEstate"

export interface Address {
    houseNumber?: string
    showHouseNumber?: boolean
    province: string
    district: string
    ward: string
    street: string
}

export interface Position {
    blockName?: string
    floorNumber?: string
    code?: {
        value: string
        showCode?: boolean
    }
}

export interface ApartmentInterface {
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

    overview: {
        status: RealEstateStatus
        type: ApartmentType
        numberOfBedrooms: number
        numberOfBathrooms?: number
        balconyDirection?: Direction
        doorDirection?: Direction
        legalDocuments?: LegalDocuments
        furniture?: Furniture
    }

    owner: {
        name: string
        phone: string
    }

    timeStamp: Date
    postStatus: PostStatus
    directLink: string
    googleMapsLink: string
    index: number
}

export type ApartmentFilter = RealEstateFilter & {
    type?: ApartmentType
    numberOfBedrooms?: number
    doorDirection?: Direction
    balconyDirection?: Direction
    legalDocuments?: LegalDocuments
    furniture?: Furniture
}