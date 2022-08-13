import { useQuery } from "@apollo/client";
import { FunctionComponent, useEffect, useState } from "react";
import { ActivityIndicator, Image, Linking, Pressable, StyleSheet, View } from "react-native";
import { GET_PAGE_TEMPLATE, PageTemplateData } from "../../graphql/queries/home";
import SpinnerLoading from "../loading/spinner";

interface BannerProps {

}

const Banner: FunctionComponent<BannerProps> = () => {
    const { data, loading, error } = useQuery<PageTemplateData, { pageName: string }>(GET_PAGE_TEMPLATE, {
        variables: {
            pageName: 'introduction'
        }
    })

    const [banner, setBanner] = useState<{ imgUrl: string, directLink: string | null }>()

    useEffect(() => {
        if (data && !error) {
            setBanner(data.template.banner)
        }
    }, [data, error])

    const onPress = async () => {
        if(!banner || !banner.directLink) return;

        const supported = await Linking.canOpenURL(banner.directLink);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(banner.directLink);
        }
    }

    if (loading) {
        return <SpinnerLoading height={150} />
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.press} onPress={onPress}>
                {banner
                    && (
                        <Image
                            source={{
                                uri: banner.imgUrl
                            }}
                            style={styles.image}
                        />
                    )
                }
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eee",
        height: 150
    },
    press: {
        height: 150
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'contain'
    }
})

export default Banner;