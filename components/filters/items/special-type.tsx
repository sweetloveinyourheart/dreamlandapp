import { FunctionComponent, useCallback } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Ant from 'react-native-vector-icons/AntDesign'
import { apartmentTypeSpeaker, houseTypeSpeaker, landTypeSpeaker, premisesTypeSpeaker } from "../../../libs/speaker";
import { ApartmentType, BusinessPremisesType, HouseType, LandType, RealEstateType } from "../../../types/enums/realEstate";

interface SpecialTypeFilterProps {
    postsType: RealEstateType | undefined
    type?: ApartmentType | HouseType | LandType | BusinessPremisesType | string
    onSelect: (type: ApartmentType | HouseType | LandType | BusinessPremisesType | string | undefined) => void
    onCloseSelector: () => void
}

const SpecialTypeFilter: FunctionComponent<SpecialTypeFilterProps> = ({ onCloseSelector, type, onSelect, postsType }) => {

    const onSelected = useCallback((type: ApartmentType | HouseType | LandType | BusinessPremisesType | string | undefined) => {
        onSelect(type)
        onCloseSelector()
    }, [])

    const renderList = () => {
        switch (postsType) {
            case RealEstateType.CanHo:
                return (Object.keys(ApartmentType).map(((typeItem, index) => {
                    return (
                        <Pressable style={styles.item} onPress={() => onSelected(typeItem)} key={index}>
                            <Text
                                style={{
                                    color: typeItem === type ? "#f93707" : "#222",
                                    fontWeight: typeItem === type ? "600" : "400"
                                }}
                            >{apartmentTypeSpeaker(typeItem)}</Text>
                        </Pressable>
                    )
                })))

            case RealEstateType.NhaO:
                return (Object.keys(HouseType).map(((typeItem, index) => {
                    return (
                        <Pressable style={styles.item} onPress={() => onSelected(typeItem)} key={index}>
                            <Text
                                style={{
                                    color: typeItem === type ? "#f93707" : "#222",
                                    fontWeight: typeItem === type ? "600" : "400"
                                }}
                            >{houseTypeSpeaker(typeItem)}</Text>
                        </Pressable>
                    )
                })))

            case RealEstateType.Dat:
                return (Object.keys(LandType).map(((typeItem, index) => {
                    return (
                        <Pressable style={styles.item} onPress={() => onSelected(typeItem)} key={index}>
                            <Text
                                style={{
                                    color: typeItem === type ? "#f93707" : "#222",
                                    fontWeight: typeItem === type ? "600" : "400"
                                }}
                            >{landTypeSpeaker(typeItem)}</Text>
                        </Pressable>
                    )
                })))

            case RealEstateType.VanPhong:
                return (Object.keys(BusinessPremisesType).map(((typeItem, index) => {
                    return (
                        <Pressable style={styles.item} onPress={() => onSelected(typeItem)} key={index}>
                            <Text
                                style={{
                                    color: typeItem === type ? "#f93707" : "#222",
                                    fontWeight: typeItem === type ? "600" : "400"
                                }}
                            >{premisesTypeSpeaker(typeItem)}</Text>
                        </Pressable>
                    )
                })))
                
            default:
                return <View></View>
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.headerModal}>
                <Pressable style={{ width: 28 }} onPress={() => onCloseSelector()}>
                    <Ant name="close" size={28} />
                </Pressable>
                <Text style={styles.headerModalTxt}> Chọn loại hình </Text>
                <View style={{ width: 28 }}></View>
            </View>
            <ScrollView>
                <Pressable style={styles.item} onPress={() => onSelected(undefined)}>
                    <Text
                        style={{
                            color: type === undefined ? "#f93707" : "#222",
                            fontWeight: type === undefined ? "600" : "400"
                        }}
                    >Không áp dụng lọc</Text>
                </Pressable>
                {renderList()}
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

export default SpecialTypeFilter;