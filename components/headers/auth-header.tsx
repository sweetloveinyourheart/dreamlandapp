import { useNavigation } from "@react-navigation/native";
import { FunctionComponent } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons'

interface AuthHeaderProps {}

const AuthHeader: FunctionComponent<AuthHeaderProps> = () => {

    const navigation = useNavigation();

    const onGoback = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.back}>
                <TouchableOpacity onPress={() => onGoback()}>
                    <Ionicon
                        name="arrow-back"
                        size={24}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.textArea}>
                <Text style={styles.text}>Đăng Nhập</Text>
            </View>
            <View style={styles.dummy}>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        paddingHorizontal: 12,
        backgroundColor: "#ffb41f",
        alignItems: 'center',
        flexDirection: 'row'
    },
    back: {
        flex: 0.2
    },
    textArea: {
        flex: 0.6,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        width: '100%',
        color: "#fff"
    },
    dummy: {
        flex: 0.20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
})

export default AuthHeader;