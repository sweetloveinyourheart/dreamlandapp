import { FunctionComponent, useCallback } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Ant from 'react-native-vector-icons/AntDesign'
import { directionSpeaker } from "../../../libs/speaker";
import { Direction } from "../../../types/enums/realEstate";

interface BalconyDirectionProps {
    balconyDirection: Direction | undefined
    onSelect: (direction: Direction | undefined) => void
    onCloseSelector: () => void
}

interface DoorDirectionProps {
    doorDirection: Direction | undefined
    onSelect: (direction: Direction | undefined) => void
    onCloseSelector: () => void
}

export const BalconyDirectionFilter: FunctionComponent<BalconyDirectionProps> = ({ onCloseSelector, onSelect, balconyDirection }) => {

    const onSelected = useCallback((direction: Direction | undefined) => {
        onSelect(direction)
        onCloseSelector()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.headerModal}>
                <Pressable style={{ width: 28 }} onPress={() => onCloseSelector()}>
                    <Ant name="close" size={28} />
                </Pressable>
                <Text style={styles.headerModalTxt}> Chọn hướng ban công </Text>
                <View style={{ width: 28 }}></View>
            </View>
            <ScrollView>
                <Pressable style={styles.item} onPress={() => onSelected(undefined)}>
                    <Text
                        style={{
                            color: balconyDirection === undefined ? "#f93707" : "#222",
                            fontWeight: balconyDirection === undefined ? "600" : "400"
                        }}
                    >Tất cả</Text>
                </Pressable>
                <Pressable style={styles.item} onPress={() => onSelected(Direction.Dong)}>
                    <Text
                        style={{
                            color: balconyDirection === Direction.Dong ? "#f93707" : "#222",
                            fontWeight: balconyDirection === Direction.Dong ? "600" : "400"
                        }}
                    >{directionSpeaker(Direction.Dong)}</Text>
                </Pressable>
                <Pressable style={styles.item} onPress={() => onSelected(Direction.Bac)}>
                    <Text
                        style={{
                            color: balconyDirection === Direction.Bac ? "#f93707" : "#222",
                            fontWeight: balconyDirection === Direction.Bac ? "600" : "400"
                        }}
                    >{directionSpeaker(Direction.Bac)}</Text>
                </Pressable>
                <Pressable style={styles.item} onPress={() => onSelected(Direction.DongBac)}>
                    <Text
                        style={{
                            color: balconyDirection === Direction.DongBac ? "#f93707" : "#222",
                            fontWeight: balconyDirection === Direction.DongBac ? "600" : "400"
                        }}
                    >{directionSpeaker(Direction.DongBac)}</Text>
                </Pressable>
                <Pressable style={styles.item} onPress={() => onSelected(Direction.DongNam)}>
                    <Text
                        style={{
                            color: balconyDirection === Direction.DongNam ? "#f93707" : "#222",
                            fontWeight: balconyDirection === Direction.DongNam ? "600" : "400"
                        }}
                    >{directionSpeaker(Direction.DongNam)}</Text>
                </Pressable>
                <Pressable style={styles.item} onPress={() => onSelected(Direction.Nam)}>
                    <Text
                        style={{
                            color: balconyDirection === Direction.Nam ? "#f93707" : "#222",
                            fontWeight: balconyDirection === Direction.Nam ? "600" : "400"
                        }}
                    >{directionSpeaker(Direction.Nam)}</Text>
                </Pressable>
                <Pressable style={styles.item} onPress={() => onSelected(Direction.Tay)}>
                    <Text
                        style={{
                            color: balconyDirection === Direction.Tay ? "#f93707" : "#222",
                            fontWeight: balconyDirection === Direction.Tay ? "600" : "400"
                        }}
                    >{directionSpeaker(Direction.Tay)}</Text>
                </Pressable>
                <Pressable style={styles.item} onPress={() => onSelected(Direction.TayBac)}>
                    <Text
                        style={{
                            color: balconyDirection === Direction.TayBac ? "#f93707" : "#222",
                            fontWeight: balconyDirection === Direction.TayBac ? "600" : "400"
                        }}
                    >{directionSpeaker(Direction.TayBac)}</Text>
                </Pressable>
                <Pressable style={styles.item} onPress={() => onSelected(Direction.TayNam)}>
                    <Text
                        style={{
                            color: balconyDirection === Direction.TayNam ? "#f93707" : "#222",
                            fontWeight: balconyDirection === Direction.TayNam ? "600" : "400"
                        }}
                    >{directionSpeaker(Direction.TayNam)}</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

export const DoorDirectionFilter: FunctionComponent<DoorDirectionProps> = ({ onCloseSelector, onSelect, doorDirection }) => {

    const onSelected = useCallback((direction: Direction | undefined) => {
        onSelect(direction)
        onCloseSelector()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.headerModal}>
                <Pressable style={{ width: 28 }} onPress={() => onCloseSelector()}>
                    <Ant name="close" size={28} />
                </Pressable>
                <Text style={styles.headerModalTxt}> Chọn hướng ban công </Text>
                <View style={{ width: 28 }}></View>
            </View>
            <ScrollView>
                <Pressable style={styles.item} onPress={() => onSelected(undefined)}>
                    <Text
                        style={{
                            color: doorDirection === undefined ? "#f93707" : "#222",
                            fontWeight: doorDirection === undefined ? "600" : "400"
                        }}
                    >Tất cả</Text>
                </Pressable>
                <Pressable style={styles.item} onPress={() => onSelected(Direction.Dong)}>
                    <Text
                        style={{
                            color: doorDirection === Direction.Dong ? "#f93707" : "#222",
                            fontWeight: doorDirection === Direction.Dong ? "600" : "400"
                        }}
                    >{directionSpeaker(Direction.Dong)}</Text>
                </Pressable>
                <Pressable style={styles.item} onPress={() => onSelected(Direction.Bac)}>
                    <Text
                        style={{
                            color: doorDirection === Direction.Bac ? "#f93707" : "#222",
                            fontWeight: doorDirection === Direction.Bac ? "600" : "400"
                        }}
                    >{directionSpeaker(Direction.Bac)}</Text>
                </Pressable>
                <Pressable style={styles.item} onPress={() => onSelected(Direction.DongBac)}>
                    <Text
                        style={{
                            color: doorDirection === Direction.DongBac ? "#f93707" : "#222",
                            fontWeight: doorDirection === Direction.DongBac ? "600" : "400"
                        }}
                    >{directionSpeaker(Direction.DongBac)}</Text>
                </Pressable>
                <Pressable style={styles.item} onPress={() => onSelected(Direction.DongNam)}>
                    <Text
                        style={{
                            color: doorDirection === Direction.DongNam ? "#f93707" : "#222",
                            fontWeight: doorDirection === Direction.DongNam ? "600" : "400"
                        }}
                    >{directionSpeaker(Direction.DongNam)}</Text>
                </Pressable>
                <Pressable style={styles.item} onPress={() => onSelected(Direction.Nam)}>
                    <Text
                        style={{
                            color: doorDirection === Direction.Nam ? "#f93707" : "#222",
                            fontWeight: doorDirection === Direction.Nam ? "600" : "400"
                        }}
                    >{directionSpeaker(Direction.Nam)}</Text>
                </Pressable>
                <Pressable style={styles.item} onPress={() => onSelected(Direction.Tay)}>
                    <Text
                        style={{
                            color: doorDirection === Direction.Tay ? "#f93707" : "#222",
                            fontWeight: doorDirection === Direction.Tay ? "600" : "400"
                        }}
                    >{directionSpeaker(Direction.Tay)}</Text>
                </Pressable>
                <Pressable style={styles.item} onPress={() => onSelected(Direction.TayBac)}>
                    <Text
                        style={{
                            color: doorDirection === Direction.TayBac ? "#f93707" : "#222",
                            fontWeight: doorDirection === Direction.TayBac ? "600" : "400"
                        }}
                    >{directionSpeaker(Direction.TayBac)}</Text>
                </Pressable>
                <Pressable style={styles.item} onPress={() => onSelected(Direction.TayNam)}>
                    <Text
                        style={{
                            color: doorDirection === Direction.TayNam ? "#f93707" : "#222",
                            fontWeight: doorDirection === Direction.TayNam ? "600" : "400"
                        }}
                    >{directionSpeaker(Direction.TayNam)}</Text>
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



