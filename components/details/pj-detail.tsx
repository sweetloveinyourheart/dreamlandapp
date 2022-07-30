import { FunctionComponent, useCallback, useState } from "react";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import NumberFormat from "react-number-format";
import { moneyConverter } from "../../libs/moneyConverter";
import { projectTypeTranslate } from "../../libs/speaker";
import { ProjectInterface } from "../../types/interfaces/project";
import AddressViewer from "./modal/address";
import VirtualViewer from "./modal/virtual";

interface ProjectDetailProps {
    data: ProjectInterface
}

const line = require('../../assets/decor/line.png')

const ProjectDetail: FunctionComponent<ProjectDetailProps> = ({ data }) => {
    const [addressModalActive, setAddressModalActive] = useState<boolean>(false)
    const [virtualModalActive, setVirtualModalActive] = useState<boolean>(false)

    const onCloseAddressModal = useCallback(() => {
        setAddressModalActive(false)
    }, [addressModalActive])

    const onCloseVirtualModal = useCallback(() => {
        setVirtualModalActive(false)
    }, [virtualModalActive])

    const renderUtilities = () => {
        return data.utilities.map((util, index) => {
            return (
                <View key={index} style={styles.utilitiesItem}>
                    <Image
                        source={{ uri: util.image }}
                        style={{
                            flex: 1,
                            width: undefined,
                            height: undefined,
                            resizeMode: 'contain'
                        }}
                    />
                    <Text style={styles.utilitiesTxt}>{util.title}</Text>
                </View>
            )
        })
    }

    const renderMasterPlan = () => {
        return data.masterPlan.map((item, index) => {
            return (
                <View style={styles.masterPlanItem} key={index}>
                    <Text style={styles.masterPlanTxt}>{item.title} Thi công tầng</Text>
                    <View style={styles.masterPlanImg}>
                        <Image
                            source={{
                                uri: item.image
                            }}
                            style={{
                                flex: 1,
                                width: undefined,
                                height: undefined,
                                resizeMode: 'contain'
                            }}
                        />
                    </View>
                </View>
            )
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text
                    numberOfLines={2}
                    ellipsizeMode='tail'
                    style={styles.name}
                >
                    {data.projectName}
                </Text>
                <TouchableOpacity style={styles.virtual} onPress={() => setVirtualModalActive(true)}>
                    <MaterialIcons name={"360"} size={20} color="#f93707" />
                    <Text style={{ fontSize: 10, textAlign: 'center', color: "#f93707" }}>360</Text>
                </TouchableOpacity>
            </View>
            <Pressable style={styles.addressArea} onPress={() => { setAddressModalActive(true) }}>
                <View style={styles.address}>
                    <View style={styles.addressIcon}>
                        <View style={{ flexDirection: 'row' }}>
                            <Feather name="map-pin" size={16} />
                            <Text style={{ color: "#777" }}> Địa điểm: </Text>
                        </View>
                    </View>
                    <View style={styles.addressTxt}>
                        <Text
                            numberOfLines={2}
                            ellipsizeMode='tail'
                            style={{ color: "#14a7fa", fontWeight: '500' }}
                        >
                            {data.address.street} - {data.address.ward} - {data.address.district} - {data.address.province}
                        </Text>
                    </View>
                </View>
            </Pressable>
            <View style={styles.description}>
                <View style={styles.groupHeader}>
                    <Text style={styles.headerTxt}>Giới thiệu dự án</Text>
                    <Image
                        source={line}
                        style={{
                            width: '100%'
                        }}
                    />
                </View>
                <Text style={styles.descriptionContent}>
                    {data.description}
                </Text>
            </View>
            <View style={styles.detail}>
                <View style={styles.groupHeader}>
                    <Text style={styles.headerTxt}>Thông tin dự án</Text>
                    <Image
                        source={line}
                        style={{
                            width: '100%'
                        }}
                    />
                </View>
                <View style={styles.detailContent}>
                    <Text >
                        Giá mua bán:
                    </Text>
                    <Text>
                        {data.information.purchaseInfo
                            ? (
                                <NumberFormat
                                    value={data.information.purchaseInfo ?? 0}
                                    className="foo"
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    // @ts-ignore
                                    renderText={(value: any, props: any) => (<Text {...props}>{moneyConverter(value)}</Text>)}
                                />
                            )
                            : "---"
                        }
                    </Text>
                </View>
                <View style={styles.detailContent}>
                    <Text >
                        Giá cho thuê:
                    </Text>
                    <Text>
                        {data.information?.rentInfo
                            ? (
                                <NumberFormat
                                    value={data.information.rentInfo ?? 0}
                                    className="foo"
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    // @ts-ignore
                                    renderText={(value: any, props: any) => (<Text {...props}>{moneyConverter(value)}</Text>)}
                                />
                            )
                            : "---"
                        }
                    </Text>
                </View>
                <View style={styles.detailContent}>
                    <Text >
                        Năm khởi công:
                    </Text>
                    <Text>
                        {data.information?.startedAt
                            ? data.information.startedAt
                            : "---"
                        }
                    </Text>
                </View>
                <View style={styles.detailContent}>
                    <Text >
                        Năm bàn giao:
                    </Text>
                    <Text>
                        {data.information?.handOverYear
                            ? data.information.handOverYear
                            : "---"
                        }
                    </Text>
                </View>
                <View style={styles.detailContent}>
                    <Text >
                        Loại hình:
                    </Text>
                    <Text>
                        {data.information.type
                            ? projectTypeTranslate(data.information.type)
                            : "---"
                        }
                    </Text>
                </View>
                <View style={styles.detailContent}>
                    <Text >
                        Tổng diện tích
                    </Text>
                    <Text>
                        {data.information.acreage
                            ? data.information.acreage + " m²"
                            : "---"
                        }
                    </Text>
                </View>
                <View style={styles.detailContent}>
                    <Text >
                        Chủ đầu tư
                    </Text>
                    <Text>
                        {data.investor.name
                            ? data.investor.name
                            : "---"
                        }
                    </Text>
                </View>
                <View style={styles.detailContent}>
                    <Text >
                        Tiến độ:
                    </Text>
                    <Text>
                        {data.information?.progressStatus
                            ? data.information.progressStatus
                            : "---"
                        }
                    </Text>
                </View>
                <View style={styles.detailContent}>
                    <Text >
                        Quy mô:
                    </Text>
                    <Text>
                        {data.information?.scale
                            ? data.information.scale
                            : "---"
                        }
                    </Text>
                </View>
                <View style={styles.detailContent}>
                    <Text >
                        Trạng thái:
                    </Text>
                    <Text>
                        {data.information?.status
                            ? data.information.status
                            : "---"
                        }
                    </Text>
                </View>
            </View>

            <View style={styles.utilities}>
                <View style={styles.groupHeader}>
                    <Text style={styles.headerTxt}>Tiện ích nổi bật</Text>
                    <Image
                        source={line}
                        style={{
                            width: '100%'
                        }}
                    />
                </View>
                <ScrollView horizontal>
                    {renderUtilities()}
                </ScrollView>
            </View>

            <View style={styles.masterPlan}>
                <View style={styles.groupHeader}>
                    <Text style={styles.headerTxt}>Mặt bằng dự án</Text>
                    <Image
                        source={line}
                        style={{
                            width: '100%'
                        }}
                    />
                </View>
                <View>
                    {renderMasterPlan()}
                </View>
            </View>

            <View style={styles.investor}>
                <View style={styles.groupHeader}>
                    <Text style={styles.headerTxt}>Chủ đầu tư dự án</Text>
                    <Image
                        source={line}
                        style={{
                            width: '100%'
                        }}
                    />
                </View>
                <Text style={styles.investorName}>
                    {data.investor.name}
                </Text>
                <Text style={styles.investorAbout}>
                    {data.investor.about}
                </Text>
            </View>

            <View style={styles.product}>
                <View style={styles.groupHeader}>
                    <Text style={styles.headerTxt}>Sản phẩm dự án</Text>
                    <Image
                        source={line}
                        style={{
                            width: '100%'
                        }}
                    />
                </View>
            </View>

            {data.googleMapsLink
                ? (
                    <AddressViewer
                        uri={data.googleMapsLink}
                        active={addressModalActive}
                        onClose={onCloseAddressModal}
                    />
                )
                : (<View></View>)
            }

            {data.virtual3DLink
                ? (
                    <VirtualViewer
                        uri={data.virtual3DLink}
                        active={virtualModalActive}
                        onClose={onCloseVirtualModal}
                    />
                )
                : (<View></View>)
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingTop: 12,
        backgroundColor: "#fff"
    },
    title: {
        marginTop: 8,
        flexDirection: 'row'
    },
    virtual: {
        flex: 0.1,
        alignItems: 'flex-end'
    },
    name: {
        flex: 0.9,
        fontWeight: '600',
        textTransform: 'uppercase',
        fontSize: 16
    },
    addressArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 0.9,
        marginTop: 12,
        borderBottomWidth: 1,
        paddingVertical: 8,
        borderColor: "#dcdcdc"
    },
    address: {
        flexDirection: 'row',
        flex: 1
    },
    addressIcon: {
        flexDirection: 'row',
        flex: 0.3
    },
    addressTxt: {
        flex: 0.7,
        color: "#14a7fa"
    },

    groupHeader: {
        marginBottom: 12
    },
    headerTxt: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        color: "#f30606"
    },
    description: {
        marginTop: 12,
        paddingVertical: 8,
    },
    descriptionContent: {
        lineHeight: 24
    },
    detail: {
        marginTop: 24,
        paddingVertical: 8,
    },
    detailContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12
    },
    utilities: {
        marginTop: 24
    },
    utilitiesItem: {
        width: 200,
        height: 150,
        marginRight: 12,
        position: 'relative'
    },
    utilitiesTxt: {
        fontSize: 14,
        padding: 8,
        fontWeight: '600',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        width: '100%',
        color: "#fff",
    },
    masterPlan: {
        marginTop: 24,
        paddingVertical: 8,
    },
    masterPlanItem: {
        flexDirection: 'row',
        height: 70,
        alignItems: 'center',
        marginBottom: 12,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "#dcdcdc"
    },
    masterPlanTxt: {
        flex: 0.75,
        fontWeight: '600'
    },
    masterPlanImg: {
        flex: 0.25
    },
    investor: {
        marginTop: 24,
        paddingVertical: 8,
    },
    investorName: {
        color: "#ffb41f",
        textAlign: 'center',
        marginBottom: 12,
        fontSize: 16,
        fontWeight: '500',
        textTransform: 'uppercase'
    },
    investorAbout: {
        textAlign: 'center'
    },
    product: {
        marginTop: 24,
    }
})

export default ProjectDetail;