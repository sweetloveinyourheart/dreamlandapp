import { FunctionComponent } from "react";
import { Image, Modal, Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import Ant from 'react-native-vector-icons/AntDesign'
// @ts-ignore
import { SliderBox } from "react-native-image-slider-box";

interface ImageModalProps {
    selectedIndex: number
    images: string[]
    active: boolean
    onClose: () => void
}

const ImageModal: FunctionComponent<ImageModalProps> = ({ selectedIndex, active, onClose, images }) => {
    return (
        <Modal
            visible={active}
            onRequestClose={onClose}
            transparent
        >
            <SafeAreaView style={{ flex: 0, backgroundColor: "#000" }} />
            <SafeAreaView style={styles.view}>
                <View style={styles.container} >
                    <View style={styles.header}>
                        <Pressable style={{ width: 28 }} onPress={() => onClose()}>
                            <Ant name={'close'} size={28} color="#fff" />
                        </Pressable>
                    </View>
                    <View style={styles.image}>
                        <SliderBox
                            images={images}
                            sliderBoxHeight={"100%"}
                            resizeMode="contain"
                            firstItem={selectedIndex}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: "#000"
    },
    header: {
        paddingVertical: 12,
        paddingHorizontal: 12
    },
    image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ImageModal;