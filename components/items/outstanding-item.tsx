import { FunctionComponent, useCallback } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ant from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import NumberFormat from "react-number-format";
import SpinnerLoading from "../loading/spinner";
import { ItemDataDisplay } from "./rs-items";
import Moment from 'moment';
import { moneyConverter } from "../../libs/moneyConverter";
import { useNavigation } from "@react-navigation/native";
import { useViewHistory } from "../../contexts/view-history";
import { RealEstateCategory } from "../../types/enums/realEstate";

interface OutstandingItemsProps {
    loading: boolean
    data: ItemDataDisplay[]
}

const OutstandingItems: FunctionComponent<OutstandingItemsProps> = ({ data, loading }) => {
    const navigation = useNavigation();

    const { storeItem } = useViewHistory()

    const onSelect = useCallback((item: ItemDataDisplay) => {
        // @ts-ignore
        navigation.navigate('post-screen', { directLink: item.directLink, type: item.__typename })
        storeItem(item)
    }, [navigation])

    if (loading) {
        return <SpinnerLoading height={200} />
    }

    const renderItems = () => {
        return data.map((item, index) => {
            return (
                <TouchableOpacity style={styles.item} key={index} onPress={() => onSelect(item)}>
                    <Image
                        source={{ uri: item.media.images[0] }}
                        style={styles.image}
                    />
                    <Text numberOfLines={2} ellipsizeMode='tail' style={styles.name}>
                        <Text style={styles.stampTxt}> <Ionicons name="ios-medal-outline" size={14} /> Nổi bật </Text> {item.title}
                    </Text>
                    <Text style={styles.acreage}>{item.detail.acreage.totalAcreage} m²</Text>
                    <Text style={styles.price}>
                        <NumberFormat
                            value={item.detail.pricing.total}
                            displayType={'text'}
                            thousandSeparator={true}
                            // @ts-ignore
                            renderText={(value: any, props: any) => (<Text {...props}>{moneyConverter(value)} {item.category === RealEstateCategory.ChoThue ? "/tháng" : ""}</Text>)}
                        />
                    </Text>
                    <View style={styles.info}>
                        <Text style={styles.timeStamp}>
                            <Ant
                                name="clockcircleo"
                                size={14}
                                style={{ paddingRight: 2 }}
                            /> {(Moment(item.timeStamp).format('DD/MM'))}
                        </Text>
                        <Text style={styles.address} numberOfLines={1} ellipsizeMode='tail'>
                            {item.detail.address.province}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        })
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Bất động sản nổi bật</Text>
                <View style={styles.descr}>
                    <View style={styles.descrItem}>
                        <Ionicons
                            name="shield-checkmark-outline"
                            size={20}
                            color="#f30606"
                        />
                        <Text style={styles.descrTxt}> Thông tin chính xác</Text>
                    </View>
                    <View style={styles.descrItem}>
                        <Ionicons
                            name="shield-checkmark-outline"
                            size={20}
                            color="#f30606"
                        />
                        <Text style={styles.descrTxt}> Đối tác tin cậy</Text>
                    </View>
                </View>
            </View>
            {data.length === 0
                ? (
                    <View style={styles.noItems}>
                        <Text style={styles.noItemsTxt}>Chưa có dữ liệu hiển thị</Text>
                    </View>
                )
                : (
                    <ScrollView horizontal>
                        {renderItems()}
                    </ScrollView>
                )
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        backgroundColor: "#fff",
        padding: 12
    },
    descr: {
        flexDirection: 'row'
    },
    descrItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        marginRight: 12,
    },
    descrTxt: {
        color: "#f30606"

    },
    title: {
        fontWeight: '700',
        fontSize: 16,
        marginBottom: 12
    },
    item: {
        width: 175,
        marginRight: 16
    },
    image: {
        width: 175,
        height: 131,
        borderRadius: 4
    },
    stampTxt: {
        fontSize: 12,
        color: "#fff",
        borderRadius: 4,
        backgroundColor: "#f30606",

    },
    name: {
        marginTop: 8,
        fontWeight: '500'
    },
    acreage: {
        marginTop: 4,
        fontSize: 13,
        color: "#777"
    },
    price: {
        color: "#f93707",
        fontWeight: '500',
        marginTop: 4
    },
    info: {
        flexDirection: 'row',
        marginTop: 8
    },
    timeStamp: {
        fontSize: 13,
        flex: 0.5,
        color: "#777"
    },
    address: {
        fontSize: 13,
        flex: 0.5,
        textAlign: 'right',
        color: "#777"
    },
    noItems: {
        borderTopWidth: 1,
        borderTopColor: "#dcdcdc",
        height: 150,
        justifyContent: 'center'
    },
    noItemsTxt: {
        textAlign: 'center',
        color: "#777"
    }
})

export default OutstandingItems;