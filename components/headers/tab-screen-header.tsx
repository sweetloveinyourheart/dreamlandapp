import { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons'

interface TabScreenHeaderProps {
    title: string
}

const TabScreenHeader: FunctionComponent<TabScreenHeaderProps> = ({ title }) => {
    return (
        <View style={{ paddingVertical: 12, paddingHorizontal: 24, backgroundColor: "#ffb41f", flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: 24 }}></View>
            <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 16, color: "#fff" }}>{title}</Text>
            <View style={{ width: 24 }}>
                <TouchableOpacity>
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

export default TabScreenHeader;