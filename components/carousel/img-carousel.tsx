import { FunctionComponent } from "react";
import { Image, View } from "react-native";
// @ts-ignore
import { SliderBox } from "react-native-image-slider-box";

interface ImageCarouselProps {
    images: string[]
}

const ImageCarousel: FunctionComponent<ImageCarouselProps> = ({ images }) => {
    return (
        <SliderBox images={images} />
    );
}

export default ImageCarousel;