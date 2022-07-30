import { FunctionComponent } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PostStatus } from "../../types/enums/realEstate";

interface UploadedMenuProps {
    status: PostStatus
    onChangeMenu: (stack: PostStatus) => void
}

const UploadedMenu: FunctionComponent<UploadedMenuProps> = ({ status, onChangeMenu }) => {
    return (
        <View style={styles.menu}>
            <View style={[
                styles.menuItem, {
                    borderBottomWidth: status === PostStatus.Pending ? 2 : 1,
                    borderBottomColor: status === PostStatus.Pending ? "#f93707" : "#dcdcdc"
                }]}
            >
                <TouchableOpacity onPress={() => onChangeMenu(PostStatus.Pending)}>
                    <Text style={styles.text}>Chờ duyệt</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.menuItem, {
                borderBottomWidth: status === PostStatus.Available ? 2 : 1,
                borderBottomColor: status === PostStatus.Available ? "#f93707" : "#dcdcdc"
            }]}
            >
                <TouchableOpacity onPress={() => onChangeMenu(PostStatus.Available)}>
                    <Text style={styles.text}>Đã đăng tải</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    menu: {
        backgroundColor: "#fff",
        height: 40,
        flexDirection: 'row'
    },
    menuItem: {
        flex: 0.5,
        height: 40,
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center'
    }
})

export default UploadedMenu;