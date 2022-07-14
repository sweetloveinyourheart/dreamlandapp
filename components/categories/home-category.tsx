import { useNavigation } from "@react-navigation/native";
import { FunctionComponent } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { projectImage, rentingImage, sellingImage } from "../../constants/images";

interface HomeCategoryProps {

}

const HomeCategory: FunctionComponent<HomeCategoryProps> = () => {
    const navigation = useNavigation()

    return (
        <View style={style.container}>
            <Text style={style.title}>Danh mục bất động sản</Text>
            <View style={style.categories}>
                <TouchableOpacity 
                    style={style.category}
                    // @ts-ignore
                    onPress={() => navigation.navigate('rs-screen', { category: 'MuaBan' })}
                >
                    <View style={style.icon}>
                        <Image
                            source={sellingImage}
                            style={style.image}
                        />
                    </View>
                    <Text style={style.text}>Mua bán</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={style.category}
                    // @ts-ignore
                    onPress={() => navigation.navigate('rs-screen', { category: 'ChoThue' })}
                >
                    <View style={style.icon}>
                        <Image
                            source={rentingImage}
                            style={style.image}
                        />
                    </View>
                    <Text style={style.text}>Cho Thuê</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={style.category}
                    // @ts-ignore
                    onPress={() => navigation.navigate('pj-screen')}
                >
                    <View style={style.icon}>
                        <Image
                            source={projectImage}
                            style={style.image}
                        />
                    </View>
                    <Text style={style.text}>Dự án</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
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
    categories: {
        flexDirection: 'row',
        flex: 1
    },
    category: {
        flex: 0.25,
    },
    icon: {
        width: 56,
        height: 56,
        padding: 8,
        backgroundColor: "#eee",
        borderRadius: 12
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'contain'
    },
    text: {
        marginTop: 8,
        width: 60,
        textAlign: 'center',
        fontSize: 13
    }
})

export default HomeCategory;