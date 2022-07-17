export interface Filters {
    sweetness: string[],
    type: string[],
    price: Price
    hasDiscount?: boolean,
    includeNotVisible?: boolean
}

export interface Price {
    min: number,
    max: number,
}