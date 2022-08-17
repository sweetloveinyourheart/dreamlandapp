import { useLazyQuery } from "@apollo/client";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Platform, SafeAreaView, StatusBar, View } from "react-native";
import SearchHeader from "../components/headers/search-header";
import { RealEstateItem } from "../components/items/rs-items";
import Search from "../components/search/search";
import { AllPostsData, AllPostsVars, GET_ALL_POSTS } from "../graphql/queries/rs-list";
import { RealEstateCategory } from "../types/enums/realEstate";

function SearchScreen({ route }: any) {
    const [posts, setPosts] = useState<any>([])

    const [rsQuery, { data: rsData, error }] = useLazyQuery<AllPostsData, AllPostsVars>(GET_ALL_POSTS, {
        fetchPolicy: "network-only"
    })

    useEffect(() => {
        if(route.params?.category && route.params?.search) {
            rsQuery({
                variables: {
                    filter: {
                        category: route.params.category,
                    },
                    search: route.params.search
                }
            })
        }
    }, [route.params])

    useEffect(() => {        
        if (rsData) {
            setPosts([
                ...rsData.posts.apartments,
                ...rsData.posts.businessPremises,
                ...rsData.posts.houses,
                ...rsData.posts.lands,
                ...rsData.posts.motals
            ])
            return;
        }
    }, [rsData])

    const onSearch = useCallback((category: RealEstateCategory, search: string) => {
        rsQuery({
            variables: {
                filter: {
                    category
                },
                search
            }
        })
    }, [rsQuery])

    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#ffb41f' }} />
            <SafeAreaView style={{
                flex: 1
            }}>
                <SearchHeader />
                <View style={{ marginVertical: 8, paddingVertical: 0, backgroundColor: "#ffb41f", height: 48, paddingHorizontal: 12 }}>
                    <Search search={route.params?.search} category={route.params?.category} onSearch={onSearch} />
                </View>
                <View style={{ padding: 12, backgroundColor: "#fff", flex: 1 }}>
                    <RealEstateItem data={posts} display={"vertical"} />
                </View>
            </SafeAreaView>
        </Fragment>
    );
}

export default SearchScreen;