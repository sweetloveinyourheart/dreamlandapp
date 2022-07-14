import { FunctionComponent, useCallback } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Ant from 'react-native-vector-icons/AntDesign'
import { RealEstateType } from "../../../types/enums/realEstate";

interface RSTypeFilterProps {
    type: RealEstateType | undefined
    onSelect: (type: RealEstateType | undefined) => void
    onCloseSelector: () => void
}

const RSTypeFilter: FunctionComponent<RSTypeFilterProps> = ({ onCloseSelector, type, onSelect }) => {

    const onSelected = useCallback((type: RealEstateType | undefined) => {
        onSelect(type)
        onCloseSelector()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.headerModal}>
                <Pressable style={{ width: 28 }} onPress={() => onCloseSelector()}>
                    <Ant name="close" size={28} />
                </Pressable>
                <Text style={styles.headerModalTxt}> Chọn loại hình bất động sản </Text>
                <View style={{ width: 28 }}></View>
            </View>
            <ScrollView>
                <Pressable style={[styles.item]} onPress={() => onSelected(undefined)}>
                    <Text
                        style={{
                            color: type === undefined ? "#f93707" : "#222",
                            fontWeight: type === undefined ? "600" : "400"
                        }}
                    >Tất cả
                    </Text>
                </Pressable>
                <Pressable style={[styles.item]} onPress={() => onSelected(RealEstateType.CanHo)}>
                    <Text
                        style={{
                            color: type === RealEstateType.CanHo ? "#f93707" : "#222",
                            fontWeight: type === RealEstateType.CanHo ? "600" : "400"
                        }}
                    >Căn hộ/Chung cư
                    </Text>
                </Pressable>
                <Pressable style={[styles.item]} onPress={() => onSelected(RealEstateType.NhaO)}>
                    <Text
                        style={{
                            color: type === RealEstateType.NhaO ? "#f93707" : "#222",
                            fontWeight: type === RealEstateType.NhaO ? "600" : "400"
                        }}
                    >Nhà ở</Text>
                </Pressable>
                <Pressable style={[styles.item]} onPress={() => onSelected(RealEstateType.Dat)}>
                    <Text
                        style={{
                            color: type === RealEstateType.Dat ? "#f93707" : "#222",
                            fontWeight: type === RealEstateType.Dat ? "600" : "400"
                        }}
                    >Đất đai
                    </Text>
                </Pressable>
                <Pressable style={[styles.item]} onPress={() => onSelected(RealEstateType.VanPhong)}>
                    <Text
                        style={{
                            color: type === RealEstateType.VanPhong ? "#f93707" : "#222",
                            fontWeight: type === RealEstateType.VanPhong ? "600" : "400"
                        }}
                    >Văn phòng/Mặt bằng kinh doanh</Text>
                </Pressable>
                <Pressable style={[styles.item]} onPress={() => onSelected(RealEstateType.PhongTro)}>
                    <Text
                        style={{
                            color: type === RealEstateType.PhongTro ? "#f93707" : "#222",
                            fontWeight: type === RealEstateType.PhongTro ? "600" : "400"
                        }}
                    >Nhà trọ</Text>
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

export default RSTypeFilter;