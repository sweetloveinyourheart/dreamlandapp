import { Dispatch, FunctionComponent, SetStateAction, useCallback, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { cameraIcon } from "../../../constants/images";
import * as ImagePicker from 'expo-image-picker';

export interface UploadedImage { height: number, type: string, uri: string, width: number, base64: string }

interface ImageUploadProps {
    images: UploadedImage[]
    setImages: Dispatch<SetStateAction<UploadedImage[]>>
}

const ImageUpload: FunctionComponent<ImageUploadProps> = ({ images, setImages }) => {

    const onSelectImage = useCallback(async () => {
        let result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        if (!result.cancelled) {
            setImages(s => ([...s, result]));
        }
    }, [setImages])

    const showImages = () => {
        return images.map((image, index) => {
            return (
                <View key={index} style={{ marginRight: 12 }}>
                    <Image
                        source={{ uri: image.uri }}
                        style={{ width: 200, height: 150 }}
                    />
                </View>
            )
        })
    }

    return (
        <View>
            <ScrollView horizontal style={{ marginBottom: 12 }}>
                {showImages()}
            </ScrollView>
            <TouchableOpacity style={styles.uploadBtn} onPress={() => onSelectImage()}>
                <View>
                    <Image
                        source={cameraIcon}
                        style={{
                            width: 64,
                            height: 64
                        }}
                    />
                </View>
                <Text>Đăng tối đa 10 hình, tỉ lệ (4:3)</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    uploadBtn: {
        alignItems: 'center',
        paddingVertical: 24,
        paddingHorizontal: 24,
        borderRadius: 8,
        backgroundColor: "#eee",
        borderWidth: 1,
        borderColor: "#777"
    }
})

export default ImageUpload;