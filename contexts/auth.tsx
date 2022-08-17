import { useApolloClient, useLazyQuery } from "@apollo/client";
import { createContext, Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { LOGIN, LoginData, LoginVars, REFRESH_TOKEN } from "../graphql/queries/auth";
import { GetProfileData, GET_PROFILE } from "../graphql/queries/user";
import { Profile } from "../types/interfaces/user";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import { usePushNotification } from "./notification";
import { useLinkTo } from "@react-navigation/native";

interface AuthenticationInterface {
    user: Profile | null | undefined
    loading: boolean
    error: string | undefined
    login: (phone: string, password: string) => void
    logout: () => void
    hasPermission: () => boolean
}

const AuthContext = createContext({} as AuthenticationInterface)

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: any }) {
    const [user, setUser] = useState<Profile | null | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>()

    const intervalRef = useRef<any>()

    const [profileQuery, { data: profileData, error: profileError, loading: profileLoading }] = useLazyQuery<GetProfileData>(GET_PROFILE, {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only'
    })

    const [loginQuery, { data: loginData, error: loginError, loading: loginLoading }] = useLazyQuery<LoginData, LoginVars>(LOGIN, {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only'
    })

    const [refreshTokenQuery, { data: refreshData, error: refreshError }] = useLazyQuery(REFRESH_TOKEN, { fetchPolicy: "no-cache" })

    const client = useApolloClient()
    const pushNotification = usePushNotification()
    const linkTo = useLinkTo()


    useEffect(() => {
        // First query for profile if refresh token is exist
        if (user === undefined)
            (async () => {
                const exist = await AsyncStorage.getItem('refreshToken')

                if (exist) {
                    // Retry request
                    profileQuery()
                }
            })()

        if (user) {
            (async () => {
                const token = await AsyncStorage.getItem('refreshToken')

                if (token) {
                    // Retry request
                    const interval = setInterval(async () => {
                        refreshTokenQuery({ variables: { refreshToken: token } })
                    }, 30 * 60 * 1000);
                    intervalRef.current = interval;
                    return () => clearInterval(interval);
                }
            })()
        }
    }, [user])

    useEffect(() => {
        // handle login query data
        if (loginData && !loginError) {
            (async () => {
                setError(undefined)
                await AsyncStorage.setItem('accessToken', loginData.login.accessToken)
                await AsyncStorage.setItem('refreshToken', loginData.login.refreshToken)
                profileQuery()
            })()
        }

        if (loginError) {
            setError('Đăng nhập thất bại, vui lòng thử lại')
        }

    }, [loginData, loginError])

    useEffect(() => {
        // handle loading
        if (loginLoading || profileLoading) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [loginLoading, profileLoading])

    useEffect(() => {
        // handle profile query data
        if (profileData && !profileError) {
            setUser(profileData.profile)
        }
    }, [profileData, profileError])

    useEffect(() => {
        // handle refresh token
        if (refreshData && !refreshError) {
            (async () => {
                console.log("token");

                const { accessToken } = refreshData.refreshToken
                await AsyncStorage.setItem('accessToken', accessToken)
            })()
        }

        if (refreshError) {
            (async () => {
                // await AsyncStorage.removeItem('refreshToken')
                // setUser(null)
                logout()
                clearInterval(intervalRef.current)
            })
        }

    }, [refreshData, refreshError])

    const login = useCallback(async (phone: string, password: string) => {
        try {
            setLoading(true)
            const expoPushToken = await pushNotification.registerNotification()
            const OS = Device.osName

            loginQuery({
                variables: {
                    account: {
                        phone,
                        password
                    },
                    ...((expoPushToken && OS) && { device: { expoPushToken, OS } })
                }
            })
        } catch (error) {
            alert(`error: ${error}`)
        }
    }, [loginQuery])

    const hasPermission = useCallback(() => {
        if(!user) {
            linkTo('/auth-screen')
            return false
        }

        return true
    }, [user])

    const logout = useCallback(async () => {
        await AsyncStorage.clear()
        await client.clearStore()
        setUser(null)

    }, [AsyncStorage, user])

    const memoedValue = useMemo(() => ({
        user,
        loading,
        login,
        logout,
        error,
        hasPermission
    }), [user, loading, login, logout, error, hasPermission])

    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    )
}