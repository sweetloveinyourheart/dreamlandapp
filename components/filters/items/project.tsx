import { useQuery } from "@apollo/client";
import { FunctionComponent, useCallback, useEffect } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Ant from 'react-native-vector-icons/AntDesign'
import { GetAllProjectPostData, GET_ALL_PROJECT_POSTS } from "../../../graphql/queries/project";

interface ProjectListFilterProps {
    onSelect: (project: string | undefined) => void
    onCloseSelector: () => void
}

const ProjectListFilter: FunctionComponent<ProjectListFilterProps> = ({ onCloseSelector, onSelect }) => {

    const { data: projectsData, error: projectsErr } = useQuery<GetAllProjectPostData>(GET_ALL_PROJECT_POSTS, {
        notifyOnNetworkStatusChange: true
    })

    const handleBack = useCallback(() => onCloseSelector(), [])

    const onActive = useCallback((project: string | undefined) => {
        onSelect(project)
        onCloseSelector()
    }, [])

    const renderData = () => {
        let result;
        if (projectsData) {
            result = projectsData.projects.map((project, index) => {
                return (
                    <Pressable
                        style={styles.item}
                        key={index}
                        onPress={() => onActive(project._id)}
                    >
                        <Text>{project.projectName}</Text>
                    </Pressable>
                )
            })
        }
        return result
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.headerModal}>
                <Pressable style={{ width: 28 }} onPress={() => handleBack()}>
                    <Ant name={"close"} size={28} />
                </Pressable>
                <Text style={styles.headerModalTxt}> Chọn địa chỉ bất động sản </Text>
                <View style={{ width: 28 }}>
                </View>
            </View>
            <ScrollView>
                <Pressable
                    style={styles.item}
                    onPress={() => onActive(undefined)}
                >
                    <Text>{"Không áp dụng bộ lọc"}</Text>
                </Pressable>
                {renderData()}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    item: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderBottomColor: "#dcdcdc",
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerModal: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        backgroundColor: "#ffb41f",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerModalTxt: {
        fontSize: 16,
        fontWeight: '600'
    }
})

export default ProjectListFilter;