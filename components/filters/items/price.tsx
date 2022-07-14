import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { FunctionComponent, ReactNode, useCallback, useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ant from 'react-native-vector-icons/AntDesign'
import { moneyConverter } from "../../../libs/moneyConverter";
import NumberFormat from 'react-number-format'

interface PriceFilterProps {
    price: { min: number, max?: number | undefined } | undefined
    onSelect: (price: { min: number, max: number | undefined } | undefined) => void
    onCloseSelector: () => void
}

const PriceFilter: FunctionComponent<PriceFilterProps> = ({ onCloseSelector, price, onSelect }) => {
    const [multiSliderValue, setMultiSliderValue] = useState([0, 25000000000]);

    useEffect(() => {
        if (price) {
            setMultiSliderValue([price.min, price.max ?? 25000000000])
        }
    }, [price])

    const multiSliderValuesChange = (values: number[]) => setMultiSliderValue(values);

    const onSelected = useCallback(() => {
        onSelect({
            min: multiSliderValue[0],
            max: multiSliderValue[1]
        })
        onCloseSelector()
    }, [multiSliderValue])

    const onRemoveFilter = useCallback(() => {
        onSelect(undefined)
        onCloseSelector()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.headerModal}>
                <Pressable style={{ width: 28 }} onPress={() => onCloseSelector()}>
                    <Ant name="close" size={28} />
                </Pressable>
                <Text style={styles.headerModalTxt}> Chọn khoảng giá bất động sản </Text>
                <View style={{ width: 28 }}></View>
            </View>
            <View style={styles.slider}>
                <View style={styles.money}>
                    <NumberFormat
                        value={multiSliderValue[0]}
                        className="foo"
                        displayType={'text'}
                        thousandSeparator={true}
                        // @ts-ignore
                        renderText={(value: any, props: any) => (<Text {...props}>Từ {moneyConverter(value)} - </Text>)}
                    />
                    <NumberFormat
                        value={multiSliderValue[1]}
                        className="foo"
                        displayType={'text'}
                        thousandSeparator={true}
                        // @ts-ignore
                        renderText={(value: any, props: any) => (<Text {...props}>Đến {moneyConverter(value)}</Text>)}
                    />
                </View>
                <MultiSlider
                    values={multiSliderValue}
                    min={0}
                    max={30000000000}
                    onValuesChange={multiSliderValuesChange}
                    step={1000000}
                />
            </View>
            <View style={styles.bottom}>
                {price
                    && (
                        <TouchableOpacity style={[styles.btn, { backgroundColor: "#06e763", marginBottom: 8 }]} onPress={() => onRemoveFilter()}>
                            <Text style={styles.btnTxt}> Huỷ lọc theo giá </Text>
                        </TouchableOpacity>
                    )
                }
                <TouchableOpacity style={styles.btn} onPress={() => onSelected()}>
                    <Text style={styles.btnTxt}> Chọn khoảng giá </Text>
                </TouchableOpacity>

            </View>
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
    },
    money: {
        flexDirection: 'row',
        marginBottom: 12
    },
    slider: {
        padding: 12,
        alignItems: 'center',
        flex: 1
    },
    bottom: {
        marginTop: 4,
        padding: 12,
        alignItems: 'center'
    },
    btn: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: "#f93707",
        color: "#fff",
        borderRadius: 8,
        width: '100%'
    },
    btnTxt: {
        color: "#fff",
        textAlign: 'center',
        fontWeight: '600'
    }
})

export default PriceFilter;