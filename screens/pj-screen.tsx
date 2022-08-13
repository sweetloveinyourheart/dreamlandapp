import { useQuery } from "@apollo/client";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Platform, SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import ProjectFilter from "../components/filters/pj-filter";
import PJBrowseHeader from "../components/headers/pj-browse-header";
import { ProjectItems } from "../components/items/project-items";
import { GetProjectsData, GetProjectsVars, GET_PROJECT_POSTS, ProjectFilterInterface } from "../graphql/queries/pj-list";
import { ProjectInterface } from "../types/interfaces/project";

function ProjectsScreen() {
    const [filter, setFilter] = useState<ProjectFilterInterface>()
    const [search, setSearch] = useState<string | undefined>()
    const [posts, setPosts] = useState<ProjectInterface[]>([])

    const { data, error } = useQuery<GetProjectsData, GetProjectsVars>(GET_PROJECT_POSTS, {
        variables: {
            filter,
            search
        },
        notifyOnNetworkStatusChange: true
    })

    useEffect(() => {
        if (data && !error) {
            setPosts(data.getProjects)
        }
    }, [data, error])

    const onApplyFilter = useCallback((filter: ProjectFilterInterface | undefined) => {
        setFilter(filter)
    }, [setFilter])

    const onSearch = useCallback((text: string) => {
        setSearch(text)
    }, [setSearch])

    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#ffb41f' }} />
            <SafeAreaView style={{
                flex: 1,
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
            }}>
                <PJBrowseHeader onSearch={onSearch} />
                <ProjectFilter 
                    initialFilter={filter} 
                    onApplyFilter={onApplyFilter}
                />
                <ScrollView>
                    <View style={{ padding: 12, backgroundColor: "#fff" }}>
                        <ProjectItems display={'vertical'} data={posts} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Fragment>
    );
}

export default ProjectsScreen;