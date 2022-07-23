import { useMutation } from "@apollo/client";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ant from 'react-native-vector-icons/AntDesign'
import { CreateTransactionData, CreateTransactionVars, CREATE_TRANSACTION } from "../../graphql/mutations/transaction";
import { Post } from "../upload/upload";
import { showMessage } from "react-native-flash-message";
import { typenameToEnum } from "../../libs/enumConverter";
import { PostStatus } from "../../types/enums/realEstate";

interface RSPostFooterProps {
    data: Post & { _id: string, postStatus: PostStatus }
    type: string | undefined
}

const RSPostFooter: FunctionComponent<RSPostFooterProps> = ({ data, type }) => {
    const [newTransaction, { data: transactionData, error, loading }] = useMutation<CreateTransactionData, CreateTransactionVars>(CREATE_TRANSACTION)
    const [isRequested, setIsRequested] = useState(false)

    useEffect(() => {
        if(data.postStatus !== PostStatus.Available) {
            setIsRequested(true)
        }
    }, [data])

    useEffect(() => {
        if(transactionData) {
            setIsRequested(true)
            showMessage({
                message: "Đã yêu cầu giao dịch"
            })
            return;
        }

        if(error) {
            showMessage({
                message: "Thao tác thất bại, vui lòng thử lại"
            })
            return;
        }
    }, [transactionData, error])

    const pressCall = () => {
        const url = `tel://${data.owner.user.phone}`
        Linking.openURL(url)
    }

    const pressMessage = () => {
        const url = `sms://${data.owner.user.phone}`
        Linking.openURL(url)
    }

    const onRequestTransaction = useCallback(() => {
        if(loading || isRequested) return;

        newTransaction({
            variables: {
                item: {
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
            <TouchableOpacity style={styles.action} onPress={() => onRequestTransaction()}>
                <Text style={{
                    color: isRequested ? "#777" : "#222" 
                }}>
                    <Ant
                        name="lock1"
                        size={20}
                        style={{ paddingRight: 2 }}
                        color={isRequested ? "#777" : "#f93707" }
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
    }
})

export default RSPostFooter;