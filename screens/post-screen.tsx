import { useLazyQuery, useQuery } from "@apollo/client";
import { Fragment, useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView } from "react-native";
import ImageCarousel from "../components/carousel/img-carousel";
import RSDetail from "../components/details/rs-detail";
import RSPostFooter from "../components/footer/rs-post-footer";
import PostHeader from "../components/headers/rs-post-header";
import {
    GET_APARTMENT_POST_BY_DIRECT_LINK,
    GET_BUSINESS_PREMISES_POST_BY_DIRECT_LINK,
    GET_HOUSE_POST_BY_DIRECT_LINK,
    GET_LAND_POST_BY_DIRECT_LINK,
    GET_MOTAL_POST_BY_DIRECT_LINK
} from "../graphql/queries/posts";

const itemImg = require('../assets/test/item1.jpg')
const itemImg2 = require('../assets/test/items1.jpg')

function RSPostScreen({ route }: { route: any }) {
    const [data, setData] = useState<any>()

    const [apartmentQuery, { data: apartmentData }] = useLazyQuery(GET_APARTMENT_POST_BY_DIRECT_LINK)
    const [houseQuery, { data: houseData }] = useLazyQuery(GET_HOUSE_POST_BY_DIRECT_LINK)
    const [landQuery, { data: landData }] = useLazyQuery(GET_LAND_POST_BY_DIRECT_LINK)
    const [businessPremisesQuery, { data: businessPremisesData }] = useLazyQuery(GET_BUSINESS_PREMISES_POST_BY_DIRECT_LINK)
    const [motalQuery, { data: motalData }] = useLazyQuery(GET_MOTAL_POST_BY_DIRECT_LINK)

    useEffect(() => {
        const { directLink, type } = route.params

        switch (type) {
            case "Apartment":
                apartmentQuery({
                    variables: {
                        link: directLink
                    }
                })
                return;

            case "House":
                houseQuery({
                    variables: {
                        link: directLink
                    }
                })
                return;

            case "Land":
                landQuery({
                    variables: {
                        link: directLink
                    }
                })
                return;

            case "BusinessPremises":
                businessPremisesQuery({
                    variables: {
                        link: directLink
                    }
                })
                return;

            case "Motal":
                motalQuery({
                    variables: {
                        link: directLink
                    }
                })
                return;

            default:
                return;
        }
    }, [route.params])

    useEffect(() => {
        if (apartmentData) {
            setData(apartmentData.apartment)
            return;
        }
        if (houseData) {
            setData(houseData.house)
            return;
        }
        if (landData) {
            setData(landData.land)
            return;
        }
        if (businessPremisesData) {
            setData(businessPremisesData.businessPremises)
            return;
        }
        if (motalData) {
            setData(motalData.motal)
            return;
        }
    }, [apartmentData, houseData, landData, businessPremisesData, motalData])

    if (!data) {
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator />
            </SafeAreaView>
        )
    }

    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#ffb41f' }} />
            <SafeAreaView style={{ flex: 1 }}>
                <PostHeader />
                <ScrollView style={{ flex: 1 }}>
                    <ImageCarousel images={data.media?.images ?? []} />
                    <RSDetail data={data} type={route.params.type}/>
                </ScrollView>
                <RSPostFooter data={data} type={route.params.type}/>
            </SafeAreaView>
        </Fragment>
    );
}

export default RSPostScreen;