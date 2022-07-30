import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Image, Modal, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { ApartmentType, BusinessPremisesType, Direction, Furniture, HouseType, LandType, LegalDocuments, OwnerType, RealEstateCategory, RealEstateStatus, RealEstateType } from "../../types/enums/realEstate";
import { ProjectInterface } from "../../types/interfaces/project";
import { Address, Position } from "../../types/interfaces/apartment";
import AddressSelector from "./address/address-selector";
import { apartmentTypeSpeaker, directionSpeaker, furnitureSpeaker, houseTypeSpeaker, landTypeSpeaker, legalDocumentsSpeaker, premisesTypeSpeaker, realEstateStatusSpeaker, userTypeSpeaker } from "../../libs/speaker";
import ImageUpload from "./image/image-upload";
import { useMutation } from "@apollo/client";
import { CREATE_APARTMENT_POST, CREATE_BUSINESS_PREMISES_POST, CREATE_HOUSE_POST, CREATE_LAND_POST, CREATE_MOTAL_POST } from "../../graphql/mutations/upload";
import axios from 'axios'
import { CloudName } from "../../constants/cloudinary";
import { failedImage, inProgressImage, successImage } from "../../constants/images";
import { useLinkTo } from "@react-navigation/native";
import UploadHeader from "../headers/upload-header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ImageResult } from "expo-image-manipulator";

interface UploadPostProps { }

export interface Post {
    title: string
    description: string
    category: RealEstateCategory | undefined
    media?: {
        images: string[]
        videos: string[]
    }
    detail: {
        position?: Position
        address?: Address
        acreage: {
            totalAcreage?: number
            usedAcreage?: number
            width?: number
            height?: number
        }
        pricing: {
            total?: number
            deposit?: number | null
        }
    }

    overview?: {
        status?: RealEstateStatus
        type?: any
        numberOfBedrooms?: number
        numberOfBathrooms?: number
        balconyDirection?: Direction | null
        doorDirection?: Direction | null
        legalDocuments?: LegalDocuments | null
        furniture?: Furniture | null
        numberOfFloors?: number
        frontispiece?: boolean | null
        noHau?: boolean | null
        carAlley?: boolean | null
    }

    virtual3DLink?: string | null
    googleMapsLink?: string | null
}

const initialState: Post = {
    title: "",
    description: "",
    category: undefined,
    detail: {
        address: undefined,
        acreage: {
            totalAcreage: undefined
        },
        pricing: {
            total: undefined
        },
    },
    overview: {},
    virtual3DLink: null,
    googleMapsLink: null
}

const UploadPost: FunctionComponent<UploadPostProps> = () => {
    const [images, setImages] = useState<ImageResult[]>([]);
    const [post, setPost] = useState<Post>(initialState)
    const [postType, setPostType] = useState<RealEstateType | undefined>()

    const [typeItems, setTypeItems] = useState<{ label: string, value: string }[]>([])

    const [result, setResult] = useState({
        isUploading: false,
        active: false,
        message: '',
        status: 0
    })

    const [createApartment, { data: createApartmentData, error: createApartmentErr }] = useMutation(CREATE_APARTMENT_POST)
    const [createHouse, { data: createHouseData, error: createHouseErr }] = useMutation(CREATE_HOUSE_POST)
    const [createLand, { data: createLandData, error: createLandErr }] = useMutation(CREATE_LAND_POST)
    const [createBusinessPremises, { data: createBusinessPremisesData, error: createBusinessPremisesErr }] = useMutation(CREATE_BUSINESS_PREMISES_POST)
    const [createMotal, { data: createMotalData, error: createMotalErr }] = useMutation(CREATE_MOTAL_POST)

    const linkTo = useLinkTo()

    useEffect(() => {
        // Get post types
        switch (postType) {
            case RealEstateType.CanHo:
                setTypeItems(Object.keys(ApartmentType).map((type => {
                    return {
                        label: apartmentTypeSpeaker(type),
                        value: type
                    }
                })))
                return;

            case RealEstateType.NhaO:
                setTypeItems(Object.keys(HouseType).map((type => {
                    return {
                        label: houseTypeSpeaker(type),
                        value: type
                    }
                })))
                return;

            case RealEstateType.Dat:
                setTypeItems(Object.keys(LandType).map((type => {
                    return {
                        label: landTypeSpeaker(type),
                        value: type
                    }
                })))
                return;

            case RealEstateType.VanPhong:
                setTypeItems(Object.keys(BusinessPremisesType).map((type => {
                    return {
                        label: premisesTypeSpeaker(type),
                        value: type
                    }
                })))
                return;

            default:
                return;
        }
    }, [postType])


    useEffect(() => {
        // Handle mutation data
        if (createApartmentData || createHouseData || createLandData || createBusinessPremisesData || createMotalData) {
            setResult({
                status: 1,
                message: 'Đăng tin thành công, quản trị viên sẽ tiến hành duyệt bài',
                active: true,
                isUploading: false
            })
        }
    }, [createApartmentData, createBusinessPremisesData, createHouseData, createLandData, createMotalData])

    useEffect(() => {
        // Handle mutation error
        if (createApartmentErr || createHouseErr || createLandErr || createBusinessPremisesErr || createMotalErr) {
            setResult({
                status: -1,
                message: 'Đăng tin thất bại, vui lòng thử lại',
                active: true,
                isUploading: false
            })
        }
    }, [createApartmentErr, createBusinessPremisesErr, createHouseErr, createLandErr, createMotalErr])

    const onUploadImage = useCallback(async () => {
        try {
            if (images.length === 0) {
                setResult(s => ({
                    ...s,
                    active: true,
                    message: 'Chưa chọn hình ảnh',
                    status: -1
                }))
                return null
            }

            let formData = new FormData()

            const presets = Promise.all(images.map(async image => {
                try {
                    let base64Img = `data:image/jpg;base64,${image.base64}`;

                    formData.append("file", base64Img)
                    formData.append("upload_preset", "realestate")
                    const res = await axios.post(`https://api.cloudinary.com/v1_1/${CloudName}/image/upload`, formData)

                    return res.data?.secure_url
                } catch (error) {
                    return undefined;
                }
            }))

            return presets
        } catch (error) {
            return null
        }
    }, [images])

    const activeMutation = useCallback((imagePresets: any[] | null) => {
        if (postType === "can-ho-chung-cu") {
            createApartment({
                variables: {
                    data: {
                        ...post,
                        media: {
                            images: imagePresets,
                            videos: []
                        }
                    }
                }
            })
        }

        if (postType === "nha-o") {
            createHouse({
                variables: {
                    data: {
                        ...post,
                        media: {
                            images: imagePresets,
                            videos: []
                        }
                    }
                }
            })
        }

        if (postType === "dat") {
            createLand({
                variables: {
                    data: {
                        ...post,
                        media: {
                            images: imagePresets,
                            videos: []
                        }
                    }
                }
            })
        }

        if (postType === "van-phong-mat-bang") {
            createBusinessPremises({
                variables: {
                    data: {
                        ...post,
                        media: {
                            images: imagePresets,
                            videos: []
                        }
                    }
                }
            })
        }

        if (postType === "phong-tro") {
            createMotal({
                variables: {
                    data: {
                        ...post,
                        media: {
                            images: imagePresets,
                            videos: []
                        },
                        category: "ChoThue"
                    }
                }
            })
        }
    }, [postType, post])

    const handleSubmit = useCallback(async () => {
        setResult(s => ({
            ...s,
            message: 'Đang upload, vui lòng chờ đợi trong giây lát',
            active: true,
            isUploading: true
        }))
        const imagePresets = await onUploadImage()

        if (imagePresets) {
            activeMutation(imagePresets)
        }

    }, [onUploadImage, activeMutation])

    const onSelectType = useCallback((type: RealEstateType) => {
        setPost(initialState)
        setPostType(type)
        setImages([])
    }, [])

    const onPressResult = useCallback(() => {
        if (result.status === -1) {
            setResult({
                isUploading: false,
                active: false,
                message: '',
                status: 1
            })
            return;
        }

        if (result.status === 1) {
            setResult({
                isUploading: false,
                active: false,
                message: '',
                status: 1
            })
            linkTo('/home-screen')
        }

    }, [result])

    return (
        <View style={{ flex: 1 }}>
            <UploadHeader onUpload={handleSubmit} />
            <ScrollView>
                <KeyboardAwareScrollView>
                    <View style={styles.uploadItem}>
                        <Text style={styles.itemTitle}>Loại bất động sản</Text>
                        <View style={styles.uploadContent}>
                            <RNPickerSelect
                                value={postType}
                                onValueChange={(value) => onSelectType(value)}
                                placeholder={{
                                    label: "Chọn loại bất động sản * ...",
                                    value: undefined
                                }}
                                style={{
                                    viewContainer: {
                                        borderWidth: 1,
                                        paddingVertical: Platform.OS === "android" ? 0 : 12,
                                        paddingHorizontal: Platform.OS === "android" ? 8 : 20,
                                        borderRadius: 8,
                                        borderColor: "#dcdcdc"
                                    }
                                }}
                                items={[
                                    { label: 'Căn hộ/Chung cư', value: RealEstateType.CanHo },
                                    { label: 'Nhà ở', value: RealEstateType.NhaO },
                                    { label: 'Đất', value: RealEstateType.Dat },
                                    { label: 'Văn phòng', value: RealEstateType.VanPhong },
                                    { label: 'Phòng trọ', value: RealEstateType.PhongTro },
                                ]}

                            />
                        </View>
                    </View>
                    {postType
                        && (
                            <View style={styles.uploadItem}>
                                <Text style={styles.itemTitle}>Danh mục bất động sản</Text>
                                <View style={styles.uploadContent}>
                                    <View style={styles.categories}>
                                        {postType !== RealEstateType.PhongTro
                                            && (
                                                <Pressable
                                                    style={[styles.category, { backgroundColor: post.category === RealEstateCategory.MuaBan ? "#f93707" : "#eee" }]}
                                                    onPress={() => setPost(s => ({ ...s, category: RealEstateCategory.MuaBan }))}
                                                >
                                                    <Text style={{ color: post.category === RealEstateCategory.MuaBan ? "#fff" : "#222" }}>Mua bán</Text>
                                                </Pressable>
                                            )
                                        }
                                        <Pressable
                                            style={[styles.category, { backgroundColor: post.category === RealEstateCategory.ChoThue ? "#f93707" : "#eee" }]}
                                            onPress={() => setPost(s => ({ ...s, category: RealEstateCategory.ChoThue }))}
                                        >
                                            <Text style={{ color: post.category === RealEstateCategory.ChoThue ? "#fff" : "#222" }}>Cho thuê</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        )
                    }
                    {post.category
                        && (
                            <View>
                                <View style={styles.uploadItem}>
                                    <Text style={styles.itemTitle}>Thông tin bất động sản</Text>
                                    <View style={[styles.uploadContent, { flexDirection: 'row', flexWrap: 'wrap' }]}>
                                        <View style={{ width: '50%', paddingHorizontal: 3, marginBottom: 12 }}>
                                            <TextInput
                                                style={[styles.input, {
                                                    borderColor: (!post.detail.pricing.total || post.detail.pricing.total === 0) ? "#fc7777" : "#dcdcdc",
                                                }]}
                                                placeholder="Giá *"
                                                value={String((!post.detail.pricing.total || post.detail.pricing.total == 0) ? "" : post.detail.pricing.total)}
                                                keyboardType="number-pad"
                                                onChangeText={(text) => setPost(s => ({ ...s, detail: { ...s.detail, pricing: { ...s.detail.pricing, total: Number(text) } } }))}
                                            />
                                        </View>
                                        <View style={{ width: '50%', paddingHorizontal: 3, marginBottom: 12 }}>
                                            <TextInput
                                                style={[styles.input]}
                                                placeholder="Đặt cọc"
                                                value={String((!post.detail.pricing.deposit || post.detail.pricing.deposit === 0) ? "" : post.detail.pricing.deposit)}
                                                keyboardType="number-pad"
                                                onChangeText={(text) => setPost(s => ({ ...s, detail: { ...s.detail, pricing: { ...s.detail.pricing, deposit: Number(text) } } }))}
                                            />
                                        </View>
                                        {(postType !== RealEstateType.PhongTro)
                                            && (
                                                <View style={{ width: '50%', paddingHorizontal: 3, marginBottom: 12 }}>
                                                    <TextInput
                                                        style={[styles.input]}
                                                        placeholder="Block/Tháp"
                                                        value={post.detail?.position?.blockName}
                                                        onChangeText={(text) => setPost(s => ({ ...s, detail: { ...s.detail, position: { ...s.detail?.position, blockName: text } } }))}
                                                    />
                                                </View>
                                            )
                                        }
                                        {(postType !== RealEstateType.PhongTro)
                                            && (
                                                <View style={{ width: '50%', paddingHorizontal: 3, marginBottom: 12 }}>
                                                    <TextInput
                                                        style={[styles.input]}
                                                        placeholder="Mã căn"
                                                        value={post.detail?.position?.code?.value}
                                                        onChangeText={(text) => setPost(s => ({ ...s, detail: { ...s.detail, position: { ...s.detail?.position, code: { value: text, showCode: true } } } }))}
                                                    />
                                                </View>
                                            )
                                        }
                                        {(postType !== RealEstateType.PhongTro && postType !== RealEstateType.Dat && postType !== RealEstateType.NhaO)
                                            && (
                                                <View style={{ width: '50%', paddingHorizontal: 3, marginBottom: 12 }}>
                                                    <TextInput
                                                        style={[styles.input]}
                                                        placeholder="Tầng số"
                                                        value={post.detail?.position?.floorNumber}
                                                        onChangeText={(text) => setPost(s => ({ ...s, detail: { ...s.detail, position: { ...s.detail?.position, floorNumber: text } } }))}
                                                    />
                                                </View>
                                            )
                                        }
                                        <AddressSelector address={post.detail.address} onChange={setPost} />
                                    </View>
                                </View>
                                <View style={styles.uploadItem}>
                                    <Text style={styles.itemTitle}>Tổng quan bất động sản</Text>
                                    <View style={[styles.uploadContent, { flexDirection: 'row', flexWrap: 'wrap' }]}>
                                        <View style={{ width: '50%', paddingHorizontal: 3, marginBottom: 12 }}>
                                            <TextInput
                                                style={[styles.input, {
                                                    borderColor: (!post.detail.acreage.totalAcreage || post.detail.acreage.totalAcreage === 0) ? "#fc7777" : "#dcdcdc",
                                                }]}
                                                placeholder="Tổng diện tích *"
                                                value={String((!post.detail.acreage.totalAcreage || post.detail.acreage.totalAcreage === 0) ? "" : post.detail.acreage.totalAcreage)}
                                                keyboardType="number-pad"
                                                onChangeText={(text) => setPost(s => ({ ...s, detail: { ...s.detail, acreage: { ...s.detail.acreage, totalAcreage: Number(text) } } }))}
                                            />
                                        </View>
                                        {postType === RealEstateType.NhaO
                                            && (
                                                <View style={{ width: '50%', paddingHorizontal: 3, marginBottom: 12 }}>
                                                    <TextInput
                                                        style={[styles.input]}
                                                        placeholder="Diện tích sử dụng"
                                                        value={String((!post.detail.acreage?.usedAcreage || post.detail.acreage?.usedAcreage === 0) ? "" : post.detail.acreage?.usedAcreage)}
                                                        keyboardType="number-pad"
                                                        onChangeText={(text) => setPost(s => ({ ...s, detail: { ...s.detail, acreage: { ...s.detail.acreage, usedAcreage: Number(text) } } }))}
                                                    />
                                                </View>
                                            )
                                        }
                                        {(postType === RealEstateType.NhaO || postType === RealEstateType.Dat)
                                            && (
                                                <View style={{ width: '50%', paddingHorizontal: 3, marginBottom: 12 }}>
                                                    <TextInput
                                                        style={[styles.input]}
                                                        placeholder="Chiều ngang"
                                                        value={String((!post.detail.acreage?.width || post.detail.acreage?.width === 0) ? "" : post.detail.acreage?.width)}
                                                        keyboardType="number-pad"
                                                        onChangeText={(text) => setPost(s => ({ ...s, detail: { ...s.detail, acreage: { ...s.detail.acreage, width: Number(text) } } }))}
                                                    />
                                                </View>
                                            )
                                        }
                                        {(postType === RealEstateType.NhaO || postType === RealEstateType.Dat)
                                            && (
                                                <View style={{ width: '50%', paddingHorizontal: 3, marginBottom: 12 }}>
                                                    <TextInput
                                                        style={[styles.input]}
                                                        placeholder="Chiều dài"
                                                        value={String((!post.detail.acreage?.height || post.detail.acreage?.height === 0) ? "" : post.detail.acreage?.height)}
                                                        keyboardType="number-pad"
                                                        onChangeText={(text) => setPost(s => ({ ...s, detail: { ...s.detail, acreage: { ...s.detail.acreage, height: Number(text) } } }))}
                                                    />
                                                </View>
                                            )
                                        }
                                        {postType !== RealEstateType.PhongTro
                                            && (
                                                <View style={{ width: '50%', marginBottom: 12, paddingHorizontal: 3, }}>
                                                    <RNPickerSelect
                                                        value={post.overview?.type}
                                                        onValueChange={(value) => setPost(s => ({ ...s, overview: { ...s.overview, type: value } }))}
                                                        placeholder={{
                                                            label: "Loại hình * ...",
                                                            value: undefined
                                                        }}
                                                        style={{
                                                            viewContainer: {
                                                                borderWidth: 1,
                                                                paddingVertical: Platform.OS === "android" ? 0 : 12,
                                                                paddingHorizontal: Platform.OS === "android" ? 8 : 20,
                                                                borderRadius: 8,
                                                                borderColor: (!post.overview?.type) ? "#fc7777" : "#dcdcdc"
                                                            }
                                                        }}
                                                        items={typeItems}
                                                    />
                                                </View>
                                            )
                                        }
                                        {(postType === RealEstateType.NhaO || postType === RealEstateType.CanHo)
                                            && (
                                                <View style={{ width: '50%', paddingHorizontal: 3, marginBottom: 12 }}>
                                                    <TextInput
                                                        style={[styles.input, {
                                                            borderColor: (!post.overview?.numberOfBedrooms || post.overview?.numberOfBedrooms === 0) ? "#fc7777" : "#dcdcdc",
                                                        }]}
                                                        placeholder="Số phòng ngủ *"
                                                        value={String((!post.overview?.numberOfBedrooms || post.overview?.numberOfBedrooms === 0) ? "" : post.overview?.numberOfBedrooms)}
                                                        keyboardType="number-pad"
                                                        onChangeText={(text) => setPost(s => ({ ...s, overview: { ...s.overview, numberOfBedrooms: Number(text) } }))}
                                                    />
                                                </View>
                                            )
                                        }
                                        {(postType === RealEstateType.NhaO || postType === RealEstateType.CanHo)
                                            && (
                                                <View style={{ width: '50%', paddingHorizontal: 3, marginBottom: 12 }}>
                                                    <TextInput
                                                        style={[styles.input, {
                                                            borderColor: (!post.overview?.numberOfBathrooms || post.overview?.numberOfBathrooms === 0) ? "#fc7777" : "#dcdcdc",
                                                        }]}
                                                        placeholder="Số phòng vệ sinh *"
                                                        value={String((!post.overview?.numberOfBathrooms || post.overview?.numberOfBathrooms === 0) ? "" : post.overview?.numberOfBathrooms)}
                                                        keyboardType="number-pad"
                                                        onChangeText={(text) => setPost(s => ({ ...s, overview: { ...s.overview, numberOfBathrooms: Number(text) } }))}
                                                    />
                                                </View>
                                            )
                                        }
                                        {(postType === RealEstateType.NhaO || postType === RealEstateType.PhongTro)
                                            && (
                                                <View style={{ width: '50%', paddingHorizontal: 3, marginBottom: 12 }}>
                                                    <TextInput
                                                        style={[styles.input]}
                                                        placeholder="Tổng số tầng"
                                                        value={String((!post.overview?.numberOfFloors || post.overview?.numberOfFloors === 0) ? "" : post.overview?.numberOfFloors)}
                                                        onChangeText={(text) => setPost(s => ({ ...s, overview: { ...s.overview, numberOfFloors: Number(text) } }))}
                                                    />
                                                </View>
                                            )
                                        }
                                        <View style={{ width: '50%', marginBottom: 12, paddingHorizontal: 3 }}>
                                            <RNPickerSelect
                                                value={post.overview?.doorDirection}
                                                onValueChange={(value) => setPost(s => ({ ...s, overview: { ...s.overview, doorDirection: value } }))}
                                                placeholder={{
                                                    label: "Hướng cửa chính ...",
                                                    value: undefined
                                                }}
                                                style={{
                                                    viewContainer: {
                                                        borderWidth: 1,
                                                        paddingVertical: Platform.OS === "android" ? 0 : 12,
                                                        paddingHorizontal: Platform.OS === "android" ? 8 : 20,
                                                        borderRadius: 8,
                                                        borderColor: "#dcdcdc"
                                                    }
                                                }}
                                                items={[
                                                    { label: directionSpeaker(Direction.Bac), value: Direction.Bac },
                                                    { label: directionSpeaker(Direction.Dong), value: Direction.Dong },
                                                    { label: directionSpeaker(Direction.DongBac), value: Direction.DongBac },
                                                    { label: directionSpeaker(Direction.DongNam), value: Direction.DongNam },
                                                    { label: directionSpeaker(Direction.Nam), value: Direction.Nam },
                                                    { label: directionSpeaker(Direction.Tay), value: Direction.Tay },
                                                    { label: directionSpeaker(Direction.TayBac), value: Direction.TayBac },
                                                    { label: directionSpeaker(Direction.TayNam), value: Direction.TayNam },
                                                ]}
                                            />
                                        </View>
                                        {(postType === RealEstateType.CanHo)
                                            && (
                                                <View style={{ width: '50%', marginBottom: 12, paddingHorizontal: 3 }}>
                                                    <RNPickerSelect
                                                        value={post.overview?.balconyDirection}
                                                        onValueChange={(value) => setPost(s => ({ ...s, overview: { ...s.overview, balconyDirection: value } }))}
                                                        placeholder={{
                                                            label: "Hướng ban công ...",
                                                            value: undefined
                                                        }}
                                                        style={{
                                                            viewContainer: {
                                                                borderWidth: 1,
                                                                paddingVertical: Platform.OS === "android" ? 0 : 12,
                                                                paddingHorizontal: Platform.OS === "android" ? 8 : 20,
                                                                borderRadius: 8,
                                                                borderColor: "#dcdcdc"
                                                            }
                                                        }}
                                                        items={[
                                                            { label: directionSpeaker(Direction.Bac), value: Direction.Bac },
                                                            { label: directionSpeaker(Direction.Dong), value: Direction.Dong },
                                                            { label: directionSpeaker(Direction.DongBac), value: Direction.DongBac },
                                                            { label: directionSpeaker(Direction.DongNam), value: Direction.DongNam },
                                                            { label: directionSpeaker(Direction.Nam), value: Direction.Nam },
                                                            { label: directionSpeaker(Direction.Tay), value: Direction.Tay },
                                                            { label: directionSpeaker(Direction.TayBac), value: Direction.TayBac },
                                                            { label: directionSpeaker(Direction.TayNam), value: Direction.TayNam },
                                                        ]}
                                                    />
                                                </View>
                                            )
                                        }
                                        {(postType === RealEstateType.CanHo)
                                            && (
                                                <View style={{ width: '50%', marginBottom: 12, paddingHorizontal: 3 }}>
                                                    <RNPickerSelect
                                                        value={post.overview?.status}
                                                        onValueChange={(value) => setPost(s => ({ ...s, overview: { ...s.overview, status: value } }))}
                                                        placeholder={{
                                                            label: "Tình trạng bất động sản ...",
                                                            value: undefined
                                                        }}
                                                        style={{
                                                            viewContainer: {
                                                                borderWidth: 1,
                                                                paddingVertical: Platform.OS === "android" ? 0 : 12,
                                                                paddingHorizontal: Platform.OS === "android" ? 8 : 20,
                                                                borderRadius: 8,
                                                                borderColor: "#dcdcdc"
                                                            }
                                                        }}
                                                        items={[
                                                            { label: realEstateStatusSpeaker(RealEstateStatus.DaBanGiao), value: RealEstateStatus.DaBanGiao },
                                                            { label: realEstateStatusSpeaker(RealEstateStatus.ChuaBanGiao), value: RealEstateStatus.ChuaBanGiao },
                                                        ]}
                                                    />
                                                </View>
                                            )
                                        }
                                        {(postType !== RealEstateType.Dat)
                                            && (
                                                <View style={{ width: '50%', marginBottom: 12, paddingHorizontal: 3 }}>
                                                    <RNPickerSelect
                                                        value={post.overview?.furniture}
                                                        onValueChange={(value) => setPost(s => ({ ...s, overview: { ...s.overview, furniture: value } }))}
                                                        placeholder={{
                                                            label: "Tình trạng nội thất ...",
                                                            value: undefined
                                                        }}
                                                        style={{
                                                            viewContainer: {
                                                                borderWidth: 1,
                                                                paddingVertical: Platform.OS === "android" ? 0 : 12,
                                                                paddingHorizontal: Platform.OS === "android" ? 8 : 20,
                                                                borderRadius: 8,
                                                                borderColor: "#dcdcdc"
                                                            }
                                                        }}
                                                        items={[
                                                            { label: furnitureSpeaker(Furniture.CaoCap), value: Furniture.CaoCap },
                                                            { label: furnitureSpeaker(Furniture.DayDu), value: Furniture.DayDu },
                                                            { label: furnitureSpeaker(Furniture.HoanThien), value: Furniture.HoanThien },
                                                            { label: furnitureSpeaker(Furniture.Tho), value: Furniture.Tho },
                                                        ]}
                                                    />
                                                </View>
                                            )
                                        }
                                        <View style={{ width: '50%', marginBottom: 12, paddingHorizontal: 3 }}>
                                            <RNPickerSelect
                                                value={post.overview?.legalDocuments}
                                                onValueChange={(value) => setPost(s => ({ ...s, overview: { ...s.overview, legalDocuments: value } }))}
                                                placeholder={{
                                                    label: "Giấy tờ pháp lý ...",
                                                    value: undefined
                                                }}
                                                style={{
                                                    viewContainer: {
                                                        borderWidth: 1,
                                                        paddingVertical: Platform.OS === "android" ? 0 : 12,
                                                        paddingHorizontal: Platform.OS === "android" ? 8 : 20,
                                                        borderRadius: 8,
                                                        borderColor: "#dcdcdc"
                                                    }
                                                }}
                                                items={[
                                                    { label: legalDocumentsSpeaker(LegalDocuments.DaCoSo), value: LegalDocuments.DaCoSo },
                                                    { label: legalDocumentsSpeaker(LegalDocuments.DangChoSo), value: LegalDocuments.DangChoSo },
                                                    { label: legalDocumentsSpeaker(LegalDocuments.GiayToKhac), value: LegalDocuments.GiayToKhac },
                                                ]}
                                            />
                                        </View>
                                        {(postType === RealEstateType.NhaO || postType === RealEstateType.Dat)
                                            && (
                                                <View style={{ width: '50%', marginBottom: 12, paddingHorizontal: 3 }}>
                                                    <RNPickerSelect
                                                        value={post.overview?.frontispiece}
                                                        onValueChange={(value) => setPost(s => ({ ...s, overview: { ...s.overview, frontispiece: value } }))}
                                                        placeholder={{
                                                            label: "Nhà mặt tiền ...",
                                                            value: undefined
                                                        }}
                                                        style={{
                                                            viewContainer: {
                                                                borderWidth: 1,
                                                                paddingVertical: Platform.OS === "android" ? 0 : 12,
                                                                paddingHorizontal: Platform.OS === "android" ? 8 : 20,
                                                                borderRadius: 8,
                                                                borderColor: "#dcdcdc"
                                                            }
                                                        }}
                                                        items={[
                                                            { label: 'Nhà mặt tiền', value: true },
                                                            { label: 'Không đề cập', value: false }
                                                        ]}
                                                    />
                                                </View>
                                            )
                                        }
                                        {(postType === RealEstateType.NhaO || postType === RealEstateType.Dat)
                                            && (
                                                <View style={{ width: '50%', marginBottom: 12, paddingHorizontal: 3 }}>
                                                    <RNPickerSelect
                                                        value={post.overview?.noHau}
                                                        onValueChange={(value) => setPost(s => ({ ...s, overview: { ...s.overview, noHau: value } }))}
                                                        placeholder={{
                                                            label: "Nở hậu ...",
                                                            value: undefined
                                                        }}
                                                        style={{
                                                            viewContainer: {
                                                                borderWidth: 1,
                                                                paddingVertical: Platform.OS === "android" ? 0 : 12,
                                                                paddingHorizontal: Platform.OS === "android" ? 8 : 20,
                                                                borderRadius: 8,
                                                                borderColor: "#dcdcdc"
                                                            }
                                                        }}
                                                        items={[
                                                            { label: 'Nở hậu', value: true },
                                                            { label: 'Không đề cập', value: false }
                                                        ]}
                                                    />
                                                </View>
                                            )
                                        }
                                        {(postType === RealEstateType.NhaO || postType === RealEstateType.Dat)
                                            && (
                                                <View style={{ width: '50%', marginBottom: 12, paddingHorizontal: 3 }}>
                                                    <RNPickerSelect
                                                        value={post.overview?.carAlley}
                                                        onValueChange={(value) => setPost(s => ({ ...s, overview: { ...s.overview, carAlley: value } }))}
                                                        placeholder={{
                                                            label: "Hẻm xe hơi ...",
                                                            value: undefined
                                                        }}
                                                        style={{
                                                            viewContainer: {
                                                                borderWidth: 1,
                                                                paddingVertical: Platform.OS === "android" ? 0 : 12,
                                                                paddingHorizontal: Platform.OS === "android" ? 8 : 20,
                                                                borderRadius: 8,
                                                                borderColor: "#dcdcdc"
                                                            }
                                                        }}
                                                        items={[
                                                            { label: 'Hẻm xe hơi', value: true },
                                                            { label: 'Không đề cập', value: false }
                                                        ]}
                                                    />
                                                </View>
                                            )
                                        }
                                    </View>
                                </View>

                                <View style={styles.uploadItem}>
                                    <Text style={styles.itemTitle}>Chi tiết bài đăng</Text>
                                    <View style={styles.uploadContent}>
                                        <View style={{ width: '100%', marginBottom: 12 }}>
                                            <TextInput
                                                style={[styles.input, {
                                                    borderColor: !post.title ? "#fc7777" : "#dcdcdc",
                                                }]}
                                                placeholder="Tiêu đề tin đăng *"
                                                value={post.title}
                                                onChangeText={(text) => setPost(s => ({ ...s, title: text }))}
                                            />
                                        </View>
                                        <View style={{ width: '100%', marginBottom: 12 }}>
                                            <TextInput
                                                style={[styles.multiInput, {
                                                    borderColor: !post.description ? "#fc7777" : "#dcdcdc",
                                                }]}
                                                multiline
                                                placeholder="Nội dung bài đăng *"
                                                value={post.description}
                                                onChangeText={(text) => setPost(s => ({ ...s, description: text }))}
                                            />
                                        </View>
                                        <View style={{ width: '100%', marginBottom: 12 }}>
                                            <TextInput
                                                style={[styles.input]}
                                                placeholder="Link Google Maps"
                                                value={post.googleMapsLink || undefined}
                                                onChangeText={(text) => setPost(s => ({ ...s, googleMapsLink: text }))}
                                            />
                                        </View>
                                        <View style={{ width: '100%', marginBottom: 12 }}>
                                            <TextInput
                                                style={[styles.input]}
                                                placeholder="Link thực tế ảo 3D"
                                                value={post.virtual3DLink || undefined}
                                                onChangeText={(text) => setPost(s => ({ ...s, virtual3DLink: text }))}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.uploadItem}>
                                    <Text style={styles.itemTitle}>Hình ảnh bất động sản </Text>
                                    <View style={styles.uploadContent}>
                                        <ImageUpload images={images} setImages={setImages} />
                                    </View>
                                </View>
                            </View>
                        )
                    }

                </KeyboardAwareScrollView>
            </ScrollView>
            <Modal visible={result.active}>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#ffb41f' }} />
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.result}>
                        <View style={styles.resultImage}>
                            <Image
                                source={result.status < 0 ? failedImage : (result.status < 1 ? inProgressImage : successImage)}
                                style={{
                                    resizeMode: "contain",
                                    flex: 1,
                                    width: undefined,
                                    height: undefined
                                }}
                            />
                        </View>
                        <View style={styles.resultTextArea}>
                            <Text style={styles.resultTxt}>
                                {result.message}
                            </Text>
                            <View>
                                {result.status === 0
                                    ? <ActivityIndicator />
                                    : (
                                        result.status === 1
                                            ? (
                                                <TouchableOpacity
                                                    style={[styles.resultBtn, { backgroundColor: "#f93707" }]}
                                                    onPress={() => onPressResult()}
                                                >
                                                    <Text style={{ color: "#fff", textAlign: 'center' }}>Quay trờ lại trang chủ</Text>
                                                </TouchableOpacity>
                                            )
                                            : (
                                                <TouchableOpacity
                                                    style={[styles.resultBtn, { backgroundColor: "#ffb41f" }]}
                                                    onPress={() => onPressResult()}
                                                >
                                                    <Text style={{ color: "#fff", textAlign: 'center' }}>Thử lại</Text>
                                                </TouchableOpacity>
                                            )
                                    )
                                }
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>
        </View>

    );
}

const styles = StyleSheet.create({
    uploadItem: {
        marginTop: 12,
        backgroundColor: "#fff",
        padding: 12
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8
    },
    uploadContent: {
        marginTop: 12
    },
    categories: {
        flexDirection: 'row'
    },
    category: {
        marginRight: 12,
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 24,
        backgroundColor: "#eee"
    },
    input: {
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderColor: "#dcdcdc"
    },
    multiInput: {
        minHeight: 200,
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderColor: "#dcdcdc"
    },
    result: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff"
    },
    resultImage: {
        height: 225,
        width: '100%'
    },
    resultTextArea: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 32,
        minHeight: 300
    },
    resultTxt: {
        fontWeight: '500',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    resultBtn: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8
    }
})

export default UploadPost;