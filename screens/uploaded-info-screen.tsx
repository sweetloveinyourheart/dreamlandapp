import { useQuery } from "@apollo/client";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Platform, SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import UploadedHeader from "../components/headers/uploaded-header";
import { RealEstateItem } from "../components/items/rs-items";
import UploadedMenu from "../components/menu/uploaded-menu";
import { GET_UPLOADED_POSTS, UploadedData, UploadedVars } from "../graphql/queries/uploaded";
import { PostStatus } from "../types/enums/realEstate";
import { PaginationFilter } from "../types/interfaces/realEstate";
import { isCloseToBottom } from "./rs-screen";

const STEP = 30

function UploadedInfoScreen() {
    const [posts, setPosts] = useState<any>([])

    const [paging, setPaging] = useState<PaginationFilter>({
        cursor: 0,
        limit: STEP
    })
    const [status, setStatus] = useState<PostStatus>(PostStatus.Pending)

    const [canFetchMore, setCanFetchMore] = useState<boolean>(true)

    const { data, refetch } = useQuery<UploadedData, UploadedVars>(GET_UPLOADED_POSTS, {
        variables: {
            status,
            paging
        },
        fetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true
    })

    const reload = useCallback(() => {
        refetch()
    }, [refetch])

    const onSelectMenu = useCallback((stack: PostStatus) => {
        setStatus(stack)
    }, [setStatus])

    useEffect(() => {
        if (data) {
            const newData = [
                ...data.posts.apartments,
                ...data.posts.businessPremises,
                ...data.posts.houses,
                ...data.posts.lands,
                ...data.posts.motals
            ]
            setPosts(newData)
            
            if (newData.length !== paging.limit * STEP) setCanFetchMore(false)
        }
    }, [data])

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
                <UploadedHeader onReload={() => reload()} />
                <UploadedMenu onChangeMenu={onSelectMenu} status={status} />
                <ScrollView
                    onScroll={({ nativeEvent }) => {
                        if (isCloseToBottom(nativeEvent)) {
                            onLoadMore()
                        }
                    }}
                    scrollEventThrottle={400}
                    style={{ padding: 12, backgroundColor: "#fff", flex: 1 }}
                >
                    <RealEstateItem data={posts} display={"column"} />
                </ScrollView>
            </SafeAreaView>
        </Fragment>
    );
}

export default UploadedInfoScreen;