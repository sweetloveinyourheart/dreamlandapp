import { FunctionComponent, useCallback, useState } from "react";
import { Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Address } from "../../../types/interfaces/apartment";
import AddressFilter from "../../filters/items/address";

interface AddressSelectorProps {
    address?: Address
    onChange: any
}

const AddressSelector: FunctionComponent<AddressSelectorProps> = ({ address, onChange }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const onSelectAddress = useCallback((province: string | undefined, district: string | undefined, ward: string | undefined) => {
        onChange((s: any) => ({
            ...s,
            detail: {
                ...s.detail,
                address: {
                    ...s.detail.address,
                    province,
                    district,
                    ward
                }
            }
        }))
    }, [onChange])

    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <TouchableOpacity
                onPress={() => setModalVisible(s => !s)}
                style={{
                    width: '100%', 
                    marginBottom: 12, 
                    borderWidth: 1,
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                    borderColor: (!address?.province || !address?.district || !address?.ward) ? "#f30606" : "#dcdcdc"
                }}>
                {address
                    ? (<Text>{address.province ?? "Tỉnh"} - {address.district ?? "Quận/Huyện"} - {address.ward ?? "Xã/Phường"}</Text>)
                    : (<Text style={{ color: "#777" }}>Tỉnh - Quận/Huyện - Xã/Phường</Text>)
                }
            </TouchableOpacity>
            <View style={{ width: '50%', paddingHorizontal: 3, marginBottom: 12 }}>
                <TextInput
                    style={{
                        borderWidth: 1,
                        paddingVertical: 12,
                        paddingHorizontal: 20,
                        borderRadius: 8,
                        borderColor: (!address?.street) ? "#f30606" : "#dcdcdc"
                    }}
                    placeholder="Tên đường *"
                    value={address?.street}
                    onChangeText={(text) => onChange((s: any) => ({ ...s, detail: { ...s.detail, address: { ...s.detail.address, street: text } } }))}
                />
            </View>
            <View style={{ width: '50%', paddingHorizontal: 3, marginBottom: 12 }}>
                <TextInput
                    style={{
                        borderWidth: 1,
                        paddingVertical: 12,
                        paddingHorizontal: 20,
                        borderRadius: 8,
                        borderColor: "#dcdcdc"
                    }}
                    placeholder="Số nhà"
                    value={address?.houseNumber}
                    onChangeText={(text) => onChange((s: any) => ({ ...s, detail: { ...s.detail, address: { ...s.detail.address, houseNumber: text } } }))}
                />
            </View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <SafeAreaView style={{ flex: 0, backgroundColor: '#ffb41f' }} />
                <AddressFilter
                    onSelected={onSelectAddress}
                    onCloseSelector={() => setModalVisible(false)}
                />
            </Modal>
        </View>
    );
}

export default AddressSelector;