import { useQuery } from "@apollo/client";
import { FunctionComponent, useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
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

    const [banner, setBanner] = useState<string | undefined>()

    useEffect(() => {
        if (data && !error) {
            setBanner(data.template.banner)
        }
    }, [data, error])

    if (loading) {
        return <SpinnerLoading height={150}/>
    }

    return (
        <View style={styles.container}>
            {banner
                && (
                    <Image
                        source={{
                            uri: banner
                        }}
                        style={styles.image}
                    />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eee",
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