import { useNavigation } from "@react-navigation/native";
import { FunctionComponent } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons'

interface UploadHeaderProps {
    onUpload: () => void
}

const UploadHeader: FunctionComponent<UploadHeaderProps> = ({ onUpload }) => {

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
                <Text style={styles.text}>Tạo bài đăng mới</Text>
            </View>
            <View style={styles.dummy}>
                <TouchableOpacity onPress={() => onUpload()}>
                    <Text style={{ color: "#777" }}>
                        <Ionicon
                            name="cloud-upload-outline"
                            size={20}
                            color={"#777"}
                        /> Đăng
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: "#ffb41f",
        alignItems: 'center',
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    back: {
        flex: 0.2,
        color: "#fff"
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

export default UploadHeader;