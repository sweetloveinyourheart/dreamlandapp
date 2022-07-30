import { useMutation } from "@apollo/client";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import NumberFormat from "react-number-format";
import { CreateTransactionData, CreateTransactionVars, CREATE_TRANSACTION } from "../../graphql/mutations/transaction";
import { moneyConverter } from "../../libs/moneyConverter";
import { productStatusReader } from "../../libs/speaker";
import { ProjectProductStatus } from "../../types/enums/project";
import { ProjectProduct } from "../../types/interfaces/project";

interface ProductTableProps {
    products: ProjectProduct[]
}

const ProductTable: FunctionComponent<ProductTableProps> = ({ products }) => {
    const [head, setHead] = useState(['STT', 'Mã', 'Diện tích', 'Số thửa', 'Giá bán', 'Thổ cư', 'Ghi chú', 'Trạng thái', 'Hành động'])
    const [data, setData] = useState<any>([])
    const [idArr, setIdArr] = useState<string[]>([]) 
    const [widthArr] = useState([75, 75, 100, 100, 150, 100, 250, 100, 150])

    const [modalVisible, setModalVisible] = useState(false)
    const [selectedRow, setSelectedRow] = useState<number | undefined>()

    const [newTransaction, { data: transactionData, error, loading }] = useMutation<CreateTransactionData, CreateTransactionVars>(CREATE_TRANSACTION)

    useEffect(() => {
        const converted = products.map((product, index) => {
            const { __typename, _id, ...display } = product
            setIdArr(s => [...s, _id])
            return Object.values({ index, ...display, end: index })
        })

        setData(converted)
    }, [products])

    useEffect(() => {
        if (transactionData) {
            setModalVisible(false)

            // Set item status
            if(selectedRow !== undefined) {
                let newData = [...data]
                newData[selectedRow][7] = ProjectProductStatus.Lock
                setData(newData)
            }

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

    const pressTransaction = (rowData: any, rowIndex: number) => {
        if(rowData[7] !== "Available") return;

        setSelectedRow(rowIndex)
        setModalVisible(true)
    }

    const onRequestTransaction = useCallback(() => {
        if(selectedRow === undefined) return;
        if (loading || (data[selectedRow][7] !== "Available")) return;

        newTransaction({
            variables: {
                project: {
                    itemId: idArr[selectedRow]
                }
            }
        })
    }, [data, loading, selectedRow])

    const renderData = (cellData: any, cellIndex: number, rowData: any, rowIndex: number) => {
        if (cellIndex === 4) {
            return (
                <Text style={styles.text}>
                    <NumberFormat
                        value={cellData}
                        displayType={'text'}
                        thousandSeparator={true}
                        // @ts-ignore
                        renderText={(value: any, props: any) => (<Text {...props}>{moneyConverter(value)}</Text>)}
                    />
                </Text>)
        }

        if (cellIndex === 7) {
            return <Text style={styles.text}>{productStatusReader(cellData)}</Text>
        }

        if (cellIndex === 8) {
            return (
                <View style={styles.actions}>
                    {rowData[7] === "Available"
                        && (
                            <TouchableOpacity style={styles.btn} onPress={() => pressTransaction(rowData, rowIndex)}>
                                <Text>Giao dịch</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            )
        }

        return cellData
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Table borderStyle={{ borderWidth: 1, borderColor: '#ffa1d2' }}>
                    <Row data={head} widthArr={widthArr} style={styles.HeadStyle} textStyle={styles.TableText} />
                    {/* <Rows data={data} widthArr={[50, 50, 100, 100, 150, 100, 200]} textStyle={styles.TableText} /> */}
                    {
                        data.map((rowData: any, index: number) => (
                            <TableWrapper key={index} style={styles.row}>
                                {
                                    rowData.map((cellData: any, cellIndex: number) => (
                                        <Cell
                                            key={cellIndex}
                                            data={renderData(cellData, cellIndex, rowData, index)}
                                            textStyle={{ textAlign: 'center', margin: 6 }}
                                            width={widthArr[cellIndex]}
                                            height={50}
                                        />
                                    ))
                                }
                            </TableWrapper>
                        ))
                    }
                </Table>
            </ScrollView>
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
        flex: 1,
        padding: 18,
        paddingTop: 35,
        backgroundColor: '#ffffff'
    },
    HeadStyle: {
        height: 50,
        alignContent: "center",
        backgroundColor: '#ffe0f0'
    },
    TableText: {
        margin: 10,
        textAlign: 'center'
    },
    text: { margin: 6, textAlign: 'center' },
    row: { flexDirection: 'row', backgroundColor: '#fff' },
    btn: { backgroundColor: '#06e763', borderRadius: 4, paddingVertical: 8, paddingHorizontal: 8 },
    btnText: { textAlign: 'center', color: '#fff' },
    actions: {
        flexDirection: 'row',
        justifyContent: 'center'
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
});

export default ProductTable;