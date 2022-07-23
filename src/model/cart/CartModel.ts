import {WineTable} from "../wine/Products";

export interface CartModel {
    totalPrice: number,
    totalPriceWithSale: number,
    totalSalePercent: number,
    items: CartItem []
}

export interface CartItem {
    id: bigint,
    amount: number,
    available: boolean,
    wine: WineTable
}