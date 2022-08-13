import { useLinkTo } from "@react-navigation/native";
import { Fragment, FunctionComponent } from "react";
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TabScreenHeader from "../components/headers/tab-screen-header";
import { RealEstateItem } from "../components/items/rs-items";
import Profile from "../components/profile/profile";
import { useAuth } from "../contexts/auth";
import { useViewHistory } from "../contexts/view-history";
import { UserRole } from "../types/enums/user";

interface UserScreenProps {

}

const UserScreen: FunctionComponent<UserScreenProps> = () => {

    const linkTo = useLinkTo()
    const { user, logout } = useAuth()
    const { history } = useViewHistory()

    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#ffb41f' }} />
            <SafeAreaView style={{
                flex: 1,
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
            }}>
                <TabScreenHeader title="Tài khoản người dùng" />
                <ScrollView>
                    <Profile user={user} />
                    <View style={styles.history}>
                        <View style={styles.historyHead}>
                            <Text style={styles.historyHeadTxt}>Sản phẩm vừa xem</Text>
                        </View>
                        {history.length > 0
                            ? (
                                <RealEstateItem
                                    data={history}
                                    display="horizontal"
                                />
                            )
                            : (
                                <View style={styles.historyEmpty}>
                                    <Text style={{textAlign: 'center'}}> Chưa xem qua bài viết nào </Text>
                                </View>
                            )
                        }
                    </View>
                    <View style={styles.actions}>
                        {user?.roles?.find(role => role === UserRole.Manager)
                            && (
                                <TouchableOpacity
                                    style={[styles.actionItem, { borderColor: "#14a7fa", borderWidth: 1, backgroundColor: "#fff" }]}
                                    onPress={() => linkTo('/upload-screen')}
                                >
                                    <Text style={[styles.actionItemTxt, { color: "#14a7fa" }]}>Thêm sản phẩm</Text>
                                </TouchableOpacity>
                            )
                        }
                        {user?.roles?.find(role => role === UserRole.Manager)
                            && (
                                <TouchableOpacity
                                    style={[styles.actionItem, { borderColor: "#14a7fa", borderWidth: 1, backgroundColor: "#fff" }]}
                                    onPress={() => linkTo('/uploaded-screen')}
                                >
                                    <Text style={[styles.actionItemTxt, { color: "#14a7fa" }]}>Xem sản phẩm đã đăng</Text>
                                </TouchableOpacity>
                            )
                        }
                        <TouchableOpacity
                            style={styles.actionItem}
                            onPress={() => logout()}
                        >
                            <Text style={styles.actionItemTxt}>Đăng Xuất</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    history: {
        marginTop: 12,
        padding: 12,
        backgroundColor: "#fff",
        minHeight: 250
    },
    historyHead: {
        marginBottom: 12,
        borderBottomWidth: 1,
        paddingBottom: 8,
        borderColor: "#dcdcdc"
    },
    historyHeadTxt: {
        fontSize: 16,
        fontWeight: '600'
    },
    historyEmpty: {
        height: 150,
        justifyContent: 'center'
    },
    actions: {
        padding: 12,
        marginVertical: 12,
        backgroundColor: "#fff",
        paddingBottom: 0
    },
    actionItem: {
        backgroundColor: "#d12032",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginBottom: 12
    },
    actionItemTxt: {
        textAlign: 'center',
        textTransform: 'uppercase',
        color: "#fff",
        fontWeight: '600'
    }
})

export default UserScreen;