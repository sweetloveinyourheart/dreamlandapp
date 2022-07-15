import { useApolloClient, useLazyQuery } from "@apollo/client";
import { createContext, Fragment, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { LOGIN, LoginData, LoginVars } from "../graphql/queries/auth";
import { GetProfileData, GET_PROFILE } from "../graphql/queries/user";
import { Profile } from "../types/interfaces/user";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import Login from "../components/auth/login";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Quyền gửi thông báo chưa được cho phép!');
            return;
        }
        token = (await Notifications.getDevicePushTokenAsync()).data;
    } else {
        alert('Bạn phải dùng thiết bị di động để nhận thông báo');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

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
    const [error, setError] = useState<string | undefined>()

    const [profileQuery, { data: profileData, error: profileError, loading: profileLoading }] = useLazyQuery<GetProfileData>(GET_PROFILE, {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only'
    })
    const [loginQuery, { data: loginData, error: loginError, loading: loginLoading }] = useLazyQuery<LoginData, LoginVars>(LOGIN, {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only'
    })

    const client = useApolloClient()

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

    const login = useCallback(async (phone: string, password: string) => {
        const expoPushToken = await registerForPushNotificationsAsync()
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
    }, [loginQuery])

    const logout = useCallback(async () => {
        await AsyncStorage.clear()
        await client.clearStore()
        setUser(null)

    }, [AsyncStorage, user])

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
                        <Login loading={loading} login={login} error={error} />
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