import { gql } from "@apollo/client";
import { ApartmentInterface } from "../../types/interfaces/apartment";
import { BusinessPremisesInterface } from "../../types/interfaces/businessPremises";
import { HouseInterface } from "../../types/interfaces/house";
import { LandInterface } from "../../types/interfaces/land";
import { MotalInterface } from "../../types/interfaces/motal";
import { ProjectInterface } from "../../types/interfaces/project";

export const GET_TOP_PROJECTS_QUERY = gql`
    query projects {
        projects: getOutstandingProjects(paging: { limit: 4 }) {
            _id
            projectName
            media {
                images
            }
            address {
                province
                district
            }
            information {
                purchaseInfo
            }
            directLink
        }
    }
`
export interface TopProjectsResult {
    projects: ProjectInterface[]
}

export const GET_TOP_POSTS_QUERY = gql`
    query {
        sellingPosts: getRealEstatePosts(filter: { category: MuaBan }, paging: { limit: 2 }) {
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
                    project {
                        projectName
                    }
                }
                        
                overview {
                    numberOfBedrooms
                }

                timeStamp
                category
                directLink
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
                    project {
                        projectName
                    }
                }
                    
                overview {
                    numberOfBedrooms
                }

                timeStamp
                category
                directLink
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
                    project {
                        projectName
                    }
                }
                
                timeStamp
                category
                directLink
            }
        }
        
        rentingPosts: getRealEstatePosts(filter: { category: ChoThue }, paging: { limit: 2 }) {
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
                    project {
                        projectName
                    }
                }
                        
                overview {
                    numberOfBedrooms
                }

                timeStamp
                category
                directLink
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
                    project {
                        projectName
                    }
                }
                    
                overview {
                    numberOfBedrooms
                }

                timeStamp
                category
                directLink
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
                    project {
                        projectName
                    }
                }
                
                timeStamp
                category
                directLink
            }
        }
    }
`

export interface TopPostsResult {
    sellingPosts: {
        apartments:  (ApartmentInterface & { __typename: string })[],
        houses: (HouseInterface & { __typename: string })[],
        lands: (LandInterface & { __typename: string })[]
    }
    rentingPosts: {
        apartments:  (ApartmentInterface & { __typename: string })[],
        houses: (HouseInterface & { __typename: string })[],
        lands: (LandInterface & { __typename: string })[]
    }
}

export const GET_STATS = gql`
    query {
        sellingPosts: realEstateStats(category: MuaBan) {
            apartments
            houses
            lands
            businessPremises
        }
            
        rentingPosts: realEstateStats(category: ChoThue) {
            apartments
            houses
            lands
            businessPremises
            motals
        }
        
        projects: projectStats {
            projects
        }
    }
`

export interface GetStatsData {
    sellingPosts: {
        apartments: number
        houses: number
        lands: number
        businessPremises: number
    }

    rentingPosts: {
        apartments: number
        houses: number
        lands: number
        businessPremises: number
    }

    projects: {
        projects: number
    }
}

export const GET_OUTSTANDING_POSTS = gql`
    query {
        posts: getOutstandingPosts {
            apartments {
                __typename
                title
                category
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
                    project {
                        projectName
                    }
                }
                
                overview {
                    numberOfBedrooms
                }

                timeStamp
                category
                directLink
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
                    project {
                        projectName
                    }
                }
                
                overview {
                    numberOfBedrooms
                }

                timeStamp
                category
                directLink
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
                    project {
                        projectName
                    }
                }
                
                timeStamp
                category
                directLink
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
                    project {
                        projectName
                    }
                }

                timeStamp
                category
                directLink
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
            }
        }
    }
`
export interface GetOutstandingPostData {
    posts: OutstandingPost
}

export interface OutstandingPost {
    apartments: (ApartmentInterface & { __typename: string })[],
    houses: (HouseInterface & { __typename: string })[],
    lands: (LandInterface & { __typename: string })[],
    businessPremises: (BusinessPremisesInterface & { __typename: string })[],
    motals: (MotalInterface & { __typename: string })[]
}

export const GET_PAGE_TEMPLATE = gql`
    query Template($pageName: String!) {
        template: getTemplate(pageName: $pageName) {
            pageName
            banner
        }
    }
`
export interface PageTemplateData {
    template: {
        banner: string
        pageName: string
    }
}