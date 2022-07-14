import { FunctionComponent, useState } from "react";
import { ActivityIndicator, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { WebView } from 'react-native-webview';
import Ant from 'react-native-vector-icons/AntDesign'

interface AddressViewerProps {
    uri: string
    active: boolean
    onClose: () => void
}

const AddressViewer: FunctionComponent<AddressViewerProps> = ({ uri, active, onClose }) => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <Modal
            visible={active}
            onRequestClose={onClose}
        >
            {/* <SafeAreaView style={{ flex: 0, backgroundColor: "#ffb41f" }} /> */}
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Pressable style={{ width: 28 }} onPress={() => onClose()}>
                        <Ant name={'arrowleft'} size={28} />
                    </Pressable>
                    <Text style={styles.headerTxt}> Địa chỉ bất động sản </Text>
                    <View style={{ width: 28 }}></View>
                </View>
                <WebView
                    style={styles.container}
                    source={{ uri }}
                    onLoadStart={() => setIsLoading(true)}
                    onLoadEnd={() => setIsLoading(false)}
                />
                {isLoading
                    && (
                        <View style={styles.loading}>
                            <ActivityIndicator />
                            <Text> Đang tải ... </Text>
                        </View>
                    )
                }
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        backgroundColor: "#ffb41f",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerTxt: {
        fontSize: 16,
        fontWeight: '600'
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default AddressViewer;