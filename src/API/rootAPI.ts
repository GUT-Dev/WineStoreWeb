export const APIPath = "http://localhost:8080";

export function headerWithToken(token: string) {
    return {headers: {Authorization: 'Bearer ' + token}};
}