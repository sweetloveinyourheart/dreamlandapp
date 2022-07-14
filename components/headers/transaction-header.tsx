import { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons'

interface TransactionHeaderProps {
    onReload: () => void
}

const TransactionHeader: FunctionComponent<TransactionHeaderProps> = ({ onReload }) => {
    return (
        <View style={{ paddingVertical: 12, paddingHorizontal: 24, backgroundColor: "#ffb41f", flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: 24 }}></View>
            <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 16, color: "#fff" }}>Giao dịch của bạn</Text>
            <View style={{ width: 24 }}>
                <TouchableOpacity  onPress={() => onReload()}>
                    <Ionicon
                        name="refresh"
                        size={24}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default TransactionHeader;