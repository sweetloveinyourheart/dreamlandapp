import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Modal, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from 'react-native-vector-icons/Feather'
import Ant from 'react-native-vector-icons/AntDesign'
import { ScrollView } from "react-native-gesture-handler";
import CategoryFilter from "./items/category";
import RSTypeFilter from "./items/rs-type";
import AddressFilter from "./items/address";
import PriceFilter from "./items/price";
import { RsFilterInterface } from "../../graphql/queries/rs-list";
import { Direction, RealEstateCategory, RealEstateType } from "../../types/enums/realEstate";
import { categorySpeaker, realEstateTypeSpeaker } from "../../libs/speaker";
import ProjectListFilter from "./items/project";
import AcreageFilter from "./items/acreage";
import { BalconyDirectionFilter, DoorDirectionFilter } from "./items/direction";
import BedroomsFilter from "./items/rooms";
import SpecialTypeFilter from "./items/special-type";

interface RealEstateFilterProps {
    display: 'vertical' | 'column'
    initialFilter: RsFilterInterface
    type: RealEstateType | undefined
    onChangeDisplay: () => void
    onApplyFilter: (filter: RsFilterInterface) => void
    onChangeType: (type: RealEstateType | undefined) => void
}

enum FilterEnum {
    Type = 1,
    Category,
    Price,
    Project,
    Address,
    Acreage,
    BalconyDirection,
    DoorDirection,
    Bedrooms,
    SpecialType
}

const RealEstateFilter: FunctionComponent<RealEstateFilterProps> = ({ display, onChangeDisplay, initialFilter, onApplyFilter, type, onChangeType }) => {
    const [selectedModalFilter, setSelectedModalFilter] = useState<FilterEnum | undefined>()
    const [modalVisible, setModalVisible] = useState(false);

    const [filter, setFilter] = useState<RsFilterInterface>(initialFilter)

    const onSelectFilter = useCallback((filter: FilterEnum) => {
        setSelectedModalFilter(filter)
        setModalVisible(true)
    }, [selectedModalFilter])

    const onCloseSelector = useCallback(() => {
        setSelectedModalFilter(undefined)
        setModalVisible(false)
    }, [selectedModalFilter])

    useEffect(() => {
        setFilter(initialFilter)
    }, [initialFilter])

    // === Active Filter ===
    const onActiveAddressFilter = useCallback((province: string | undefined, district: string | undefined, ward: string | undefined) => {
        setFilter(prevState => ({
            ...prevState,
            address: {
                province,
                district,
                ward
            }
        }))
    }, [filter])

    const onActiveCategoryFilter = useCallback((category: RealEstateCategory) => {
        setFilter(prevState => ({
            category
        }))
    }, [filter])

    const onActivePriceFilter = useCallback((price: { min: number, max: number | undefined } | undefined) => {
        setFilter(prevState => ({
            ...prevState,
            price
        }))
    }, [filter])

    const onActiveProjectFilter = useCallback((project: string | undefined) => {
        setFilter(prevState => ({
            ...prevState,
            project
        }))
    }, [filter])

    const onActiveAcreageFilter = useCallback((acreage: { min: number, max: number | undefined } | undefined) => {
        setFilter(prevState => ({
            ...prevState,
            acreage
        }))
    }, [filter])

    const onActiveBalconyDirecionFilter = useCallback((direction: Direction | undefined) => {
        setFilter(prevState => ({
            ...prevState,
            balconyDirection: direction
        }))
    }, [filter])

    const onActiveDoorDirecionFilter = useCallback((direction: Direction | undefined) => {
        setFilter(prevState => ({
            ...prevState,
            doorDirection: direction
        }))
    }, [filter])

    const onActiveBedroomsFilter = useCallback((rooms: number | undefined) => {
        setFilter(prevState => ({
            ...prevState,
            numberOfBedrooms: rooms
        }))
    }, [filter])

    const onActiveSpecialTypeFilter = useCallback((type: string | undefined) => {
        setFilter(prevState => ({
            ...prevState,
            type
        }))
    }, [filter])


    // Apply Filter

    useEffect(() => {
        onApplyFilter(filter)
    }, [filter])

    const showFilterSelector = () => {
        if (selectedModalFilter) {
            switch (selectedModalFilter) {
                case FilterEnum.Category:
                    return <CategoryFilter category={filter.category} onSelected={onActiveCategoryFilter} onCloseSelector={onCloseSelector} />
                case FilterEnum.Type:
                    return <RSTypeFilter onSelect={onChangeType} type={type} onCloseSelector={onCloseSelector} />
                case FilterEnum.Address:
                    return <AddressFilter onSelected={onActiveAddressFilter} onCloseSelector={onCloseSelector} require={false} />
                case FilterEnum.Price:
                    return <PriceFilter price={filter.price} onSelect={onActivePriceFilter} onCloseSelector={onCloseSelector} />
                case FilterEnum.Project:
                    return <ProjectListFilter onSelect={onActiveProjectFilter} onCloseSelector={onCloseSelector} />
                case FilterEnum.Acreage:
                    return <AcreageFilter onCloseSelector={onCloseSelector} acreage={filter.acreage} onSelect={onActiveAcreageFilter} />
                case FilterEnum.BalconyDirection:
                    return <BalconyDirectionFilter onCloseSelector={onCloseSelector} balconyDirection={filter.balconyDirection} onSelect={onActiveBalconyDirecionFilter} />
                case FilterEnum.DoorDirection:
                    return <DoorDirectionFilter onCloseSelector={onCloseSelector} doorDirection={filter.doorDirection} onSelect={onActiveDoorDirecionFilter} />
                case FilterEnum.Bedrooms:
                    return <BedroomsFilter onCloseSelector={onCloseSelector} onSelect={onActiveBedroomsFilter} rooms={filter.numberOfBedrooms} />
                case FilterEnum.SpecialType:
                    return <SpecialTypeFilter postsType={type} onCloseSelector={onCloseSelector} type={filter.type} onSelect={onActiveSpecialTypeFilter} />

                default:
                    return;
            }
        }
        return;
    }

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Pressable style={styles.addressArea} onPress={() => onSelectFilter(FilterEnum.Address)}>
                    <View style={styles.address}>
                        <View style={styles.addressIcon}>
                            <Feather name="map-pin" size={20} />
                            <Text style={{ color: "#777" }}> Địa điểm: </Text>
                        </View>
                        <View style={styles.addressTxt}>
                            <Text numberOfLines={1} ellipsizeMode='tail' >
                                {filter.address
                                    ? filter.address.province
                                    + (filter.address.district ? " - " + filter.address.district : '')
                                    + (filter.address.ward ? " - " + filter.address.ward : '')
                                    : `Toàn quốc`
                                }
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Ant name="caretdown" size={14} />
                    </View>
                </Pressable>
                <Pressable style={styles.display} onPress={() => onChangeDisplay()}>
                    <Ant name={display === 'vertical' ? "appstore-o" : "bars"} size={24} />
                </Pressable>
            </View>

            <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.filterItems}>
                <TouchableOpacity style={styles.item} onPress={() => onSelectFilter(FilterEnum.Category)}>
                    <Text>{categorySpeaker(filter.category)} </Text>
                    <Feather name="chevron-down" size={16} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={() => onSelectFilter(FilterEnum.Type)}>
                    <Text>{realEstateTypeSpeaker(type)} </Text>
                    <Feather name="chevron-down" size={16} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.item,
                        {
                            borderColor: filter.price !== undefined ? "#222" : "#fff",
                            backgroundColor: filter.price !== undefined ? "#fff" : "#eee"
                        }
                    ]}
                    onPress={() => onSelectFilter(FilterEnum.Price)}
                >
                    <Text>Giá </Text>
                    <Feather name={filter.price ? "check" : "plus"} size={16} />
                </TouchableOpacity>
                {type !== RealEstateType.PhongTro
                    && (
                        <TouchableOpacity
                            style={[
                                styles.item,
                                {
                                    borderColor: filter.project !== undefined ? "#222" : "#fff",
                                    backgroundColor: filter.project !== undefined ? "#fff" : "#eee"
                                }
                            ]}
                            onPress={() => onSelectFilter(FilterEnum.Project)}
                        >
                            <Text>Dự án </Text>
                            <Feather name={filter.project ? "check" : "plus"} size={16} />
                        </TouchableOpacity>
                    )
                }

                {type !== undefined
                    && (
                        <TouchableOpacity
                            style={[
                                styles.item,
                                {
                                    borderColor: filter.acreage !== undefined ? "#222" : "#fff",
                                    backgroundColor: filter.acreage !== undefined ? "#fff" : "#eee"
                                }
                            ]}
                            onPress={() => onSelectFilter(FilterEnum.Acreage)}
                        >
                            <Text>Diện tích </Text>
                            <Feather name={filter.acreage ? "check" : "plus"} size={16} />
                        </TouchableOpacity>
                    )
                }

                {type === RealEstateType.CanHo
                    && (
                        <TouchableOpacity
                            style={[
                                styles.item,
                                {
                                    borderColor: filter.balconyDirection !== undefined ? "#222" : "#fff",
                                    backgroundColor: filter.balconyDirection !== undefined ? "#fff" : "#eee"
                                }
                            ]}
                            onPress={() => onSelectFilter(FilterEnum.BalconyDirection)}
                        >
                            <Text>Hướng ban công </Text>
                            <Feather name={filter.balconyDirection ? "check" : "plus"} size={16} />
                        </TouchableOpacity>
                    )
                }

                {(type !== RealEstateType.PhongTro && type !== undefined)
                    && (
                        <TouchableOpacity
                            style={[
                                styles.item,
                                {
                                    borderColor: filter.doorDirection !== undefined ? "#222" : "#fff",
                                    backgroundColor: filter.doorDirection !== undefined ? "#fff" : "#eee"
                                }
                            ]}
                            onPress={() => onSelectFilter(FilterEnum.DoorDirection)}
                        >
                            <Text>Hướng cửa chính </Text>
                            <Feather name={filter.doorDirection ? "check" : "plus"} size={16} />
                        </TouchableOpacity>
                    )
                }

                {(type === RealEstateType.CanHo || type === RealEstateType.NhaO)
                    && (
                        <TouchableOpacity
                            style={[
                                styles.item,
                                {
                                    borderColor: filter.numberOfBedrooms !== undefined ? "#222" : "#fff",
                                    backgroundColor: filter.numberOfBedrooms !== undefined ? "#fff" : "#eee"
                                }
                            ]}
                            onPress={() => onSelectFilter(FilterEnum.Bedrooms)}
                        >
                            <Text>Số phòng ngủ </Text>
                            <Feather name={filter.numberOfBedrooms ? "check" : "plus"} size={16} />
                        </TouchableOpacity>
                    )
                }

                {(type !== RealEstateType.PhongTro && type !== undefined)
                    && (
                        <TouchableOpacity
                            style={[
                                styles.item,
                                {
                                    borderColor: filter.type !== undefined ? "#222" : "#fff",
                                    backgroundColor: filter.type !== undefined ? "#fff" : "#eee"
                                }
                            ]}
                            onPress={() => onSelectFilter(FilterEnum.SpecialType)}
                        >
                            <Text>Loại hình </Text>
                            <Feather name={filter.type ? "check" : "plus"} size={16} />
                        </TouchableOpacity>
                    )
                }

            </ScrollView>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => onCloseSelector()}
            >
                <SafeAreaView style={{ flex: 0, backgroundColor: '#ffb41f' }} />
                {showFilterSelector()}
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        backgroundColor: "#fff",
        padding: 12,
        height: 100
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center'

    },
    addressArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 0.9,
        alignItems: 'center'
    },
    address: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    addressIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 0.3
    },
    addressTxt: {
        flex: 0.7
    },
    display: {
        flex: 0.1,
        alignItems: 'flex-end'
    },
    filterItems: {
        marginTop: 16
    },
    item: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8
    },

})

export default RealEstateFilter;