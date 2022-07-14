import { gql } from '@apollo/client'
import { ProjectInterface } from '../../types/interfaces/project'
import { AddressFilter, PaginationFilter } from '../../types/interfaces/realEstate'

export const GET_PROJECT_BY_DIRECT_LINK = gql`
    query project($link: String!) {
        project: getProjectByDirectLink(directLink: $link) {
            _id
            projectName
            description
            media {
                images
            }
            address {
                province
                district
                ward
                street
                houseNumber
                showHouseNumber
            }
            masterPlan {
                image
                title
            }
            utilities {
                image
                title
            }
            information {
                purchaseInfo
                rentInfo
                acreage
                progressStatus
                handOverYear
                type
            }
            investor {
                about
                name
            }
            directLink
            googleMapsLink
            virtual3DLink
        }
    }
`
export interface GetProjectByDirectLinkData {
    project: ProjectInterface
}

export interface GetProjectByDirectLinkVars {
    link: string
}

export const GET_ALL_PROJECT_POSTS = gql`
    query projects {
        projects: getAllProjects {
            _id
            projectName
            description
            media {
                images
            }
            address {
                province
                district
                ward
                street
                houseNumber
                showHouseNumber
            }
            masterPlan {
                image
                title
            }
            utilities {
                image
                title
            }
            information {
                purchaseInfo
                rentInfo
                acreage
                progressStatus
                handOverYear
                type
            }
            investor {
                about
                name
            }
            directLink
            googleMapsLink
            virtual3DLink
            outstanding
            actived
        }
    }
`
export interface GetAllProjectPostData {
    projects: ProjectInterface[]
}
