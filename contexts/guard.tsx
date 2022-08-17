import { FunctionComponent, ReactNode, useEffect } from "react";
import { useAuth } from "./auth";
import { Fragment } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import AuthHeader from "../components/headers/auth-header";
import { useLinkTo } from "@react-navigation/native";
import RedirectToLogin from "../components/auth/redirect";

interface AuthenticationGuardProps {
    children: ReactNode
}

const AuthenticationGuard: FunctionComponent<AuthenticationGuardProps> = ({ children }) => {
    const { user } = useAuth()
    const linkTo = useLinkTo()

    useEffect(() => {
        if(!user) {
            linkTo('/auth-screen')
        }
    }, [user])

    if (!user)
        return (
            <Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#ffb41f' }} />
                <SafeAreaView style={{ flex: 1 }}>
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                        <AuthHeader />
                        <RedirectToLogin />
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </Fragment>
        )

    return (
        <>
            {children}
        </>
    );
}

export default AuthenticationGuard;