import { useQuery } from "@apollo/client";
import { Fragment, FunctionComponent, useCallback, useEffect, useState } from "react";
import { Platform, RefreshControl, SafeAreaView, ScrollView, StatusBar } from "react-native";
import Banner from "../components/banner/banner";
import HomeCategory from "../components/categories/home-category";
import Header from "../components/headers/header";
import OutstandingItems from "../components/items/outstanding-item";
import ProjectItems from "../components/items/project-items";
import RealEstateItems from "../components/items/rs-items";
import { GetOutstandingPostData, GET_OUTSTANDING_POSTS, GET_TOP_POSTS_QUERY, GET_TOP_PROJECTS_QUERY, TopPostsResult, TopProjectsResult } from "../graphql/queries/home";
import { RealEstateCategory } from "../types/enums/realEstate";
import { ProjectInterface } from "../types/interfaces/project";

interface HomeScreenProps { }

const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const HomeScreen: FunctionComponent<HomeScreenProps> = () => {
    const [projects, setProjects] = useState<ProjectInterface[]>([])
    const [sellingPosts, setSellingPosts] = useState<any>([])
    const [rentingPosts, setRentingPosts] = useState<any>([])
    const [outstandingPosts, setOutstandingPosts] = useState<any>([])

    const [refreshing, setRefreshing] = useState(false);

    const projectsQueryResult = useQuery<TopProjectsResult>(GET_TOP_PROJECTS_QUERY)
    const topPostsResult = useQuery<TopPostsResult>(GET_TOP_POSTS_QUERY)
    const outstandingPostsResult = useQuery<GetOutstandingPostData>(GET_OUTSTANDING_POSTS)

    useEffect(() => {
        if (projectsQueryResult.data) {
            setProjects(projectsQueryResult.data.projects)
        }
    }, [projectsQueryResult.data])

    useEffect(() => {
        if (topPostsResult.data && !topPostsResult.error) {
            const { sellingPosts, rentingPosts } = topPostsResult.data
            setSellingPosts([...sellingPosts.apartments, ...sellingPosts.houses, ...sellingPosts.lands])
            setRentingPosts([...rentingPosts.apartments, ...rentingPosts.houses, ...rentingPosts.lands])
        }
    }, [topPostsResult.data, topPostsResult.error])

    useEffect(() => {
        if (outstandingPostsResult.data && !outstandingPostsResult.error) {
            const { apartments, houses, lands, businessPremises, motals } = outstandingPostsResult.data.posts
            setOutstandingPosts([...apartments, ...houses, ...lands, ...businessPremises, ...motals])
        }
    }, [outstandingPostsResult.data, outstandingPostsResult.error])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => {
            projectsQueryResult.refetch()
            topPostsResult.refetch()
            outstandingPostsResult.refetch()
            setRefreshing(false)
        });
    }, [])

    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#ffb41f' }} />
            <SafeAreaView style={{
                flex: 1,
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
            }}>
                <Header />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={(refreshing)}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <Banner />
                    <HomeCategory />
                    <RealEstateItems category={RealEstateCategory.ChoThue} data={rentingPosts} loading={topPostsResult.loading} title="Bất động sản cho thuê" />
                    <RealEstateItems category={RealEstateCategory.MuaBan} data={sellingPosts} loading={topPostsResult.loading} title="Mua bán bất động sản" />
                    <OutstandingItems data={outstandingPosts} loading={outstandingPostsResult.loading} />
                    <ProjectItems data={projects} loading={projectsQueryResult.loading} />
                </ScrollView>
            </SafeAreaView>
        </Fragment>
    );
}

export default HomeScreen;