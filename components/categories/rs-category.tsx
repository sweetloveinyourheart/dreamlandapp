import { FunctionComponent } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { apartmentLogo, houseLogo, landLogo, motalLogo, premisesLogo } from "../../constants/images";
import { RealEstateCategory as RsCategory, RealEstateType } from "../../types/enums/realEstate";

interface RealEstateCategoryProps {
    category: RsCategory
    type: RealEstateType | undefined
    onChangeType: (type: RealEstateType | undefined) => void
}

const RealEstateCategory: FunctionComponent<RealEstateCategoryProps> = ({ type, onChangeType, category }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.category]}
                onPress={() => onChangeType(type === RealEstateType.CanHo ? undefined : RealEstateType.CanHo)}
            >
                <View style={[styles.icon, { backgroundColor: type === RealEstateType.CanHo ? "#ffb41f" : "#eee" }]}>
                    <Image
                        source={apartmentLogo}
                        style={styles.image}
                    />
                </View>
                <Text style={styles.text}>Căn hộ/Chung cư</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.category]}
                onPress={() => onChangeType(type === RealEstateType.NhaO ? undefined : RealEstateType.NhaO)}
            >
                <View style={[styles.icon, { backgroundColor: type === RealEstateType.NhaO ? "#ffb41f" : "#eee" }]}>
                    <Image
                        source={houseLogo}
                        style={styles.image}
                    />
                </View>
                <Text style={styles.text}>Nhà ở</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.category]}
                onPress={() => onChangeType(type === RealEstateType.Dat ? undefined : RealEstateType.Dat)}
            >
                <View style={[styles.icon, { backgroundColor: type === RealEstateType.Dat ? "#ffb41f" : "#eee" }]}>
                    <Image
                        source={landLogo}
                        style={styles.image}
                    />
                </View>
                <Text style={styles.text}>Đất đai</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.category]}
                onPress={() => onChangeType(type === RealEstateType.VanPhong ? undefined : RealEstateType.VanPhong)}
            >
                <View style={[styles.icon, { backgroundColor: type === RealEstateType.VanPhong ? "#ffb41f" : "#eee" }]}>
                    <Image
                        source={premisesLogo}
                        style={styles.image}
                    />
                </View>
                <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">Văn phòng/Mặt bằng</Text>
            </TouchableOpacity>
            {category === RsCategory.ChoThue
                && (
                    <TouchableOpacity
                        style={[styles.category]}
                        onPress={() => onChangeType(type === RealEstateType.PhongTro ? undefined : RealEstateType.PhongTro)}
                    >
                        <View style={[styles.icon, { backgroundColor: type === RealEstateType.PhongTro ? "#ffb41f" : "#eee" }]}>
                            <Image
                                source={motalLogo}
                                style={styles.image}
                            />
                        </View>
                        <Text style={styles.text}>Nhà trọ</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 12,
        marginVertical: 8,
        flexDirection: 'row'
    },
    category: {
        flex: 0.2,
        alignItems: 'center'
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

export default RealEstateCategory;