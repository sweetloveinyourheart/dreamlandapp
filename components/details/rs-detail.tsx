import { FunctionComponent, useCallback, useState } from "react";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ant from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import NumberFormat from "react-number-format";
import { acreageIcon, bathroomsIcon, bedroomsIcon, directionIcon, floorIcon, furnitureIcon, heightIcon, profileIcon, typeIcon, widthIcon } from "../../constants/images";
import { Post } from "../upload/upload";
import Moment from 'moment';
import { moneyConverter } from "../../libs/moneyConverter";
import { apartmentTypeSpeaker, directionSpeaker, furnitureSpeaker, houseTypeSpeaker, landTypeSpeaker, premisesTypeSpeaker, userTypeSpeaker } from "../../libs/speaker";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AddressViewer from "./modal/address";
import VirtualViewer from "./modal/virtual";
import { RealEstateCategory } from "../../types/enums/realEstate";

interface RSDetailProps {
    data: Post & { timeStamp: Date }
    type: string
}

const RSDetail: FunctionComponent<RSDetailProps> = ({ data, type }) => {
    const [addressModalActive, setAddressModalActive] = useState<boolean>(false)
    const [virtualModalActive, setVirtualModalActive] = useState<boolean>(false)

    const onCloseAddressModal = useCallback(() => {
        setAddressModalActive(false)
    }, [addressModalActive])

    const onCloseVirtualModal = useCallback(() => {
        setVirtualModalActive(false)
    }, [virtualModalActive])

    const postType = (item: any) => {
        // Get post types
        switch (type) {
            case "Apartment":
                return apartmentTypeSpeaker(item)

            case "House":

                return houseTypeSpeaker(item);

            case "Land":

                return landTypeSpeaker(item);

            case "BusinessPremises":

                return premisesTypeSpeaker(item);

            case "Motal":

                return premisesTypeSpeaker(item);

            default:
                return;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text
                    numberOfLines={2}
                    ellipsizeMode='tail'
                    style={styles.name}
                >
                    {data.title}
                </Text>
                <TouchableOpacity style={styles.virtual} onPress={() => setVirtualModalActive(true)}>
                    <MaterialIcons name={"360"} size={20} color={data.virtual3DLink ? "green" : "#777"} />
                    <Text style={{ fontSize: 10, textAlign: 'center', color: data.virtual3DLink ? "green" : "#777" }}>360</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.price}>
                <NumberFormat
                    value={data.detail.pricing.total}
                    displayType={'text'}
                    thousandSeparator={true}
                    // @ts-ignore
                    renderText={(value: any, props: any) => (<Text {...props}>{moneyConverter(value)} {data.category === RealEstateCategory.ChoThue ? "/tháng" : ""}</Text>)}
                />
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.acreage}>{data.detail.acreage.totalAcreage} m²</Text>
                <Text style={styles.timeStamp}>
                    <Ant
                        name="clockcircleo"
                        size={14}
                        style={{ paddingRight: 2 }}
                    /> {(Moment(data.timeStamp).format('DD/MM/YYYY'))}
                </Text>
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
                            style={{ color: data.googleMapsLink ? "green" : "#777", fontWeight: '500' }}
                        >
                            {data.detail.address?.houseNumber} {data.detail.address?.street} - {data.detail.address?.ward} - {data.detail.address?.district} - {data.detail.address?.province}
                        </Text>
                    </View>
                </View>
            </Pressable>
            <View style={styles.owner}>
                <View style={styles.ownerLogo}>
                    <Image
                        source={profileIcon}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 100
                        }}
                    />
                </View>
                <View>
                    <Text style={styles.ownerName}>{data.owner.user.name}</Text>
                    <Text>{userTypeSpeaker(data.owner.type ?? "")}</Text>
                </View>
            </View>
            <View style={styles.information}>
                {data.detail.acreage.totalAcreage
                    && (
                        <View style={styles.informationItem}>
                            <Image
                                source={acreageIcon}
                                style={{
                                    width: 30,
                                    height: 30
                                }}
                            />
                            <Text style={styles.informationTxt}>Diện tích: {data.detail.acreage.totalAcreage} m2</Text>
                        </View>
                    )
                }
                {data.detail.acreage.width
                    && (
                        <View style={styles.informationItem}>
                            <Image
                                source={heightIcon}
                                style={{
                                    width: 30,
                                    height: 30
                                }}
                            />
                            <Text style={styles.informationTxt}>Chiều dài: {data.detail.acreage.width} m2</Text>
                        </View>
                    )
                }
                {data.detail.acreage.height
                    && (
                        <View style={styles.informationItem}>
                            <Image
                                source={widthIcon}
                                style={{
                                    width: 30,
                                    height: 30
                                }}
                            />
                            <Text style={styles.informationTxt}>Chiều rộng: {data.detail.acreage.height} m2</Text>
                        </View>
                    )}
                {data.overview?.doorDirection
                    && (
                        <View style={styles.informationItem}>
                            <Image
                                source={directionIcon}
                                style={{
                                    width: 30,
                                    height: 30
                                }}
                            />
                            <Text style={styles.informationTxt}>Hướng cửa chính: {directionSpeaker(data.overview.doorDirection)}</Text>
                        </View>
                    )
                }
                {data.overview?.balconyDirection
                    && (
                        <View style={styles.informationItem}>
                            <Image
                                source={directionIcon}
                                style={{
                                    width: 30,
                                    height: 30
                                }}
                            />
                            <Text style={styles.informationTxt}>Hướng ban công: {directionSpeaker(data.overview.balconyDirection)}</Text>
                        </View>
                    )}
                {data.overview?.numberOfBathrooms
                    && (
                        <View style={styles.informationItem}>
                            <Image
                                source={bathroomsIcon}
                                style={{
                                    width: 30,
                                    height: 30
                                }}
                            />
                            <Text style={styles.informationTxt}>Số phòng vệ sinh: {data.overview?.numberOfBathrooms} phòng</Text>
                        </View>
                    )
                }
                {data.overview?.numberOfBedrooms
                    && (
                        <View style={styles.informationItem}>
                            <Image
                                source={bedroomsIcon}
                                style={{
                                    width: 30,
                                    height: 30
                                }}
                            />
                            <Text style={styles.informationTxt}>Số phòng ngủ: {data.overview.numberOfBedrooms} phòng</Text>
                        </View>
                    )
                }
                {data.overview?.numberOfFloors
                    && (
                        <View style={styles.informationItem}>
                            <Image
                                source={floorIcon}
                                style={{
                                    width: 30,
                                    height: 30
                                }}
                            />
                            <Text style={styles.informationTxt}>Số tầng: {data.overview?.numberOfFloors} tầng</Text>
                        </View>
                    )
                }
                <View style={styles.informationItem}>
                    <Image
                        source={typeIcon}
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                    <Text style={styles.informationTxt}>Loại hình: {postType(data.overview?.type)}</Text>
                </View>
                {data.overview?.furniture
                    && (
                        <View style={styles.informationItem}>
                            <Image
                                source={furnitureIcon}
                                style={{
                                    width: 30,
                                    height: 30
                                }}
                            />
                            <Text style={styles.informationTxt}>Tình trạng nội thất: {furnitureSpeaker(data.overview?.furniture)}</Text>
                        </View>
                    )
                }
            </View>
            <View style={styles.description}>
                <Text>{data.description}</Text>
            </View>

            {data.googleMapsLink
                && (
                    <AddressViewer
                        uri={data.googleMapsLink}
                        active={addressModalActive}
                        onClose={onCloseAddressModal}
                    />
                )
            }

            {data.virtual3DLink
                && (
                    <VirtualViewer
                        uri={data.virtual3DLink}
                        active={virtualModalActive}
                        onClose={onCloseVirtualModal}
                    />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12
    },
    header: {
        marginTop: 8,
        flexDirection: 'row'
    },
    name: {
        fontWeight: '600',
        textTransform: 'uppercase',
        fontSize: 16,
        flex: 0.9
    },
    virtual: {
        flex: 0.1,
        alignItems: 'flex-end'
    },
    acreage: {
        marginTop: 4,
        color: "#777",
        fontSize: 14
    },
    price: {
        color: "#f93707",
        fontWeight: '600',
        marginTop: 4,
        fontSize: 16,
    },
    timeStamp: {
        fontSize: 13,
        flex: 0.5,
        color: "#777",
        textAlign: 'right'
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
    owner: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: "#dcdcdc",
        flexDirection: 'row',
        alignItems: 'center'
    },
    ownerLogo: {
        marginRight: 12
    },
    ownerName: {
        fontWeight: '600',
        fontSize: 16
    },
    description: {
        marginTop: 12
    },
    information: {
        borderBottomWidth: 1,
        borderColor: "#dcdcdc",
        paddingVertical: 12
    },
    informationItem: {
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 6
    },
    informationTxt: {
        marginLeft: 12
    }
})

export default RSDetail;