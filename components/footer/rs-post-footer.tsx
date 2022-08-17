import { useMutation } from "@apollo/client";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Button, Linking, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ant from 'react-native-vector-icons/AntDesign'
import { CreateTransactionData, CreateTransactionVars, CREATE_TRANSACTION } from "../../graphql/mutations/transaction";
import { Post } from "../upload/upload";
import { showMessage } from "react-native-flash-message";
import { typenameToEnum } from "../../libs/enumConverter";
import { PostStatus } from "../../types/enums/realEstate";
import { PostDetail } from "../details/rs-detail";
import { useAuth } from "../../contexts/auth";
import { useLinkTo } from "@react-navigation/native";

interface RSPostFooterProps {
    data: PostDetail
    type: string | undefined
}

const RSPostFooter: FunctionComponent<RSPostFooterProps> = ({ data, type }) => {
    const [isRequested, setIsRequested] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    const [newTransaction, { data: transactionData, error, loading }] = useMutation<CreateTransactionData, CreateTransactionVars>(CREATE_TRANSACTION)
    const { hasPermission } = useAuth()

    useEffect(() => {
        if (data.postStatus !== PostStatus.Available) {
            setIsRequested(true)
        }
    }, [data])

    useEffect(() => {
        if (transactionData) {
            setIsRequested(true)
            setModalVisible(false)
            showMessage({
                message: "Đã yêu cầu giao dịch"
            })
            return;
        }

        if (error) {
            setModalVisible(false)
            showMessage({
                message: "Thao tác thất bại, vui lòng thử lại"
            })
            return;
        }
    }, [transactionData, error])

    const pressCall = () => {
        const url = `tel://${data.owner.phone}`
        Linking.openURL(url)
    }

    const pressMessage = () => {
        const url = `sms://${data.owner.phone}`
        Linking.openURL(url)
    }

    const pressTransaction = () => {
        const permission = hasPermission()
        if (isRequested || !permission)
            return;

        setModalVisible(true)
    }

    const onRequestTransaction = useCallback(() => {
        if (loading || isRequested) return;

        newTransaction({
            variables: {
                realEstate: {
                    itemId: data._id,
                    itemType: typenameToEnum(type)
                }
            }
        })
    }, [data, type, isRequested])

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.action} onPress={pressCall}>
                <Text style={{
                    color: "#222"
                }}>
                    <Ant
                        name="phone"
                        size={20}
                        style={{ paddingRight: 2 }}
                        color="#f93707"
                    />  Gọi điện
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action} onPress={() => pressTransaction()}>
                <Text style={{
                    color: isRequested ? "#777" : "#222"
                }}>
                    <Ant
                        name="lock1"
                        size={20}
                        style={{ paddingRight: 2 }}
                        color={isRequested ? "#777" : "#f93707"}
                    />  Giao dịch
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action} onPress={pressMessage}>
                <Text style={{
                    color: "#222"
                }}>
                    <Ant
                        name="message1"
                        size={20}
                        style={{ paddingRight: 2 }}
                        color="#f93707"
                    />  Nhắn tin
                </Text>
            </TouchableOpacity>

            <Modal
                animationType="fade"
                visible={modalVisible}
                transparent
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBg}>
                    <View style={styles.modalPrompt}>
                        <Text style={styles.modalTitle}>Xác nhận giao dịch</Text>
                        <Text style={styles.modalDesc}>Sau khi xác nhận giao dịch, quản trị viên sẽ duyệt và liên hệ với khách hàng</Text>
                        <View style={styles.modalActions}>
                            <Pressable style={styles.accept} onPress={() => onRequestTransaction()}>
                                <Text style={{ color: "#fff", textAlign: 'center' }}>Xác nhận</Text>
                            </Pressable>
                            <Pressable style={styles.denied} onPress={() => setModalVisible(false)}>
                                <Text style={{ color: "#fff", textAlign: 'center' }}>Huỷ bỏ</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        flexDirection: 'row'
    },
    action: {
        flex: 1 / 3,
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: "#dcdcdc"
    },
    modalBg: {
        backgroundColor: "rgba(0,0,0,0.25)",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24
    },
    modalPrompt: {
        backgroundColor: "#fff",
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 8
    },
    modalTitle: {
        fontWeight: '500',
        fontSize: 17,
        marginBottom: 8,
        textAlign: 'center'
    },
    modalDesc: {
        fontWeight: '400',
        fontSize: 14,
        marginBottom: 16,
        textAlign: 'center'
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    accept: {
        width: 100,
        backgroundColor: "#14a7fa",
        color: "#fff",
        marginRight: 12,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 6
    },
    denied: {
        width: 100,
        backgroundColor: "#f93707",
        color: "#fff",
        marginLeft: 12,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 6
    }
})

export default RSPostFooter;