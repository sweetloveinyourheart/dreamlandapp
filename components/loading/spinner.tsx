import { FunctionComponent } from "react";
import { ActivityIndicator, View } from "react-native";

interface SpinnerLoadingProps {
    height: number
    bgColor?: string
}

const SpinnerLoading: FunctionComponent<SpinnerLoadingProps> = ({ height, bgColor }) => {
    return (
        <View style={{ height, backgroundColor: bgColor ?? '#eee', justifyContent: 'center' }}>
            <ActivityIndicator size="small" />
        </View>
    );
}

export default SpinnerLoading;