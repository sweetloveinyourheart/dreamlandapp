import { useNavigation } from "@react-navigation/native";
import { FunctionComponent } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons'

interface SearchHeaderProps {}
 
const SearchHeader: FunctionComponent<SearchHeaderProps> = () => {
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
                <Text style={styles.text}>Tìm kiếm bất động sản</Text>
            </View>
            <View style={styles.dummy}>
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
        flex: 0.15,
        color: "#fff"
    },
    textArea: {
        flex: 0.7,
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
        flex: 0.15
    }
})

export default SearchHeader;