import { createContext, FunctionComponent, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface Ward {
    code: number
    name: string
}

export interface District {
    code: number
    wards: Ward[]
    name: string
}

export interface Provinces {
    code: number
    name: string
    districts: District[]
}

export interface GeoData {
    province?: string,
    district?: string,
    ward?: string
}

interface AddressContextType {
    provinces: Provinces[]
    getAddress: (provinceCode: number, districtCode: number, wardCode: number) => GeoData
}

const AddressContext = createContext<AddressContextType>({} as AddressContextType)

export function useAddress() { return useContext(AddressContext) }

const AddressProvider: FunctionComponent<{ children: any }> = ({ children }) => {
    const [provinces, setProvinces] = useState<Provinces[]>([])

    useEffect(() => {
        (async () => {
            const res = await fetch('https://provinces.open-api.vn/api/?depth=3')
            const result = await res.json()           
            setProvinces(result)
        })()
    }, [])

    const getAddress = useCallback((provinceCode: number, districtCode: number, wardCode: number) => {
            let address: GeoData = {};
            provinces.find(province => {
                if (province.code === provinceCode) {
                    address.province = province.name
                    province.districts.find(district => {
                        if (district.code === districtCode) {
                            address.district = district.name
                            district.wards.find(ward => {
                                if (ward.code === wardCode) {
                                    address.ward = ward.name
                                    return ward
                                }
                            })
                            return district
                        }
                    })
                    return province
                }
            })
            return address
        }, [provinces])

    const memoedValue = useMemo(() => ({
        provinces,
        getAddress
    }), [provinces])

    return (
        <AddressContext.Provider value={memoedValue}>
            {children}
        </AddressContext.Provider>
    );
}

export default AddressProvider;