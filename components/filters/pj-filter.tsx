import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from 'react-native-vector-icons/Feather'
import { ProjectFilterInterface } from "../../graphql/queries/pj-list";
import AddressFilter from "./items/address";
import HandoverYearFilter from "./items/handover-year";
import PriceFilter from "./items/price";

interface ProjectFilterProps {
    initialFilter: ProjectFilterInterface | undefined
    onApplyFilter: (filter: ProjectFilterInterface | undefined) => void
}

enum FilterEnum {
    Address = 1,
    Price,
    HandOverYear
}

const ProjectFilter: FunctionComponent<ProjectFilterProps> = ({ initialFilter, onApplyFilter }) => {
    const [selectedModalFilter, setSelectedModalFilter] = useState<FilterEnum | undefined>()
    const [modalVisible, setModalVisible] = useState(false);

    const [filter, setFilter] = useState<ProjectFilterInterface>()

    useEffect(() => {
        if (initialFilter) {
            setFilter(initialFilter)
        }
    }, [initialFilter])

    useEffect(() => {
        onApplyFilter(filter)
    }, [filter])

    const onSelectFilter = useCallback((filter: FilterEnum) => {
        setSelectedModalFilter(filter)
        setModalVisible(true)
    }, [selectedModalFilter])

    const onCloseSelector = useCallback(() => {
        setSelectedModalFilter(undefined)
        setModalVisible(false)
    }, [selectedModalFilter])

    // Appy filter
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

    const onActivePriceFilter = useCallback((price: { min: number, max: number | undefined } | undefined) => {
        setFilter(prevState => ({
            ...prevState,
            price
        }))
    }, [filter])

    const onActiveHandoverYearFilter = useCallback((year: number | undefined) => {
        setFilter(prevS => ({
            ...prevS,
            handOverYear: year
        }))
    }, [filter])

    // JSX renderer
    const showFilterSelector = () => {
        if (selectedModalFilter) {
            switch (selectedModalFilter) {
                case FilterEnum.Address:
                    return <AddressFilter onSelected={onActiveAddressFilter} onCloseSelector={onCloseSelector} />
                case FilterEnum.Price:
                    return <PriceFilter price={filter?.price} onSelect={onActivePriceFilter} onCloseSelector={onCloseSelector} />
                case FilterEnum.HandOverYear:
                    return <HandoverYearFilter handoverYear={filter?.handOverYear} onSelect={onActiveHandoverYearFilter} onCloseSelector={onCloseSelector} />

                default:
                    return;
            }
        }
        return;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.item, { width: '48%' }]} onPress={() => onSelectFilter(FilterEnum.Address)}>
                <Text><Feather name="map-pin" size={16} /> Toàn quốc</Text>
                <Feather name={filter?.address ? 'check' : "chevron-down"} size={16} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.item, { width: '23%' }]} onPress={() => onSelectFilter(FilterEnum.Price)}>
                <Text>Giá</Text>
                <Feather name={filter?.price ? "check" : "chevron-down"} size={16} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.item, { width: '23%' }]} onPress={() => onSelectFilter(FilterEnum.HandOverYear)}>
                <Text>Năm</Text>
                <Feather name={filter?.handOverYear ? "check" : "chevron-down"} size={16} />
            </TouchableOpacity>
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
        height: 60,
        flexDirection: 'row'
    },

    item: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: '2%'
    },
})

export default ProjectFilter;