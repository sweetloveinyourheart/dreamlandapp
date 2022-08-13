import { FunctionComponent, useCallback, useState } from "react";
import { Image, View } from "react-native";
// @ts-ignore
import { SliderBox } from "react-native-image-slider-box";
import ImageModal from "./modal/image";

interface ImageCarouselProps {
    images: string[]
}

const ImageCarousel: FunctionComponent<ImageCarouselProps> = ({ images }) => {
    const [imageModalActive, setImageModalActive] = useState<boolean>(false)
    const [selectedImage, setSelectedImage] = useState<number>(0)

    const onCloseImageModal = useCallback(() => {
        setImageModalActive(false)
    }, [imageModalActive])

    const onImgPress = (index: number) => {
        setSelectedImage(index)
        setImageModalActive(true)
    }

    return (
        <View>
            <SliderBox
                images={images}
                onCurrentImagePressed={(index: number) => onImgPress(index)}
            />
            {imageModalActive
                && <ImageModal selectedIndex={selectedImage} images={images} onClose={onCloseImageModal} active={imageModalActive} />
            }
        </View>
    );
}

export default ImageCarousel;