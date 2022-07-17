export interface WineTable {
    id: bigint,
    available: boolean,
    availableStatus: string,
    discount: number,
    img: string,
    name: string,
    price: number,
    priceWithSale: number,
    rating: number,
    soldAmount: number,
    visible: boolean,
}

export interface Wine extends WineTable {
    descriptions: string
    type: string
    sweetness: string
    strength: number
    sugarAmount: number
    ean: string
    brand: Brand,
    land: Land,
    region: string
    amountForSale: number,
}

export interface Brand {
    id: bigint,
    name: string,
}

export interface Land {
    id: bigint,
    name: string,
}