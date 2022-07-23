import { FunctionComponent, useCallback } from "react";
import { Image, Pressable, ScrollView, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { ProjectInterface } from "../../types/interfaces/project";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useLinkTo, useNavigation } from "@react-navigation/native";
import SpinnerLoading from "../loading/spinner";
import NumberFormat from "react-number-format";
import { moneyConverter } from "../../libs/moneyConverter";

interface ProjectViewProps {
    data: ProjectInterface[],
    loading: boolean
}

export const ProjectItems: FunctionComponent<{ data: ProjectInterface[], display: 'horizontal' | 'vertical' }> = ({ data, display }) => {
    const navigation = useNavigation();

    const getItemStyles = useCallback((): StyleProp<ViewStyle> => {

        if (display === 'vertical') {
            return {
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 12,
                flex: 1
            }
        }

        return styles.item
    }, [display])

    const renderData = () => {
        return data.map((project, index) => {
            return (
                <TouchableOpacity
                    key={index}
                    style={getItemStyles()}
                    // @ts-ignore
                    onPress={() => navigation.navigate('project-screen', { link: project.directLink })}
                >
                    <View style={{ flex: display === 'vertical' ? 0.4 : 1, backgroundColor: "#eee" }}>
                        <Image
                            source={{ uri: project.media.images[0] }}
                            style={display === 'vertical' ? { flex: 1, width: undefined, height: undefined, resizeMode: 'contain' } : styles.image}
                        />
                    </View>
                    <View style={{ flex: display === 'vertical' ? 0.6 : 1, paddingLeft: display === 'vertical' ? 12 : 0 }}>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.name}>{project.projectName}</Text>
                        <Text style={styles.price}>
                            <NumberFormat
                                value={project.information.purchaseInfo ?? 0}
                                className="foo"
                                displayType={'text'}
                                thousandSeparator={true}
                                // @ts-ignore
                                renderText={(value: any, props: any) => (<Text {...props}>{moneyConverter(value)}</Text>)}
                            />
                        </Text>
                        <Text style={styles.address} numberOfLines={1} ellipsizeMode='tail'>
                            <Ionicons name="ios-location-outline" size={16} /> {project.address.district} - {project.address.province}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        })
    }

    return (
        <ScrollView horizontal={display === 'horizontal' ? true : false}>
            <View style={{ flexDirection: display === 'vertical' ? 'column' : 'row' }}>
                {renderData()}
            </View>
        </ScrollView>
    )
}

const ProjectView: FunctionComponent<ProjectViewProps> = ({ data, loading }) => {
    const linkTo = useLinkTo()

    if (loading) {
        return <SpinnerLoading height={250} />
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dự án bất động sản</Text>
            {data.length === 0
                ? (
                    <View style={styles.noItems}>
                        <Text style={styles.noItemsTxt}>Chưa có dự án hiển thị</Text>
                    </View>
                )
                : <ProjectItems data={data} display="horizontal" />
            }
            <View style={styles.moreArea}>
                <Pressable onPress={() => linkTo('/pj-screen')}>
                    <Text style={styles.moreTxt}> Xem thêm dự án </Text>
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
        width: 225,
        marginRight: 16
    },
    image: {
        width: 225,
        height: 126,
        borderRadius: 4
    },
    name: {
        marginTop: 8,
        fontWeight: '500',
        fontSize: 15
    },
    address: {
        marginTop: 8,
        color: "#777"
    },
    price: {
        color: "#f93707",
        fontWeight: '500',
        marginTop: 4
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

export default ProjectView;