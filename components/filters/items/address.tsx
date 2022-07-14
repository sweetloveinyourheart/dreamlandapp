import { FunctionComponent, useCallback, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Ant from 'react-native-vector-icons/AntDesign'
import { District, Provinces, useAddress, Ward } from "../../../contexts/address";

interface AddressFilterProps {
    require?: boolean
    onSelected: (province: string | undefined, district: string | undefined, ward: string | undefined) => void
    onCloseSelector: () => void
}

const AddressFilter: FunctionComponent<AddressFilterProps> = ({ onCloseSelector, onSelected, require }) => {
    const { provinces } = useAddress()

    const [selectedProvince, setSelectedProvince] = useState<Provinces | undefined>()
    const [selectedDistrict, setSelectedDistrict] = useState<District | undefined>()
    const [selectedWard, setSelectedWard] = useState<Ward | undefined>()

    const handleBack = useCallback(() => {
        if (selectedDistrict) {
            setSelectedDistrict(undefined)
            onSelected(selectedProvince?.name, undefined, undefined)
            return;
        }

        if (selectedProvince) {
            setSelectedProvince(undefined)
            onSelected(undefined, undefined, undefined)
            return;
        }

        onSelected(undefined, undefined, undefined)
        onCloseSelector()
    }, [selectedDistrict, selectedProvince])

    const handleSelect = useCallback(() => {
        if (selectedDistrict) {
            onSelected(selectedProvince?.name, selectedDistrict.name, undefined)
            onCloseSelector()
            return;
        }

        if (selectedProvince) {
            onSelected(selectedProvince.name, undefined, undefined)
            onCloseSelector()
            return;
        }

        onSelected(undefined, undefined, undefined)
        onCloseSelector()
    }, [selectedDistrict, selectedProvince])

    const renderData = () => {
        if (selectedProvince) {
            if (selectedDistrict) {

                return selectedDistrict.wards.map((elm: any, id: number) => {
                    return (
                        <Pressable
                            style={styles.item}
                            key={id}
                            onPress={() => {
                                setSelectedWard(elm);
                                onSelected(selectedProvince?.name, selectedDistrict.name, elm.name);
                                onCloseSelector()
                            }}
                        >
                            <Text>{elm.name}</Text>
                        </Pressable>
                    )
                })
            }

            return selectedProvince.districts.map((elm: any, id: number) => {
                return (
                    <Pressable
                        style={styles.item}
                        key={id}
                        onPress={() => {
                            setSelectedDistrict(elm);
                            onSelected(selectedProvince?.name, elm.name, undefined)
                        }}
                    >
                        <Text>{elm.name}</Text>
                    </Pressable>
                )
            })
        }

        return provinces.map((elm: any, id: number) => {
            return (
                <Pressable
                    style={styles.item}
                    key={id}
                    onPress={() => {
                        setSelectedProvince(elm);
                        onSelected(elm.name, undefined, undefined)
                    }}>
                    <Text>{elm.name}</Text>
                </Pressable>
            )
        })

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.headerModal}>
                <Pressable style={{ width: 28 }} onPress={() => handleBack()}>
                    <Ant name={!selectedProvince ? "close" : 'arrowleft'} size={28} />
                </Pressable>
                <Text style={styles.headerModalTxt}> Chọn địa chỉ bất động sản </Text>
                <View style={{ width: 28 }}>
                    {!require
                        && (
                            <Pressable style={{ width: 28 }} onPress={() => handleSelect()}>
                                <Ant name={"check"} size={28} />
                            </Pressable>
                        )
                    }
                </View>
            </View>
            <ScrollView>
                {renderData()}
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

export default AddressFilter;