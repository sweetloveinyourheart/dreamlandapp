import { gql } from "@apollo/client";

export const CREATE_APARTMENT_POST = gql`
    mutation CreateApartment($data: CreateApartmentInput!) {
        createApartmentPost(data: $data) {
            title
            postStatus
        }
    }
`

export const CREATE_HOUSE_POST = gql`
    mutation CreateHouse($data: CreateHouseInput!) {
        createHousePost(data: $data) {
            title
            postStatus
        }
    }
`

export const CREATE_LAND_POST = gql`
    mutation CreateLand($data: CreateLandInput!) {
        createLandPost(data: $data) {
            title
            postStatus
        }
    }
`
export const CREATE_BUSINESS_PREMISES_POST = gql`
    mutation CreateBusinessPremises($data: CreateBusinessPremisesInput!) {
        createBusinessPremisesPost(data: $data) {
            title
            postStatus
        }
    }
`

export const CREATE_MOTAL_POST = gql`
    mutation CreateMotal($data: CreateMotalInput!) {
        createMotalPost(data: $data) {
            title
            postStatus
        }
    }
`
