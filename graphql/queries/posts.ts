import { gql } from "@apollo/client";

export const GET_APARTMENT_POST_BY_DIRECT_LINK = gql`
    query Apartment($link: String!) {
        apartment: getApartmentPostByLink(link: $link) {
            _id
            title
            description
            category
            media {
                images
                videos
            }
            detail {
                address {
                    province
                    district
                    ward
                    street
                    houseNumber
                    showHouseNumber
                }
                pricing {
                    total
                    deposit
                }
                acreage {
                    totalAcreage
                }
                
            }
            owner {
                name
                phone
            }
            overview {
                doorDirection
                legalDocuments
                type
                status
                balconyDirection
                numberOfBedrooms
                numberOfBathrooms
                furniture
            }
            index
            googleMapsLink
            virtual3DLink
            postStatus
        }
    }
`

export const GET_HOUSE_POST_BY_DIRECT_LINK = gql`
    query House($link: String!) {
        house: getHousePostByLink(link: $link) {
            _id
            title
            description
            category
            media {
                images
                videos
            }
            detail {
                address {
                    province
                    district
                    ward
                    street
                    houseNumber
                    showHouseNumber
                }
                pricing {
                    total
                    deposit
                }
                acreage {
                    totalAcreage
                }
                
            }
            owner {
                name
                phone
            }
            overview {
                doorDirection
                legalDocuments
                type
                numberOfBedrooms
                numberOfBathrooms
                furniture
                numberOfFloors
            }
            index
            googleMapsLink
            virtual3DLink
            postStatus
        }
    }
`

export const GET_LAND_POST_BY_DIRECT_LINK = gql`
    query Land($link: String!) {
        land: getLandPostByLink(link: $link) {
            _id
            title
            description
            category
            media {
                images
                videos
            }
            detail {
                address {
                    province
                    district
                    ward
                    street
                    houseNumber
                    showHouseNumber
                }
                pricing {
                    total
                    deposit
                }
                acreage {
                    totalAcreage
                    width
                    height
                }
                
            }
            owner {
                name
                phone
            }
            overview {
                doorDirection
                legalDocuments
                type
                carAlley
              	noHau
              	frontispiece
            }
            index
            googleMapsLink
            virtual3DLink
            postStatus
        }
    }
`

export const GET_BUSINESS_PREMISES_POST_BY_DIRECT_LINK = gql`
    query Premises($link: String!) {
        businessPremises: getBusinessPremisesPostByLink(link: $link) {
            _id
            title
            description
            category
            media {
                images
                videos
            }
            detail {
                address {
                    province
                    district
                    ward
                    street
                    houseNumber
                    showHouseNumber
                }
                pricing {
                    total
                }
                acreage {
                    totalAcreage
                }
                
            }
            owner {
                name
                phone
            }
            overview {
                doorDirection
                legalDocuments
                type
                furniture
            }
            index
            googleMapsLink
            virtual3DLink
            postStatus
        }
    }
`

export const GET_MOTAL_POST_BY_DIRECT_LINK = gql`
    query Motal($link: String!) {
        motal: getMotalPostByLink(link: $link) {
            _id
            title
            description
            category
            media {
                images
                videos
            }
            detail {
                address {
                    province
                    district
                    ward
                    street
                    houseNumber
                    showHouseNumber
                }
                pricing {
                    total
                    deposit
                }
                acreage {
                    totalAcreage
                }
            }
            owner {
                name
                phone
            }
            overview {
                doorDirection
                legalDocuments
                furniture
                numberOfFloors
            }
            index
            googleMapsLink
            virtual3DLink
            postStatus
        }
    }
`