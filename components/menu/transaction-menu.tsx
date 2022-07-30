import { FunctionComponent } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TransactionStatus } from "../../types/enums/transaction";

interface TransactionMenuProps {
    status: TransactionStatus
    onChangeMenu: (stack: TransactionStatus) => void
}

const TransactionMenu: FunctionComponent<TransactionMenuProps> = ({ status, onChangeMenu }) => {
    return (
        <View style={styles.menu}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={[
                    styles.menuItem, {
                        borderBottomWidth: status === TransactionStatus.Locked ? 2 : 1,
                        borderBottomColor: status === TransactionStatus.Locked ? "#f93707" : "#dcdcdc"
                    }]}
                >
                    <TouchableOpacity onPress={() => onChangeMenu(TransactionStatus.Locked)}>
                        <Text style={styles.text}>Hàng chờ</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.menuItem, {
                        borderBottomWidth: status === TransactionStatus.DatCoc ? 2 : 1,
                        borderBottomColor: status === TransactionStatus.DatCoc ? "#f93707" : "#dcdcdc"
                    }]}
                >
                    <TouchableOpacity onPress={() => onChangeMenu(TransactionStatus.DatCoc)}>
                        <Text style={styles.text}>Đang giao dịch</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.menuItem, {
                        borderBottomWidth: status === TransactionStatus.BanGiao ? 2 : 1,
                        borderBottomColor: status === TransactionStatus.BanGiao ? "#f93707" : "#dcdcdc"
                    }]}
                >
                    <TouchableOpacity onPress={() => onChangeMenu(TransactionStatus.BanGiao)}>
                        <Text style={styles.text}>Đã giao dịch</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.menuItem, {
                        borderBottomWidth: status === TransactionStatus.Rejected ? 2 : 1,
                        borderBottomColor: status === TransactionStatus.Rejected ? "#f93707" : "#dcdcdc"
                    }]}
                >
                    <TouchableOpacity onPress={() => onChangeMenu(TransactionStatus.Rejected)}>
                        <Text style={styles.text}>Đã huỷ GD</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    menu: {
        backgroundColor: "#fff",
        height: 40
    },
    menuItem: {
        width: 150,
        height: 40,
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center'
    }
})

export default TransactionMenu;