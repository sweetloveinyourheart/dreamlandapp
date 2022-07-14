import { Fragment } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import UploadPost from "../components/upload/upload";

function UploadScreen() {
    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#ffb41f' }} />
            <SafeAreaView style={{ flex: 1 }}>
                <UploadPost />
            </SafeAreaView>
        </Fragment>
    );
}

export default UploadScreen;