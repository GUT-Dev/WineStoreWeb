import defaultImg from "../resources/default_img.png"

export default function checkImg(link) {
    return link != null ? link : defaultImg
}