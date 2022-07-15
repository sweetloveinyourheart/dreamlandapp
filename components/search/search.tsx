import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { categorySpeaker } from "../../libs/speaker";
import { RealEstateCategory } from "../../types/enums/realEstate";
import Feather from 'react-native-vector-icons/Feather'
import Ionicon from 'react-native-vector-icons/Ionicons'
import CategoryFilter from "../filters/items/category";

interface SearchProps {
    category?: RealEstateCategory
    search?: string
    onSearch: (category: RealEstateCategory, search: string) => void
}

const Search: FunctionComponent<SearchProps> = ({ onSearch, search, category }) => {
    const [categoryState, setCategoryState] = useState<RealEstateCategory>(RealEstateCategory.MuaBan)
    const [openFilter, setOpenFilter] = useState<boolean>(false)

    const [searchState, setSearch] = useState("")

    useEffect(() => {
        if (category && search) {
            setSearch(search)
            setCategoryState(category)
        }
    }, [search, category])

    const onSelectCategory = useCallback((category: RealEstateCategory) => {
        setCategoryState(category)
    }, [categoryState])

    const onActiveSearch = useCallback(() => {
        if (searchState.length === 0) return;

        onSearch(categoryState, searchState)
    }, [onSearch, categoryState, searchState])

    return (
        <View style={styles.container}>
            <View style={styles.searchArea}>
                <View  style={styles.textField}>
                    <TouchableOpacity style={styles.item} onPress={() => setOpenFilter(s => !s)}>
                        <Text>{categorySpeaker(categoryState)} </Text>
                        <Feather name="chevron-down" size={16} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setSearch(text)}
                        value={searchState}
                        placeholder="Tìm kiếm bất động sản"
                    />
                </View>
                <TouchableOpacity style={styles.searchBtn} onPress={() => onActiveSearch()}>
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
                    <CategoryFilter
                        category={categoryState}
                        onSelected={onSelectCategory}
                        onCloseSelector={() => setOpenFilter(s => !s)}
                    />
                </SafeAreaView>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
    searchArea: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textField: {
        flex: 0.9,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        height: 36
    },
    searchBtn: {
        flex: 0.1,
        alignItems: 'flex-end'
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


export default Search;