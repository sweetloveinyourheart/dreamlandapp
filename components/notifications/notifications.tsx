import { useLinkTo } from "@react-navigation/native";
import { FunctionComponent } from "react";
import { Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Ant from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import { usePushNotification } from "../../contexts/notification";

interface NotificationBoxProps {
    visible: boolean
    onClose: () => void
}

const NotificationBox: FunctionComponent<NotificationBoxProps> = ({ onClose, visible }) => {

    const { notifications, updateNotificationState } = usePushNotification()
    const linkTo = useLinkTo()

    const onPress = async (index: number) => {
        let current = notifications
        current.splice(index, 1)
        updateNotificationState(current)
        onClose()
        linkTo('/transaction-screen')
    }

    const showNotifications = () => {
        return notifications.map((noti, index) => {
            return (
                <Pressable style={styles.item} onPress={() => onPress(index)} key={index}>
                    <View style={styles.itemDot}>
                        <Octicons name="dot-fill" color={"#06e763"} size={18} />
                    </View>
                    <View style={styles.itemInfo}>
                        <Text style={{ fontWeight: '500', fontSize: 15 }}>{noti.request.content.title}</Text>
                        <Text >{noti.request.content.body}</Text>
                    </View>
                </Pressable>
            )
        })
    }

    return (
        <Modal
            visible={visible}
            onRequestClose={onClose}
            animationType="slide"
            transparent={false}
        >
            <SafeAreaView style={{ flex: 0, backgroundColor: "#ffb41f" }} />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.headerModal}>
                    <Pressable style={{ width: 28 }} onPress={() => onClose()}>
                        <Ant name="close" size={28} color="#fff" />
                    </Pressable>
                    <Text style={styles.headerModalTxt}> Thông báo bất động sản </Text>
                    <View style={{ width: 28 }}></View>
                </View>
                {notifications.length > 0
                    ? (
                        <ScrollView>
                            {showNotifications()}
                        </ScrollView>
                    )
                    : (
                        <View style={{
                            flex: 1, 
                            backgroundColor: "#eee", 
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text>Chưa có thông báo</Text>
                        </View>
                    )
                }
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    item: {
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderBottomColor: "#dcdcdc",
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    itemDot: {
        flex: 0.1
    },
    itemInfo: {
        flex: 0.9
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
        fontWeight: '600',
        color: "#fff"
    }
})

export default NotificationBox;