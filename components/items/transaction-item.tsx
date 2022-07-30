import { useLazyQuery, useQuery } from "@apollo/client";
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
import { GetProjectProductsByIdData, GET_PROJECT_PRODUCT_BY_ID } from "../../graphql/queries/project";
import { ProjectProduct } from "../../types/interfaces/project";


interface TransactionItemsProps {
    items: TransactionInterface[]
}

const RealEstate = ({ realEstate, status }: { realEstate: { itemId: string, itemType: string }, status: TransactionStatus }) => {
    const [post, setPost] = useState<Post & { directLink: string, owner: any }>()

    const [apartmentQuery, { data: apartmentData }] = useLazyQuery(GET_APARTMENT_BY_ID)
    const [houseQuery, { data: houseData }] = useLazyQuery(GET_HOUSE_BY_ID)
    const [landQuery, { data: landData }] = useLazyQuery(GET_LAND_BY_ID)
    const [premisesQuery, { data: premisesData }] = useLazyQuery(GET_BUSINESS_PREMISES_BY_ID)
    const [motalQuery, { data: motalData }] = useLazyQuery(GET_MOTAL_BY_ID)

    const navigation = useNavigation()

    useEffect(() => {
        switch (realEstate.itemType) {
            case "CanHo":
                apartmentQuery({
                    variables: {
                        id: realEstate.itemId
                    }
                })
                return;

            case "NhaO":
                houseQuery({
                    variables: {
                        id: realEstate.itemId
                    }
                })
                return;

            case "Dat":
                landQuery({
                    variables: {
                        id: realEstate.itemId
                    }
                })
                return;

            case "VanPhong":
                premisesQuery({
                    variables: {
                        id: realEstate.itemId
                    }
                })
                return;

            case "PhongTro":
                motalQuery({
                    variables: {
                        id: realEstate.itemId
                    }
                })
                return;

            default:
                return;
        }
    }, [realEstate])

    useEffect(() => {
        if (apartmentData && realEstate.itemType === "CanHo") {
            setPost(apartmentData.apartment)
        }

        if (houseData && realEstate.itemType === "NhaO") {
            setPost(houseData.house)
        }

        if (landData && realEstate.itemType === "Dat") {
            setPost(landData.land)
        }

        if (premisesData && realEstate.itemType === "VanPhong") {
            setPost(premisesData.businessPremises)
        }

        if (motalData && realEstate.itemType === "PhongTro") {
            setPost(motalData.motal)
        }
    }, [apartmentData, houseData, landData, premisesData, motalData])

    const onViewPost = useCallback((directLink: string, type: string) => {
        // @ts-ignore
        navigation.navigate('post-screen', { directLink, type: enumToTypename(type) })
    }, [navigation])

    if (!post) {
        return <SpinnerLoading height={90} />
    }

    return (
        <TouchableOpacity style={styles.item} onPress={() => onViewPost(post.directLink, realEstate.itemType)}>
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
                    <Text style={styles.owner}><Ant name="user" size={13} /> {post.owner.name}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {status === TransactionStatus.Locked
                        && (
                            <View style={[styles.status, { backgroundColor: "orange" }]}><Text style={{ fontSize: 12, color: "#fff" }}>Đã khoá</Text></View>
                        )
                    }
                    {status === TransactionStatus.DatCoc
                        && (
                            <View style={[styles.status, { backgroundColor: "#14a7fa" }]}><Text style={{ fontSize: 12, color: "#fff" }}>Đã đặt cọc</Text></View>
                        )
                    }
                    {status === TransactionStatus.BanGiao
                        && (
                            <View style={[styles.status, { backgroundColor: "green" }]}><Text style={{ fontSize: 12, color: "#fff" }}>Đã bàn giao</Text></View>
                        )
                    }
                    {status === TransactionStatus.Rejected
                        && (
                            <View style={[styles.status, { backgroundColor: "#f30606" }]}><Text style={{ fontSize: 12, color: "#fff" }}>Đã huỷ bỏ</Text></View>
                        )
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
}

const Project = ({ project, status }: { project: { itemId: string }, status: TransactionStatus }) => {
    const [product, setProduct] = useState<ProjectProduct | undefined>()

    const { data } = useQuery<GetProjectProductsByIdData>(GET_PROJECT_PRODUCT_BY_ID, {
        variables: {
            id: project.itemId
        }
    })

    useEffect(() => {
        if (data) {
            setProduct(data.product)
        }
    }, [data])

    if (!product) {
        return <SpinnerLoading height={90} />
    }

    return (
        <View style={styles.item}>
            <View style={styles.image}>
                <View style={styles.imageTxtContainer}>
                    <Text style={styles.imageTxt}>{product.code}</Text>
                </View>
            </View>
            <View style={styles.description}>
                <View>
                    <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{"Sản phẩm dự án"}</Text>
                    <NumberFormat
                        value={product.price}
                        displayType={'text'}
                        thousandSeparator={true}
                        // @ts-ignore
                        renderText={(value: any, props: any) => (<Text style={styles.price} {...props}>{moneyConverter(value)}</Text>)}
                    />
                    <Text style={styles.owner}><Ant name="infocirlceo" size={12} /> Diện tích: {product.totalAcreage}m²</Text>
                    <Text style={styles.owner}><Ant name="infocirlceo" size={12} /> Thổ cư: {product.usedAcreage}m²</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {status === TransactionStatus.Locked
                        && (
                            <View style={[styles.status, { backgroundColor: "orange" }]}><Text style={{ fontSize: 12, color: "#fff" }}>Đã khoá</Text></View>
                        )
                    }
                    {status === TransactionStatus.DatCoc
                        && (
                            <View style={[styles.status, { backgroundColor: "#14a7fa" }]}><Text style={{ fontSize: 12, color: "#fff" }}>Đã đặt cọc</Text></View>
                        )
                    }
                    {status === TransactionStatus.BanGiao
                        && (
                            <View style={[styles.status, { backgroundColor: "green" }]}><Text style={{ fontSize: 12, color: "#fff" }}>Đã bàn giao</Text></View>
                        )
                    }
                    {status === TransactionStatus.Rejected
                        && (
                            <View style={[styles.status, { backgroundColor: "#f30606" }]}><Text style={{ fontSize: 12, color: "#fff" }}>Đã huỷ bỏ</Text></View>
                        )
                    }
                </View>
            </View>
        </View>
    )
}

const TransactionItems: FunctionComponent<TransactionItemsProps> = ({ items }) => {

    const renderItems = () => {
        return items.map((item, index) => {
            if (item.realEstate)
                return <RealEstate realEstate={item.realEstate} status={item.status} key={index} />

            if (item.project)
                return <Project project={item.project} status={item.status} key={index} />;

            return;
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
    imageTxtContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    imageTxt: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 18,
        color: "#f30606"
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