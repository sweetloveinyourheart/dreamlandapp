import { useLazyQuery } from "@apollo/client";
import { createContext, Fragment, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { LOGIN, LoginData, LoginVars } from "../graphql/queries/auth";
import { GetProfileData, GET_PROFILE } from "../graphql/queries/user";
import { Profile } from "../types/interfaces/user";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import Login from "../components/auth/login";

interface AuthenticationInterface {
    user: Profile | null | undefined
    loading: boolean
    login: (phone: string, password: string) => void
    logout: () => void
}

const AuthContext = createContext({} as AuthenticationInterface)

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: any }) {
    const [user, setUser] = useState<Profile | null | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(false);

    const [profileQuery, { data: profileData, error: profileError, loading: profileLoading }] = useLazyQuery<GetProfileData>(GET_PROFILE, {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only'
    })
    const [loginQuery, { data: loginData, error: loginError, loading: loginLoading }] = useLazyQuery<LoginData, LoginVars>(LOGIN, {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only'
    })

    useEffect(() => {
        // First query for profile if refresh token is exist
        (async () => {
            const exist = await AsyncStorage.getItem('refreshToken')
            if (exist) {
                // Retry request
                if (user === undefined)
                    setInterval(() => profileQuery(), 500)
            }
        })()
    }, [])

    useEffect(() => {
        // handle login query data
        if (loginData && !loginError) {
            (async () => {
                await AsyncStorage.setItem('accessToken', loginData.login.accessToken)
                await AsyncStorage.setItem('refreshToken', loginData.login.refreshToken)
                profileQuery()
            })()
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

    const login = useCallback((phone: string, password: string) => {
        loginQuery({
            variables: {
                account: {
                    phone,
                    password
                }
            }
        })
    }, [loginQuery])

    const logout = useCallback(async () => {
        await AsyncStorage.removeItem('refreshToken')
        await AsyncStorage.removeItem('accessToken')
        setUser(null)
    }, [AsyncStorage])

    const memoedValue = useMemo(() => ({
        user,
        loading,
        login,
        logout
    }), [user, loading, login, logout])


    if (!user) {
        return (
            <Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#fff' }} />
                <SafeAreaView style={{ flex: 1 }}>
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                        <Login loading={loading} login={login} />
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </Fragment>
        )
    }

    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    )
}