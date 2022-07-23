import { useLazyQuery } from "@apollo/client";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NumberFormat from "react-number-format";
import {
    GET_APARTMENT_BY_ID,
    GET_BUSINESS_PREMISES_BY_ID,
    GET_HOUSE_BY_ID,
    GET_LAND_BY_ID,
    GET_MOTAL_BY_ID
} from "../../graphql/queries/transaction";
import { moneyConverter } from "../../libs/moneyConverter";
import { TransactionInterface } from "../../types/interfaces/transaction";
import SpinnerLoading from "../loading/spinner";
import { Post } from "../upload/upload";
import Ant from 'react-native-vector-icons/AntDesign'
import { TransactionStatus } from "../../types/enums/transaction";
import { useNavigation } from "@react-navigation/native";
import { enumToTypename } from "../../libs/enumConverter";


interface TransactionItemsProps {
    items: TransactionInterface[]
}

const Item = ({ transaction }: { transaction: TransactionInterface }) => {
    const [post, setPost] = useState<Post & { directLink: string }>()

    const [apartmentQuery, { data: apartmentData }] = useLazyQuery(GET_APARTMENT_BY_ID)
    const [houseQuery, { data: houseData }] = useLazyQuery(GET_HOUSE_BY_ID)
    const [landQuery, { data: landData }] = useLazyQuery(GET_LAND_BY_ID)
    const [premisesQuery, { data: premisesData }] = useLazyQuery(GET_BUSINESS_PREMISES_BY_ID)
    const [motalQuery, { data: motalData }] = useLazyQuery(GET_MOTAL_BY_ID)

    const navigation = useNavigation()

    useEffect(() => {
        switch (transaction.item.itemType) {
            case "CanHo":
                apartmentQuery({
                    variables: {
                        id: transaction.item.itemId
                    }
                })
                return;

            case "NhaO":
                houseQuery({
                    variables: {
                        id: transaction.item.itemId
                    }
                })
                return;

            case "Dat":
                landQuery({
                    variables: {
                        id: transaction.item.itemId
                    }
                })
                return;

            case "VanPhong":
                premisesQuery({
                    variables: {
                        id: transaction.item.itemId
                    }
                })
                return;

            case "PhongTro":
                motalQuery({
                    variables: {
                        id: transaction.item.itemId
                    }
                })
                return;

            default:
                return;
        }
    }, [transaction])

    useEffect(() => {
        if (apartmentData && transaction.item.itemType === "CanHo") {
            setPost(apartmentData.apartment)
        }

        if (houseData && transaction.item.itemType === "NhaO") {
            setPost(houseData.house)
        }

        if (landData && transaction.item.itemType === "Dat") {
            setPost(landData.land)
        }

        if (premisesData && transaction.item.itemType === "VanPhong") {
            setPost(premisesData.businessPremises)
        }

        if (motalData && transaction.item.itemType === "PhongTro") {
            setPost(motalData.motal)
        }
    }, [apartmentData, houseData, landData, premisesData, motalData])

    const onViewPost = useCallback((directLink: string, type: string) => {
        // @ts-ignore
        navigation.navigate('post-screen', { directLink, type: enumToTypename(type) })
    }, [navigation])

    if (!post) {
        return <SpinnerLoading height={60} />
    }

    return (
        <TouchableOpacity style={styles.item} onPress={() => onViewPost(post.directLink, transaction.item.itemType)}>
            <View style={styles.image}>
                <Image
                    source={{ uri: post?.media?.images[0] }}
                    style={{
                        flex: 1,
                        width: undefined,
                        height: undefined,
                        resizeMode: 'contain'
                    }}
                />
            </View>
            <View style={styles.description}>
                <View>
                    <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{post.title}</Text>
                    <NumberFormat
                        value={post.detail.pricing.total}
                        displayType={'text'}
                        thousandSeparator={true}
                        // @ts-ignore
                        renderText={(value: any, props: any) => (<Text style={styles.price} {...props}>{moneyConverter(value)}</Text>)}
                    />
                    <Text style={styles.owner}><Ant name="user" size={13} /> {post.owner.user.name}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {transaction.status === TransactionStatus.Locked
                        && (
                            <View style={[styles.status, { backgroundColor: "orange" }]}><Text style={{ fontSize: 12, color: "#fff" }}>Đã khoá</Text></View>
                        )
                    }
                    {transaction.status === TransactionStatus.DatCoc
                        && (
                            <View style={[styles.status, { backgroundColor: "#14a7fa" }]}><Text style={{ fontSize: 12, color: "#fff" }}>Đã đặt cọc</Text></View>
                        )
                    }
                    {transaction.status === TransactionStatus.BanGiao
                        && (
                            <View style={[styles.status, { backgroundColor: "green" }]}><Text style={{ fontSize: 12, color: "#fff" }}>Đã bàn giao</Text></View>
                        )
                    }
                    {transaction.status === TransactionStatus.Rejected
                        && (
                            <View style={[styles.status, { backgroundColor: "#f30606" }]}><Text style={{ fontSize: 12, color: "#fff" }}>Đã huỷ bỏ</Text></View>
                        )
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
}

const TransactionItems: FunctionComponent<TransactionItemsProps> = ({ items }) => {

    const renderItems = () => {
        return items.map((item, index) => {
            return <Item transaction={item} key={index} />
        })
    }

    if (items.length === 0) {
        return (
            <View style={styles.noInfo}>
                <Text style={styles.noInfoTxt}>Chưa có dữ liệu giao dịch</Text>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            {renderItems()}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 12
    },
    noInfo: {
        flex: 1,
        justifyContent: 'center'
    },
    noInfoTxt: {
        textAlign: 'center'
    },
    item: {
        flexDirection: 'row',
        height: 90,
        marginBottom: 12
    },
    image: {
        width: 120,
        height: 90,
        backgroundColor: "#eee"
    },
    description: {
        flex: 1,
        paddingLeft: 12,
        justifyContent: 'space-between'
    },
    title: {
        fontWeight: '500',
        fontSize: 13
    },
    price: {
        marginTop: 2,
        color: "#f93707",
        fontWeight: '500',
        fontSize: 13
    },
    owner: {
        marginTop: 2,
        color: "#777",
        fontSize: 13
    },
    status: {
        paddingVertical: 2,
        paddingHorizontal: 8
    }
})

export default TransactionItems;