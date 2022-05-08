
const DEFAULT_IMG_URL = "https://skillz4kidzmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"

export default function checkImg(link) {
    return link != null ? link : DEFAULT_IMG_URL
}