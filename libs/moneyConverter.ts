export function moneyConverter(value: string): string {
    const zeroGroup = (value.match(/,/g) || []).length

    switch (zeroGroup) {
        case 2:
            return value.slice(0, value.indexOf(",", 2)) + " triệu"
        case 3:
            return value.slice(0, value.indexOf(",", 3) - 1) + " tỷ"

        default:
            return value
    }
}