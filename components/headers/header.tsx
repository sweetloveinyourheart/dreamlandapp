import { FunctionComponent, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { logoImage } from "../../constants/images";
import Ionicon from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useLinkTo } from "@react-navigation/native";
import { usePushNotification } from "../../contexts/notification";
import NotificationBox from "../notifications/notifications";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
    const [notificationActive, setNotificationActive] = useState(false)

    const linkTo = useLinkTo()
    const { notifications } = usePushNotification()

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image
                    source={logoImage}
                    style={styles.logo}
                />
            </View>
            <View style={styles.searchArea}>
                <TouchableOpacity style={styles.searchBtn} onPress={() => linkTo('/search-screen')}>
                    <Ionicon
                        name="search-outline"
                        size={24}
                        color="#fff"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.searchBtn} onPress={() => setNotificationActive(s => !s)}>
                    <Fontisto
                        name="bell"
                        size={24}
                        color="#fff"
                    />
                    <View style={styles.count}>
                        <Text style={{color: "#fff", fontSize: 12}}>{notifications.length}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <NotificationBox 
                visible={notificationActive}
                onClose={() => setNotificationActive(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: "#ffb41f",
        alignItems: 'center',
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logoContainer: {
        height: 60
    },
    logo: {
        width: 150,
        height: 29,
        resizeMode: 'contain'
    },
    searchArea: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    input: {
        width: 150,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 12
    },
    searchBtn: {
        marginLeft: 8,
        position: 'relative'
    },
    count: {
        position: 'absolute',
        right: 0,
        backgroundColor: "#14a7fa",
        color: "#fff",
        width: 14,
        height: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    }
})

export default Header;