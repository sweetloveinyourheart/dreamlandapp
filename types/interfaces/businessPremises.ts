import { BusinessPremisesType, Direction, Furniture, LegalDocuments, OwnerType, PostStatus, RealEstateCategory } from "../enums/realEstate"
import { ProjectInterface } from "./project"
import { RealEstateFilter } from "./realEstate"

interface Address {
    projectName?: string
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


export interface BusinessPremisesInterface {
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
        project?: ProjectInterface
    }

    overview: {
        type: BusinessPremisesType
        doorDirection?: Direction
        legalDocuments?: LegalDocuments
        furniture?: Furniture
    }

    owner: {
        type: OwnerType
        user: any
    }

    timeStamp: Date
    postStatus: PostStatus
    directLink: string
    googleMapsLink: string
    index: number
}

export type BusinessPremisesFilter = RealEstateFilter & {
    type?: BusinessPremisesType
    project?: string
    doorDirection?: Direction
    legalDocuments?: LegalDocuments
}