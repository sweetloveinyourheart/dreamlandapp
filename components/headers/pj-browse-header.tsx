import { useNavigation } from "@react-navigation/native";
import { FunctionComponent, useCallback, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons'

interface PJBrowseHeaderProps {
    onSearch: (text: string) => void
}

const PJBrowseHeader: FunctionComponent<PJBrowseHeaderProps> = ({ onSearch }) => {
    const [search, setSearch] = useState<string>("")

    const onActiveSearch = useCallback(() => {
        onSearch(search)
    }, [search])

    return (
        <View style={styles.container}>
            <View style={styles.searchArea}>
                {/* <View style={styles.logo}>
                    <Image source={logo} style={styles.image} />
                </View> */}
                <TextInput 
                    style={styles.input} 
                    placeholder="Tìm kiếm dự án" 
                    value={search} 
                    onChangeText={txt => setSearch(txt)}
                />
                <TouchableOpacity style={styles.searchBtn} onPress={() => onActiveSearch()}>
                    <Ionicon
                        name="search-outline"
                        size={24}
                        color="#fff"
                    />
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
        
    },
    searchArea: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 0.8,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        height: 36
    },
    searchBtn: {
        flex: 0.2,
        alignItems: 'center'
    },
    logo: {
        flex: 0.2,
        height: 36,

    },
    image: {
        resizeMode: 'contain',
        width: undefined,
        height: undefined,
        flex: 1
    }
})

export default PJBrowseHeader;