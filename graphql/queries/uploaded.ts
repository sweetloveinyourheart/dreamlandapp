import { gql } from "@apollo/client";
import { PostStatus } from "../../types/enums/realEstate";
import { ApartmentInterface } from "../../types/interfaces/apartment";
import { BusinessPremisesInterface } from "../../types/interfaces/businessPremises";
import { HouseInterface } from "../../types/interfaces/house";
import { LandInterface } from "../../types/interfaces/land";
import { MotalInterface } from "../../types/interfaces/motal";
import { PaginationFilter } from "../../types/interfaces/realEstate";

export const GET_UPLOADED_POSTS = gql`
    query Uploaded($paging: PaginationArgs, $status: PostStatus!) {
        posts: getUploadedPosts(paging: $paging, status: $status) {
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

export interface UploadedData {
    posts: {
        apartments: (ApartmentInterface & { __typename: string })[]
        houses: (HouseInterface & { __typename: string })[]
        lands: (LandInterface & { __typename: string })[]
        businessPremises: (BusinessPremisesInterface & { __typename: string })[]
        motals: (MotalInterface & { __typename: string })[]
    }
}

export interface UploadedVars {
    paging?: PaginationFilter
    status: PostStatus
}