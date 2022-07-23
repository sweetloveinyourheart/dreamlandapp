import { useQuery } from "@apollo/client";
import { Fragment, useEffect, useState } from "react";
import { Platform, SafeAreaView, ScrollView, StatusBar } from "react-native";
import ImageCarousel from "../components/carousel/img-carousel";
import ProjectDetail from "../components/details/pj-detail";
import ProjectPostFooter from "../components/footer/pj-post-footer";
import ProjectHeader from "../components/headers/project-header";
import SpinnerLoading from "../components/loading/spinner";
import { GetProjectByDirectLinkData, GetProjectByDirectLinkVars, GET_PROJECT_BY_DIRECT_LINK } from "../graphql/queries/project";
import { ProjectInterface } from "../types/interfaces/project";

function ProjectScreen({ route }: any) {
    const { data, loading, error } = useQuery<GetProjectByDirectLinkData, GetProjectByDirectLinkVars>(GET_PROJECT_BY_DIRECT_LINK, {
        variables: {
            link: route.params.link
        }
    })

    const [project, setProject] = useState<ProjectInterface>()

    useEffect(() => {
        if(data) {
            setProject(data.project)
        }
    }, [data, error])

    if(loading || !project) {
        return <SpinnerLoading height={550}/>
    }

    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#ffb41f' }} />
            <SafeAreaView style={{
                flex: 1,
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
            }}>
                <ProjectHeader />
                <ScrollView style={{ flex: 1 }}>
                    <ImageCarousel images={project.media.images}/>
                    <ProjectDetail data={project}/>
                </ScrollView>
                <ProjectPostFooter data={project}/>
            </SafeAreaView>
        </Fragment>
    );
}

export default ProjectScreen;
