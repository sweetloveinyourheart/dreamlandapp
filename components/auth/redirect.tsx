import { useLinkTo } from "@react-navigation/native";
import { FunctionComponent } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface RedirectToLoginProps {

}

const RedirectToLogin: FunctionComponent<RedirectToLoginProps> = () => {
    const linkTo = useLinkTo()

    return (
        <View style={styles.container}>
            <View style={styles.area}>
                <Text style={styles.txt}>Bạn cần đăng nhập để tiếp tục !</Text>
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={[styles.actionBtn, { backgroundColor: "#ffb41f" }]}
                        onPress={() => linkTo('/auth-screen')}
                    >
                        <Text style={styles.actionTxt}>Đăng nhập</Text>
                    </TouchableOpacity>
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
    area: {},
    txt: {
        fontSize: 18,
        fontWeight: '500'
    },
    actions: {
        marginVertical: 12,
        alignItems: 'center'
    },
    actionBtn: {
        paddingVertical: 12,
        backgroundColor: "#ffb41f",
        borderRadius: 8,
        width: 150
    },
    actionTxt: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        color: "#fff"
    },
})

export default RedirectToLogin;