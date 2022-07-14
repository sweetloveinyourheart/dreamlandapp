import { FunctionComponent, useCallback } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Ant from 'react-native-vector-icons/AntDesign'

interface BedroomsFilterProps {
    rooms: number | undefined
    onSelect: (rooms: number | undefined) => void
    onCloseSelector: () => void
}

const BedroomsFilter: FunctionComponent<BedroomsFilterProps> = ({ rooms, onSelect, onCloseSelector }) => {

    const onSelected = useCallback((rooms: number | undefined) => {
        onSelect(rooms)
        onCloseSelector()
    }, [])

    const renderList = () => {
        let items = new Array(9).fill('')
        return items.map((item, index) => {
            return (
                <Pressable 
                    style={styles.item} 
                    onPress={() => onSelected(index + 1)}
                    key={index}
                >
                    <Text
                        style={{
                            color: rooms === index + 1 ? "#f93707" : "#222",
                            fontWeight: rooms === index + 1 ? "600" : "400"
                        }}
                    >{index + 1} Phòng</Text>
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
                <Text style={styles.headerModalTxt}> Chọn số phòng ngủ </Text>
                <View style={{ width: 28 }}></View>
            </View>
            <ScrollView>
                <Pressable style={styles.item} onPress={() => onSelected(undefined)}>
                    <Text
                        style={{
                            color: rooms === undefined ? "#f93707" : "#222",
                            fontWeight: rooms === undefined ? "600" : "400"
                        }}
                    >Không áp dụng lọc</Text>
                </Pressable>
                {renderList()}
                <Pressable style={styles.item} onPress={() => onSelected(10)}>
                    <Text
                        style={{
                            color: rooms === 10 ? "#f93707" : "#222",
                            fontWeight: rooms === 10 ? "600" : "400"
                        }}
                    >Nhiều hơn 10</Text>
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

export default BedroomsFilter;