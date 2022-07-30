import { useLazyQuery } from "@apollo/client";
import { Fragment, useCallback, useEffect, useState } from "react";
import { NativeScrollEvent, Platform, SafeAreaView, ScrollView, StatusBar, View } from "react-native";
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
import { PaginationFilter } from "../types/interfaces/realEstate";

export const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};

const STEP = 30

function RealEstateScreen({ route }: any) {
    const [filter, setFilter] = useState<RsFilterInterface>({
        category: RSCategory.MuaBan
    })
    const [paging, setPaging] = useState<PaginationFilter>({
        cursor: 0,
        limit: STEP
    })
    const [canFetchMore, setCanFetchMore] = useState<boolean>(true)

    const [dataDisplay, setDataDisplay] = useState<'vertical' | 'column'>('column')

    const [postsType, setPostsType] = useState<RealEstateType | undefined>()

    const [posts, setPosts] = useState<any>([])

    const [rsQuery, { data: rsData }] = useLazyQuery<AllPostsData, AllPostsVars>(GET_ALL_POSTS, {
        variables: {
            filter,
            paging
        },
        fetchPolicy: "network-only"
    })

    const [apartmentQuery, { data: apartmentData }] = useLazyQuery<ApartmentPostData, ApartmentPostVars>(GET_APARTMENT_POSTS, {
        variables: {
            filter,
            paging
        },
        fetchPolicy: "network-only"
    })

    const [houseQuery, { data: houseData }] = useLazyQuery<HousePostData, HousePostVars>(GET_HOUSE_POSTS, {
        variables: {
            filter,
            paging
        },
        fetchPolicy: "network-only"
    })

    const [landQuery, { data: landData }] = useLazyQuery<LandPostData, LandPostVars>(GET_LAND_POSTS, {
        variables: {
            filter,
            paging
        },
        fetchPolicy: "network-only"
    })

    const [premisesQuery, { data: premisesData }] = useLazyQuery<BusinessPremisesPostData, BusinessPremisesPostVars>(GET_BUSINESS_PREMISES_POSTS, {
        variables: {
            filter,
            paging
        },
        fetchPolicy: "network-only"
    })

    const [motalQuery, { data: motalData }] = useLazyQuery<MotalPostsData, MotalPostsVars>(GET_MOTAL_POSTS, {
        variables: {
            filter,
            paging
        },
        fetchPolicy: "network-only"
    })

    useEffect(() => {
        setFilter(prevS => ({
            ...prevS,
            ...(route.params?.category && { category: route.params.category }),
            ...(route.params?.project && { project: route.params.project })
        }))
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
            const newData = [
                ...rsData.posts.apartments,
                ...rsData.posts.businessPremises,
                ...rsData.posts.houses,
                ...rsData.posts.lands,
                ...rsData.posts.motals
            ]
            if (newData.length !== paging.limit * STEP) setCanFetchMore(false)

            setPosts(newData)
            return;
        }

        if (apartmentData && postsType === RealEstateType.CanHo) {
            const newData = apartmentData.apartments
            if (newData.length !== paging.limit * STEP) setCanFetchMore(false)

            setPosts(newData)
            return;
        }

        if (houseData && postsType === RealEstateType.NhaO) {
            const newData = houseData.houses
            if (newData.length !== paging.limit * STEP) setCanFetchMore(false)

            setPosts(newData)
            return;
        }

        if (landData && postsType === RealEstateType.Dat) {
            const newData = landData.lands
            if (newData.length !== paging.limit * STEP) setCanFetchMore(false)

            setPosts(newData)
            return;
        }

        if (premisesData && postsType === RealEstateType.VanPhong) {
            const newData = premisesData.businessPremises
            if (newData.length !== paging.limit * STEP) setCanFetchMore(false)

            setPosts(newData)
            return;
        }

        if (motalData && postsType === RealEstateType.PhongTro) {
            const newData = motalData.motals
            if (newData.length !== paging.limit * STEP) setCanFetchMore(false)

            setPosts(newData)
            return;
        }

    }, [rsData, apartmentData, houseData, landData, premisesData, motalData])

    const onChangeDisplay = useCallback(() => {
        setDataDisplay(dataDisplay === 'column' ? 'vertical' : 'column')
    }, [dataDisplay])

    const onApplyFilter = useCallback((filter: RsFilterInterface) => {
        setPaging(s => ({
            ...s,
            limit: STEP
        }))
        setFilter(filter)
    }, [setFilter])

    const onChangeType = useCallback((type: RealEstateType | undefined) => {
        setPaging(s => ({
            ...s,
            limit: STEP
        }))
        setFilter(prevState => ({
            category: prevState.category
        }))
        setPostsType(type)
        setCanFetchMore(true)
    }, [setPaging, setFilter, setPostsType])

    const onLoadMore = () => {
        if (canFetchMore)
            setPaging(s => ({
                ...s,
                limit: s.limit + STEP
            }))
    }

    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#ffb41f' }} />
            <SafeAreaView style={{
                flex: 1,
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
            }}>
                <BrowseHeader />
                <RealEstateFilter
                    type={postsType}
                    onChangeDisplay={onChangeDisplay}
                    display={dataDisplay}
                    initialFilter={filter}
                    onApplyFilter={onApplyFilter}
                    onChangeType={onChangeType}
                />
                <ScrollView
                    onScroll={({ nativeEvent }) => {
                        if (isCloseToBottom(nativeEvent)) {
                            onLoadMore()
                        }
                    }}
                    scrollEventThrottle={400}
                    style={{
                        flex: 1
                    }}
                >
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