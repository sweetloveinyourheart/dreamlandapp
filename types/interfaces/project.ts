import { ProjectType} from "../enums/project"
import { AddressInterface } from "./realEstate"

export interface ProjectUtilities {
    image: string
    title: string
}

export interface ProjectInterface {
    _id?: string
    media: {
        images: string[]
    }
    projectName: string
    address: AddressInterface
    information: {
        purchaseInfo?: number
        rentInfo?: number
        startedAt?: string
        handOverYear?: number
        type: ProjectType
        acreage?: number
        scale?: string
        progressStatus?: string
        status?: string
    }
    utilities: ProjectUtilities[]
    description: string
    investor: {
        logo: string
        name: string
        establishYear: number
        about: string
    }
    progress: {
        image: string
        title: string
    }
    masterPlan: {
        image: string
        title: string
    }[]
    directLink: string
    virtual3DLink?: string
    googleMapsLink?: string
    timeStamp: Date
    actived: boolean
}