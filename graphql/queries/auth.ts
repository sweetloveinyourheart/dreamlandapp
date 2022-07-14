import { gql } from "@apollo/client";

export const LOGIN = gql`
    query($account: LoginInput!) {
        login(account: $account) {
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
}

export const REFRESH_TOKEN = gql`
    query($refreshToken: String!) {
        refreshToken(refreshToken: $refreshToken) {
            accessToken
        }
    }
`