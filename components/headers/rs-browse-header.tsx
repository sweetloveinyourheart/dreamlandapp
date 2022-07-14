import { FunctionComponent, useState } from "react";
import { Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Picker } from '@react-native-picker/picker';
import { RealEstateCategory } from "../../types/enums/realEstate";
import Feather from 'react-native-vector-icons/Feather'
import CategoryFilter from "../filters/items/category";

interface RSBrowseHeaderProps {

}

const RSBrowseHeader: FunctionComponent<RSBrowseHeaderProps> = () => {
    const [category, setCategory] = useState<RealEstateCategory>(RealEstateCategory.MuaBan)
    const [openFilter, setOpenFilter] = useState<boolean>(false)

    return (
        <View style={styles.container}>
            <View style={styles.searchArea}>
                <TouchableOpacity style={styles.item} onPress={() => setOpenFilter(s => !s)}>
                    <Text>Mua Bán </Text>
                    <Feather name="chevron-down" size={16} />
                </TouchableOpacity>
                <TextInput style={styles.input} placeholder="Tìm kiếm bất động sản" />
                <TouchableOpacity style={styles.searchBtn}>
                    <Ionicon
                        name="search-outline"
                        size={24}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={openFilter}
                onRequestClose={() => setOpenFilter(s => !s)}
            >
                <SafeAreaView style={{ flex: 0, backgroundColor: '#ffb41f' }} />
                <SafeAreaView style={{ flex: 1 }}>
                    <CategoryFilter onCloseSelector={() => setOpenFilter(s => !s)} />
                </SafeAreaView>
            </Modal>
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
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        height: 36
    },
    searchBtn: {
        flex: 0.2,
        alignItems: 'center'
    },
    picker: {
        flex: 1
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: "#fff",
        borderColor: "#dcdcdc",
        borderRightWidth: 1,
        height: 36
    },
    image: {
        resizeMode: 'contain',
        width: undefined,
        height: undefined,
        flex: 1
    }
})

export default RSBrowseHeader;