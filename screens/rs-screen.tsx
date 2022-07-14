import { useLazyQuery } from "@apollo/client";
import { Fragment, useCallback, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import RealEstateCategory from "../components/categories/rs-category";
import RealEstateFilter from "../components/filters/rs-filter";
import BrowseHeader from "../components/headers/rs-browse-header";
import { RealEstateItem } from "../components/items/rs-items";
import {
    AllPostsData,
    AllPostsVars,
    ApartmentPostData,
    ApartmentPostVars,
    BusinessPremisesPostData,
    BusinessPremisesPostVars,
    GET_ALL_POSTS, GET_APARTMENT_POSTS,
    GET_BUSINESS_PREMISES_POSTS,
    GET_HOUSE_POSTS,
    GET_LAND_POSTS,
    GET_MOTAL_POSTS,
    HousePostData,
    HousePostVars,
    LandPostData,
    LandPostVars,
    MotalPostsData,
    MotalPostsVars,
    RsFilterInterface
} from "../graphql/queries/rs-list";
import { RealEstateCategory as RSCategory, RealEstateType } from "../types/enums/realEstate";

function RealEstateScreen({ route }: any) {
    const [filter, setFilter] = useState<RsFilterInterface>({
        category: RSCategory.MuaBan
    })

    const [dataDisplay, setDataDisplay] = useState<'vertical' | 'column'>('column')

    const [postsType, setPostsType] = useState<RealEstateType | undefined>()

    const [posts, setPosts] = useState<any>([])

    const [rsQuery, { data: rsData }] = useLazyQuery<AllPostsData, AllPostsVars>(GET_ALL_POSTS, {
        variables: {
            filter
        },
        fetchPolicy: "network-only"
    })

    const [apartmentQuery, { data: apartmentData }] = useLazyQuery<ApartmentPostData, ApartmentPostVars>(GET_APARTMENT_POSTS, {
        variables: {
            filter
        },
        fetchPolicy: "network-only"
    })

    const [houseQuery, { data: houseData }] = useLazyQuery<HousePostData, HousePostVars>(GET_HOUSE_POSTS, {
        variables: {
            filter
        },
        fetchPolicy: "network-only"
    })

    const [landQuery, { data: landData }] = useLazyQuery<LandPostData, LandPostVars>(GET_LAND_POSTS, {
        variables: {
            filter
        },
        fetchPolicy: "network-only"
    })

    const [premisesQuery, { data: premisesData }] = useLazyQuery<BusinessPremisesPostData, BusinessPremisesPostVars>(GET_BUSINESS_PREMISES_POSTS, {
        variables: {
            filter
        },
        fetchPolicy: "network-only"
    })

    const [motalQuery, { data: motalData }] = useLazyQuery<MotalPostsData, MotalPostsVars>(GET_MOTAL_POSTS, {
        variables: {
            filter
        },
        fetchPolicy: "network-only"
    })

    useEffect(() => {
        if (route.params?.category) {
            setFilter(prevS => ({
                ...prevS,
                category: route.params.category
            }))
        }

        if (route.params?.project) {
            setFilter(prevS => ({
                ...prevS,
                project: route.params.project
            }))
        }
    }, [route.params])

    useEffect(() => {
        switch (postsType) {
            case RealEstateType.CanHo:
                apartmentQuery()
                return;

            case RealEstateType.NhaO:
                houseQuery()
                return;

            case RealEstateType.Dat:
                landQuery()
                return;

            case RealEstateType.VanPhong:
                premisesQuery()
                return;

            case RealEstateType.PhongTro:
                motalQuery()
                return;

            default:
                rsQuery()
                return;
        }
    }, [postsType])

    useEffect(() => {
        if (rsData && postsType === undefined) {
            setPosts([
                ...rsData.posts.apartments,
                ...rsData.posts.businessPremises,
                ...rsData.posts.houses,
                ...rsData.posts.lands,
                ...rsData.posts.motals
            ])
            return;
        }

        if (apartmentData && postsType === RealEstateType.CanHo) {
            setPosts(apartmentData.apartments)
            return;
        }

        if (houseData && postsType === RealEstateType.NhaO) {
            setPosts(houseData.houses)
            return;
        }

        if (landData && postsType === RealEstateType.Dat) {
            setPosts(landData.lands)
            return;
        }

        if (premisesData && postsType === RealEstateType.VanPhong) {
            setPosts(premisesData.businessPremises)
            return;
        }

        if (motalData && postsType === RealEstateType.PhongTro) {
            setPosts(motalData.motals)
            return;
        }

    }, [rsData, apartmentData, houseData, landData, premisesData, motalData, postsType])

    const onChangeDisplay = useCallback(() => {
        setDataDisplay(dataDisplay === 'column' ? 'vertical' : 'column')
    }, [dataDisplay])

    const onApplyFilter = useCallback((filter: RsFilterInterface) => {
        setFilter(filter)
    }, [setFilter])

    const onChangeType = useCallback((type: RealEstateType | undefined) => {
        setFilter(prevState => ({
            category: prevState.category
        }))
        setPostsType(type)
    }, [postsType, filter])

    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#ffb41f' }} />
            <SafeAreaView style={{ flex: 1 }}>
                <BrowseHeader />
                <RealEstateFilter
                    type={postsType}
                    onChangeDisplay={onChangeDisplay}
                    display={dataDisplay}
                    initialFilter={filter}
                    onApplyFilter={onApplyFilter}
                    onChangeType={onChangeType}
                />
                <ScrollView>
                    <RealEstateCategory category={filter.category} type={postsType} onChangeType={onChangeType} />
                    <View style={{ padding: 12, backgroundColor: "#fff" }}>
                        <RealEstateItem data={posts} display={dataDisplay} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Fragment>
    );
}

export default RealEstateScreen;