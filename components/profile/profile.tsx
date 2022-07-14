import { FunctionComponent } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { profileIcon } from "../../constants/images";
import Moment from 'moment';
import { Profile as ProfileInterface } from "../../types/interfaces/user";

interface ProfileProps {
    user: ProfileInterface | null | undefined
}

const Profile: FunctionComponent<ProfileProps> = ({ user }) => {

    return (
        <View style={styles.container}>
            <View style={styles.owner}>
                <View style={styles.ownerLogo}>
                    <Image
                        source={profileIcon}
                        style={{
                            width: 70,
                            height: 70,
                            borderRadius: 100
                        }}
                    />
                </View>
                <View>
                    <Text style={styles.ownerName}>{user?.name}</Text>
                    <Text>{user?.phone}</Text>
                </View>
            </View>
            <View style={styles.info}>
                <View style={styles.infoItem}>
                    <Text style={styles.itemTitle}>Số điện thoại</Text>
                    <Text style={styles.itemValue}>{user?.phone}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.itemTitle}>Họ và tên</Text>
                    <Text style={styles.itemValue}>{user?.name}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.itemTitle}>Email</Text>
                    <Text style={styles.itemValue}>{user?.email || "___"}</Text>
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.itemTitle}>Ngày sinh</Text>
                    <Text style={styles.itemValue}>{user?.birthday ? (Moment(user?.birthday).format('DD/MM/yyyy')) : "___"}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.itemTitle}>Giới tính</Text>
                    <Text style={styles.itemValue}>{user?.sex || "___"}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.itemTitle}>Ngày tham gia</Text>
                    <Text style={styles.itemValue}>{(Moment(user?.createdAt).format('DD/MM/yyyy'))}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.itemTitle}>Địa chỉ</Text>
                    <Text style={styles.itemValue}>{user?.address || "___"}</Text>
                </View>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    owner: {
        marginVertical: 12,
        padding: 12,
        borderColor: "#dcdcdc",
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#fff"

    },
    ownerLogo: {
        marginRight: 12
    },
    ownerName: {
        fontWeight: '600',
        fontSize: 16
    },
    info: {
        padding: 12,
        backgroundColor: "#fff",
        flex: 1,
    },
    infoItem: {
        flexDirection: 'row',
        marginBottom: 12
    },
    itemTitle: {
        fontWeight: '500',
        fontSize: 15,
        flex: 0.3
    },
    itemValue: {
        flex: 0.7,
        textAlign: 'right'
    },
})

export default Profile;