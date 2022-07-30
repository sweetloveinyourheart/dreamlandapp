import { useNavigation } from "@react-navigation/native";
import { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons'

interface UploadedHeaderProps {
    onReload: () => void

}

const UploadedHeader: FunctionComponent<UploadedHeaderProps> = ({ onReload }) => {
    const navigation = useNavigation();

    const onGoback = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
        }
    }

    return (
        <View style={{ paddingVertical: 12, paddingHorizontal: 24, backgroundColor: "#ffb41f", flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: 24 }}>
                <TouchableOpacity onPress={() => onGoback()}>
                    <Ionicon
                        name="arrow-back"
                        size={24}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>
            <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 16, color: "#fff" }}>Lịch sử đăng bài</Text>
            <View style={{ width: 24 }}>
                <TouchableOpacity onPress={() => onReload()}>
                    <Ionicon
                        name="refresh"
                        size={24}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>
        </View >
    );
}

export default UploadedHeader;