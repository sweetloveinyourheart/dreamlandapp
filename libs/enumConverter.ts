export function typenameToEnum(type: string | undefined) {
    switch (type) {
        case "Apartment":
            return "CanHo"
        case "House":
            return "NhaO"
        case "Land":
            return "Dat"
        case "BusinessPremises":
            return "VanPhong"
        case "Motal":
            return "PhongTro"

        default:
            return ""
    }
}

export function enumToTypename(type: string | undefined) {
    switch (type) {
        case "CanHo":
            return "Apartment"
        case "NhaO":
            return "House"
        case "Dat":
            return "Land"
        case "VanPhong":
            return "BusinessPremises"
        case "PhongTro":
            return "Motal"

        default:
            return ""
    }
}