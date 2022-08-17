import { useLazyQuery, useQuery } from "@apollo/client";
import { Fragment, useEffect, useState } from "react";
import { Platform, SafeAreaView, ScrollView, StatusBar } from "react-native";
import ImageCarousel from "../components/carousel/img-carousel";
import ProjectDetail from "../components/details/pj-detail";
import ProjectPostFooter from "../components/footer/pj-post-footer";
import ProjectHeader from "../components/headers/project-header";
import SpinnerLoading from "../components/loading/spinner";
import ProductTable from "../components/product-table/product-table";
import { GetProjectByDirectLinkData, GetProjectByDirectLinkVars, GetProjectProductsData, GET_PROJECT_BY_DIRECT_LINK, GET_PROJECT_PRODUCT } from "../graphql/queries/project";
import { ProjectInterface, ProjectProduct } from "../types/interfaces/project";

function ProjectScreen({ route }: any) {
    const [project, setProject] = useState<ProjectInterface>()
    const [products, setProducts] = useState<ProjectProduct[]>([])

    const { data, loading, error } = useQuery<GetProjectByDirectLinkData, GetProjectByDirectLinkVars>(GET_PROJECT_BY_DIRECT_LINK, {
        variables: {
            link: route.params.link
        },
        fetchPolicy: 'network-only'
    })

    const [getProducts, { data: productsData }] = useLazyQuery<GetProjectProductsData>(GET_PROJECT_PRODUCT, {
        fetchPolicy: 'network-only'
    })


    useEffect(() => {
        if (data) {
            setProject(data.project)
            getProducts({ variables: { project: data.project._id } })
        }
    }, [data, error])

    useEffect(() => {
        if(productsData) {
            setProducts(productsData.products)
        }
    }, [productsData])

    if (loading || !project) {
        return <SpinnerLoading height={550} />
    }

    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#ffb41f' }} />
            <SafeAreaView style={{
                flex: 1
            }}>
                <ProjectHeader />
                <ScrollView style={{ flex: 1 }}>
                    <ImageCarousel images={project.media.images} />
                    <ProjectDetail data={project} />
                    <ProductTable products={products}/>
                </ScrollView>
            </SafeAreaView>
        </Fragment>
    );
}

export default ProjectScreen;
