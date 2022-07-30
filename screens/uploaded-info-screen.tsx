import { useQuery } from "@apollo/client";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Platform, SafeAreaView, StatusBar, View } from "react-native";
import UploadedHeader from "../components/headers/uploaded-header";
import { RealEstateItem } from "../components/items/rs-items";
import UploadedMenu from "../components/menu/uploaded-menu";
import { GET_UPLOADED_POSTS, UploadedData, UploadedVars } from "../graphql/queries/uploaded";
import { PostStatus } from "../types/enums/realEstate";

function UploadedInfoScreen() {
    const [posts, setPosts] = useState<any>([])
    const [status, setStatus] = useState<PostStatus>(PostStatus.Pending)

    const { data, refetch } = useQuery<UploadedData, UploadedVars>(GET_UPLOADED_POSTS, {
        variables: {
            status
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
            setPosts([
                ...data.posts.apartments,
                ...data.posts.houses,
                ...data.posts.lands,
                ...data.posts.businessPremises,
                ...data.posts.motals
            ])
        }
    }, [data])

    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#ffb41f' }} />
            <SafeAreaView style={{
                flex: 1,
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
            }}>
                <UploadedHeader onReload={() => reload()} />
                <UploadedMenu onChangeMenu={onSelectMenu} status={status} />
                <View style={{ padding: 12, backgroundColor: "#fff", flex: 1 }}>
                    <RealEstateItem data={posts} display={"column"} />
                </View>
            </SafeAreaView>
        </Fragment>
    );
}

export default UploadedInfoScreen;