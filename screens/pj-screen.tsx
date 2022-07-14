import { useQuery } from "@apollo/client";
import { Fragment, useCallback, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import ProjectFilter from "../components/filters/pj-filter";
import PJBrowseHeader from "../components/headers/pj-browse-header";
import { ProjectItems } from "../components/items/project-items";
import { GetProjectsData, GetProjectsVars, GET_PROJECT_POSTS, ProjectFilterInterface } from "../graphql/queries/pj-list";
import { ProjectInterface } from "../types/interfaces/project";

function ProjectsScreen() {
    const [filter, setFilter] = useState<ProjectFilterInterface>()
    const [posts, setPosts] = useState<ProjectInterface[]>([])

    const { data, error } = useQuery<GetProjectsData, GetProjectsVars>(GET_PROJECT_POSTS, {
        variables: {
            filter
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

    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#ffb41f' }} />
            <SafeAreaView style={{ flex: 1 }}>
                <PJBrowseHeader />
                <ProjectFilter initialFilter={filter} onApplyFilter={onApplyFilter}/>
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