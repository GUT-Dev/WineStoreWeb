import {BaseUser} from "../user/User";

export interface CustomerReview {
    user: BaseUser,
    message: string,
    rating: number,
}