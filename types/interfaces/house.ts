import {
    Direction,
    Furniture,
    HouseType,
    LegalDocuments,
    OwnerType,
    PostStatus,
    RealEstateCategory
} from "../enums/realEstate"
import { ProjectInterface } from "./project"
import { RealEstateFilter } from "./realEstate"

interface HouseAddress {
    projectName?: string
    houseNumber?: string
    showHouseNumber?: boolean
    province: string
    district: string
    ward: string
    street: string
}

interface HousePosition {
    blockName?:  string
    code?: {
        value: string
        showCode?: boolean
    }
}

export interface HouseInterface {
    title: string
    description: string
    category: RealEstateCategory

    media: {
        images: string[]
        videos: string[]
    }

    detail: {
        position: HousePosition
        address: HouseAddress
        acreage: {
            totalAcreage: number
            usedAcreage?: number
            height?: number
            width?: number
        }
        pricing: {
            total: number
            deposit?: number
        }

        project?: ProjectInterface
    }

    overview: {
        type: HouseType
        numberOfBedrooms: number
        numberOfBathrooms?: number
        numberOfFloors?: number
        doorDirection?: Direction
        legalDocuments?: LegalDocuments
        furniture?: Furniture
        carAlley?: boolean
        noHau?: boolean
    }

    owner: {
        type: OwnerType
        user: any
    }

    timeStamp: Date
    postStatus: PostStatus
    googleMapsLink: string
    directLink: string
    index: number

}

export type HouseFilter = RealEstateFilter & {
    type?: HouseType
    numberOfBedrooms?: number
    doorDirection?: Direction
    legalDocuments?: LegalDocuments
    furniture?: Furniture
    carAlley?: boolean
    noHau?: boolean
    frontispiece?: boolean
    project?: string
}