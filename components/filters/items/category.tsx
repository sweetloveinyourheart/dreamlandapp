import { FunctionComponent, useCallback } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Ant from 'react-native-vector-icons/AntDesign'
import { RealEstateCategory } from "../../../types/enums/realEstate";

interface CategoryFilterProps {
    category: RealEstateCategory
    onSelected: (category: RealEstateCategory) => void
    onCloseSelector: () => void

}

const CategoryFilter: FunctionComponent<CategoryFilterProps> = ({ onCloseSelector, onSelected, category }) => {

    const onSelect = useCallback((type: RealEstateCategory) => {
        onSelected(type)
        onCloseSelector()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.headerModal}>
                <Pressable style={{ width: 28 }} onPress={() => onCloseSelector()}>
                    <Ant name="close" size={28} />
                </Pressable>
                <Text style={styles.headerModalTxt}> Chọn thể loại bất động sản </Text>
                <View style={{ width: 28 }}></View>
            </View>
            <ScrollView>
                <Pressable style={styles.item} onPress={() => onSelect(RealEstateCategory.MuaBan)}>
                    <Text
                        style={{
                            color: category === RealEstateCategory.MuaBan ? "#f93707" : "#222",
                            fontWeight: category === RealEstateCategory.MuaBan ? "600" : "400"
                        }}
                    >Mua bán</Text>
                </Pressable>
                <Pressable style={styles.item} onPress={() => onSelect(RealEstateCategory.ChoThue)}>
                    <Text
                        style={{
                            color: category === RealEstateCategory.ChoThue ? "#f93707" : "#222",
                            fontWeight: category === RealEstateCategory.ChoThue ? "600" : "400"
                        }}
                    >Cho thuê</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    item: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderBottomColor: "#dcdcdc",
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerModal: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        backgroundColor: "#ffb41f",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerModalTxt: {
        fontSize: 16,
        fontWeight: '600'
    }
})

export default CategoryFilter;