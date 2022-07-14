import { FunctionComponent, useCallback, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ant from 'react-native-vector-icons/AntDesign'
import { loginImage } from "../../constants/images";

interface LoginProps {
    loading: boolean
    login: (phone: string, password: string) => void
}

const Login: FunctionComponent<LoginProps> = ({ loading, login  }) => {
    const [loginForm, setLoginForm] = useState({
        phone: '',
        password: ''
    })

    const onLogin = useCallback(() => {
        login(loginForm.phone, loginForm.password)
    }, [loginForm])

    return (
        <View style={styles.container}>
            <View style={styles.image}>
                <Image
                    source={loginImage}
                    style={{
                        resizeMode: "contain",
                        flex: 1,
                        width: undefined,
                        height: undefined
                    }}
                />
            </View>
            <View style={styles.loginArea}>
                <Text style={styles.loginTitle}>Đăng nhập</Text>
                <View style={styles.loginField}>
                    <View style={styles.fieldIcon}>
                        <Ant
                            name="phone"
                            size={20}
                            color="#777"
                        />
                    </View>
                    <TextInput
                        style={styles.fieldText}
                        placeholder="Số điện thoại"
                        keyboardType="phone-pad"
                        value={loginForm.phone}
                        onChangeText={txt => setLoginForm(s => ({ ...s, phone: txt }))}
                    />
                </View>
                <View style={styles.loginField}>
                    <View style={styles.fieldIcon}>
                        <Ant
                            name="key"
                            size={20}
                            color="#777"
                        />
                    </View>
                    <TextInput
                        style={styles.fieldText}
                        placeholder="Mật khẩu"
                        secureTextEntry={true}
                        value={loginForm.password}
                        onChangeText={txt => setLoginForm(s => ({ ...s, password: txt }))}
                    />

                </View>
                <View style={styles.actions}>
                    {loading
                        ? <ActivityIndicator />
                        : (
                            <TouchableOpacity style={styles.actionBtn} disabled={loading} onPress={() => onLogin()}>
                                <Text style={styles.actionTxt}>Đăng nhập</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff"
    },
    image: {
        height: 225,
        width: '100%'
    },
    loginArea: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 32,
        minHeight: 400
    },
    loginTitle: {
        fontWeight: '600',
        fontSize: 24,
        marginBottom: 20
    },
    loginField: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderBottomColor: "#dcdcdc",
        borderBottomWidth: 1,
        marginBottom: 8
    },
    fieldIcon: {
        width: 40
    },
    fieldText: {
        fontSize: 16,
        flex: 1
    },
    actions: {
        marginVertical: 24
    },
    actionBtn: {
        paddingVertical: 16,
        backgroundColor: "#ffb41f",
        borderRadius: 12
    },
    actionTxt: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: "#fff"
    }
})

export default Login;