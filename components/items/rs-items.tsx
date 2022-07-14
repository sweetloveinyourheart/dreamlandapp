import { FunctionComponent, useCallback } from "react";
import { Image, Pressable, View, StyleSheet, Text, TouchableOpacity, ScrollView, StyleProp, ViewStyle } from "react-native";
import { RealEstateCategory } from "../../types/enums/realEstate";
import SpinnerLoading from "../loading/spinner";
import Ant from 'react-native-vector-icons/AntDesign'
import { useLinkTo, useNavigation } from "@react-navigation/native";
import { moneyConverter } from "../../libs/moneyConverter";
import NumberFormat from "react-number-format";
import Moment from 'moment';
import { useViewHistory } from "../../contexts/view-history";

export interface ItemDataDisplay {
    __typename: string
    title: string,
    media: {
        images: string[]
    }
    detail: {
        acreage: {
            totalAcreage: number
        }
        pricing: {
            total: number
        }
        address: {
            province: string
        }
    }
    overview?: {
        numberOfBedrooms: number
    }
    timeStamp: Date
    directLink: string
    category: RealEstateCategory
}

interface RealEstateItemsProps {
    loading: boolean
    data: ItemDataDisplay[]
    title: string
    category: RealEstateCategory
}

export const RealEstateItem: FunctionComponent<{ data: ItemDataDisplay[], display: 'horizontal' | 'vertical' | 'column' }> = ({ display, data }) => {
    const navigation = useNavigation();

    const { storeItem } = useViewHistory()

    const getItemStyles = useCallback((index: number): StyleProp<ViewStyle> => {
        if (display === 'column') {
            if (index % 2 === 0)
                return {
                    width: '50%',
                    paddingRight: 6,
                    marginBottom: 12
                }
            else
                return {
                    width: '50%',
                    paddingLeft: 6,
                    marginBottom: 12
                }
        }

        if (display === 'vertical') {
            return {
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 12
            }
        }

        return styles.item
    }, [display])

    const onSelect = useCallback((item: ItemDataDisplay) => {
        // @ts-ignore
        navigation.navigate('post-screen', { directLink: item.directLink, type: item.__typename })
        storeItem(item)
    }, [navigation])

    const renderItems = () => {
        return data.map((item, index) => {
            return (
                <TouchableOpacity
                    style={getItemStyles(index)}

                    onPress={() => onSelect(item)}
                    key={index}
                >
                    <View style={{ flex: display === 'vertical' ? 0.4 : 1, backgroundColor: "#eee" }}>
                        <Image
                            source={{ uri: item.media.images[0] }}
                            style={display === 'vertical' ? { flex: 1, width: undefined, height: undefined, resizeMode: 'contain' } : styles.image}
                        />
                    </View>
                    <View style={{ flex: display === 'vertical' ? 0.6 : 1, paddingLeft: display === 'vertical' ? 12 : 0 }}>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={[styles.name, { marginTop: display === 'vertical' ? 0 : 8 }]}>{item.title}</Text>
                        <Text style={styles.acreage}>{item.detail.acreage.totalAcreage} m²</Text>
                        <Text style={styles.price}>
                            <NumberFormat
                                value={item.detail.pricing.total}
                                displayType={'text'}
                                thousandSeparator={true}
                                // @ts-ignore
                                renderText={(value: any, props: any) => (<Text {...props}>{moneyConverter(value)}</Text>)}
                            />
                        </Text>
                        <View style={[styles.info, { marginTop: display === 'vertical' ? 16 : 8 }]}>
                            <Text style={styles.timeStamp}>
                                <Ant
                                    name="clockcircleo"
                                    size={12}
                                    style={{ paddingRight: 2 }}
                                /> {(Moment(item.timeStamp).format('DD/MM'))}
                            </Text>
                            <Text style={styles.address} numberOfLines={1} ellipsizeMode='tail'>{item.detail.address.province}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        })
    }

    return (
        <ScrollView horizontal={display === 'horizontal' ? true : false}>
            <View style={{ flexDirection: display === 'vertical' ? 'column' : 'row', flexWrap: display === 'column' ? 'wrap' : 'nowrap' }}>
                {renderItems()}
            </View>
        </ScrollView>
    )
}

const RealEstateView: FunctionComponent<RealEstateItemsProps> = ({ data, loading, title, category }) => {
    const navigation = useNavigation()

    if (loading) {
        return <SpinnerLoading height={200} />
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <RealEstateItem data={data} display='horizontal' />
            <View style={styles.moreArea}>
                <Pressable
                    // @ts-ignore
                    onPress={() => navigation.navigate('rs-screen', { category })}
                >
                    <Text style={styles.moreTxt}> Xem thêm tin {title} </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        backgroundColor: "#fff",
        padding: 12
    },
    title: {
        fontWeight: '700',
        fontSize: 16,
        marginBottom: 16
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
        fontSize: 12,
        flex: 0.5,
        color: "#777"
    },
    address: {
        fontSize: 12,
        flex: 0.5,
        textAlign: 'right',
        color: "#777"
    },
    moreArea: {
        paddingTop: 8,
        marginTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#dcdcdc"
    },
    moreTxt: {
        textAlign: 'center',
        color: "#14a7fa",
        fontWeight: '500'
    }
})

export default RealEstateView;