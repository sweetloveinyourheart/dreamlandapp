import { RealEstateCategory } from "../enums/realEstate"

export interface AddressInterface {
    houseNumber?: string
    showHouseNumber?: boolean
    province: string
    district: string
    ward: string
    street: string
}

export interface AddressFilter {
    projectName?: string
    houseNumber?: string
    showHouseNumber?: boolean
    province?: string
    district?: string
    ward?: string
    street?: string
}

export interface PriceFilter {
    min?: number
    max?: number
}

export interface AcreageFilter {
    min?: number
    max?: number
}

export interface PaginationFilter {
    cursor: number
    limit: number
}

export interface RealEstateFilter {
    category: RealEstateCategory | string
    address?: AddressFilter
    price?: PriceFilter
    acreage?: AcreageFilter 
}