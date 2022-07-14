import { FunctionComponent, useCallback } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Ant from 'react-native-vector-icons/AntDesign'

interface HandoverYearFilterProps {
    handoverYear: number | undefined
    onSelect: (year: number | undefined) => void
    onCloseSelector: () => void
}

const HandoverYearFilter: FunctionComponent<HandoverYearFilterProps> = ({ handoverYear, onSelect, onCloseSelector }) => {

    const onSelected = useCallback((year: number | undefined) => {
        onSelect(year)
        onCloseSelector()
    }, [])

    const renderItems = () => {
        const date = new Date()
        const currentYear = date.getFullYear()
        const range = currentYear - 2017
        const items = new Array(range).fill('')
        return items.map((item, index) => {
            const value = currentYear - index

            return (
                <Pressable
                    style={styles.item}
                    onPress={() => onSelected(value)}
                    key={index}
                >
                    <Text
                        style={{
                            color: handoverYear === value ? "#f93707" : "#222",
                            fontWeight: handoverYear === value ? "600" : "400"
                        }}
                    >{value}</Text>
                </Pressable>
            )
        })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.headerModal}>
                <Pressable style={{ width: 28 }} onPress={() => onCloseSelector()}>
                    <Ant name="close" size={28} />
                </Pressable>
                <Text style={styles.headerModalTxt}> Chọn năm bàn giao </Text>
                <View style={{ width: 28 }}></View>
            </View>
            <ScrollView>
                <Pressable style={styles.item} onPress={() => onSelected(undefined)}>
                    <Text
                        style={{
                            color: handoverYear === undefined ? "#f93707" : "#222",
                            fontWeight: handoverYear === undefined ? "600" : "400"
                        }}
                    >Không áp dụng lọc</Text>
                </Pressable>
                {renderItems()}
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

export default HandoverYearFilter;