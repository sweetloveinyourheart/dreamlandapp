import { FunctionComponent } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { logoImage } from "../../constants/images";
import Ionicon from 'react-native-vector-icons/Ionicons'
import { useLinkTo } from "@react-navigation/native";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {

    const linkTo = useLinkTo()

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
            </View>
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
    }
})

export default Header;