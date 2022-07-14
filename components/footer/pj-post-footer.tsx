import { useNavigation } from "@react-navigation/native";
import { FunctionComponent } from "react";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ant from 'react-native-vector-icons/AntDesign'
import { ProjectInterface } from "../../types/interfaces/project";

interface ProjectPostFooterProps {
    data: ProjectInterface
}

const ProjectPostFooter: FunctionComponent<ProjectPostFooterProps> = ({ data }) => {
    const navigation = useNavigation()

    const pressCall = () => {
        // @ts-ignore
        navigation.navigate('rs-screen', { category: 'MuaBan', project: data._id })
    }

    const pressMessage = () => {
        // @ts-ignore
        navigation.navigate('rs-screen', { category: 'ChoThue', project: data._id })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.action} onPress={pressCall}>
                <Text>
                    <Ant
                        name="isv"
                        size={20}
                        style={{ paddingRight: 2 }}
                        color="#f93707"
                    />  Tin mua bán
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.action, { borderRightWidth: 0 }]} onPress={pressMessage}>
                <Text>
                    <Ant
                        name="pay-circle-o1"
                        size={20}
                        style={{ paddingRight: 2 }}
                        color="#f93707"
                    />  Tin cho thuê
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        flexDirection: 'row',
        backgroundColor: "#fff"
    },
    action: {
        flex: 1 / 2,
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: "#dcdcdc"
    }
})

export default ProjectPostFooter;