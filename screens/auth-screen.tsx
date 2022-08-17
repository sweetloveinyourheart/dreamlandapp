import { useLinkTo } from "@react-navigation/native";
import { Fragment, useEffect } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import Login from "../components/auth/login";
import AuthHeader from "../components/headers/auth-header";
import { useAuth } from "../contexts/auth";


function AuthScreen() {
    const { login, loading, error, user } = useAuth()
    const linkTo = useLinkTo()

    useEffect(() => {
        if(user) {
            linkTo('/user-screen')
        }
    }, [user])

    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#ffb41f' }} />
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                    <AuthHeader />
                    <Login loading={loading} login={login} error={error} />
                </KeyboardAvoidingView>
            </SafeAreaView>
        </Fragment>
    )
}

export default AuthScreen;