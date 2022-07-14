import { gql } from "@apollo/client";
import { ProjectInterface } from "../../types/interfaces/project";
import { PaginationFilter } from "../../types/interfaces/realEstate";

export const GET_PROJECT_POSTS = gql`
    query projects($filter: ProjectFilter, $paging: PaginationArgs) {
        getProjects(filter: $filter, paging: $paging) {
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

export interface ProjectFilterInterface {
    address?: {
        province?: string
        district?: string
        ward?: string
    }
    price?: {
        min: number
        max?: number
    }
    handOverYear?: number
}

export interface GetProjectsVars {
    filter?: ProjectFilterInterface
    paging?: PaginationFilter
}

export interface GetProjectsData {
    getProjects: ProjectInterface[]
}