import { FunctionComponent, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { RealEstateCategory } from "../../types/enums/realEstate";
import Search from "../search/search";
import { useNavigation } from "@react-navigation/native";

interface RSBrowseHeaderProps { }

const RSBrowseHeader: FunctionComponent<RSBrowseHeaderProps> = () => {
    
    const navigation = useNavigation()

    const onSearch = useCallback((category: RealEstateCategory, search: string) => {
        // @ts-ignore
        navigation.navigate('search-screen', { category, search })
    }, [])

    return (
        <View style={styles.container}>
            <Search onSearch={onSearch}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: "#ffb41f",
        alignItems: 'center',
        paddingHorizontal: 12,
        flexDirection: 'row'
    }
})

export default RSBrowseHeader;