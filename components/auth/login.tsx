import { FunctionComponent, useCallback, useState } from "react";
import { ActivityIndicator, Image, Modal, Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ant from 'react-native-vector-icons/AntDesign'
import { loginImage } from "../../constants/images";
import Checkbox from 'expo-checkbox';
import WebView from "react-native-webview";

interface LoginProps {
    error: string | undefined
    loading: boolean
    login: (phone: string, password: string) => void
}

const Login: FunctionComponent<LoginProps> = ({ loading, login, error }) => {
    const [loginForm, setLoginForm] = useState({
        phone: '',
        password: ''
    })
    const [accepted, setAccepted] = useState(false)
    const [requestForPivacy, setRequestForPivacy] = useState(false)

    const onLogin = useCallback(() => {
        if (!loginForm.phone || !loginForm.password)
            return;

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
                            <TouchableOpacity
                                style={[styles.actionBtn, { backgroundColor: accepted ? "#ffb41f" : "#dcdcdc" }]}
                                disabled={(loading || !accepted)}
                                onPress={() => onLogin()}
                            >
                                <Text style={styles.actionTxt}>Đăng nhập</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
                {error
                    && <Text style={{ textAlign: 'center', color: "#f30606", marginBottom: 8 }}>{error}</Text>
                }
                <View style={styles.pivacy}>
                    <Checkbox
                        style={{ marginRight: 12 }}
                        value={accepted}
                        onValueChange={() => setAccepted(s => !s)}
                        color={accepted ? '#4630EB' : undefined}
                    />
                    <TouchableOpacity onPress={() => setRequestForPivacy(true)}>
                        <Text>Đồng ý với <Text style={{ color: "#14a7fa" }}>chính sách </Text>và <Text style={{ color: "#14a7fa" }}>quyển riêng tư</Text></Text>
                    </TouchableOpacity>
                </View>
                {requestForPivacy
                    && (
                        <Modal
                            animationType="slide"
                            visible={requestForPivacy}
                            onRequestClose={() => setRequestForPivacy(false)}
                        >
                            <SafeAreaView style={{flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
                                <View style={{ backgroundColor: "#ffb41f", padding: 12, flexDirection: 'row', alignItems: "center" }}>
                                    <Pressable style={{ flex: 0.2 }} onPress={() => setRequestForPivacy(false)}>
                                        <Ant 
                                            name="close"
                                            size={24}
                                        />
                                    </Pressable>
                                    <Text style={{ flex: 0.6, textAlign: 'center', fontWeight: '600', fontSize: 16 }}> Điều khoản dịch vụ </Text>
                                    <View style={{ flex: 0.2 }}></View>
                                </View>
                                <WebView
                                    style={styles.container}
                                    source={{ uri: 'https://www.freeprivacypolicy.com/live/35e54375-943c-43d8-830b-78e9d13ce080' }}
                                />
                            </SafeAreaView>
                        </Modal>
                    )
                }
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
    },
    pivacy: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Login;