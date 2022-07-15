import { gql } from "@apollo/client";
import { Profile } from "../../types/interfaces/user";

export const GET_PROFILE = gql`
    query {
        profile: getProfile {
            phone
            name
            address
            birthday
            sex
            createdAt
            roles
        }
    }
`

export interface GetProfileData {
    profile: Profile
}