import { gql } from "@apollo/client";

export const LOGIN = gql`
    query($account: LoginInput!, $device: UpdateDevice) {
        login(account: $account, device: $device) {
            accessToken
            refreshToken
        }
    }
`
export interface LoginData {
    login: {
        accessToken: string
        refreshToken: string
    }
}

export interface LoginVars {
    account: {
        phone: string
        password: string
    }
    device?: {
        OS: string
        expoPushToken: string
    }
}

export const REFRESH_TOKEN = gql`
    query($refreshToken: String!) {
        refreshToken(refreshToken: $refreshToken) {
            accessToken
        }
    }
`