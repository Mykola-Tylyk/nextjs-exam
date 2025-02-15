

import axios, {InternalAxiosRequestConfig} from "axios";
import {ITokensWithUser} from "@/models/ITokensWithUser";
import {setCookies} from "@/server-actions/serverActions";
import {getCookie} from "cookies-next";
import {IUser} from "@/models/IUser";
import {ITokens} from "@/models/ITokens";
import {IUsersResponse} from "@/models/IUsersResponse";


type LoginProps = {
    username: string;
    password: string;
    expiresInMins: number;
}


const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com/auth',
    headers: {}
});


axiosInstance.interceptors.request.use((requestObject: InternalAxiosRequestConfig<unknown>): InternalAxiosRequestConfig<unknown> => {
    if (requestObject.method?.toUpperCase() === 'GET') {
        requestObject.headers.Authorization = 'Bearer ' + getCookie('accessToken');
    }
    return requestObject;
})


export const login = async ({username, password, expiresInMins}: LoginProps): Promise<ITokensWithUser> => {
    const {data: tokenWithUser} = await axiosInstance.post('/login', {username, password, expiresInMins});
    console.log(tokenWithUser);
    await setCookies(tokenWithUser, true);
    return tokenWithUser;
}


export const getAuthUser = async () => {
    const {data: {image}} = await axiosInstance.get<IUser>('/me');
    console.log(image);
    return image;
}



// export const getAuthUser = async () => {
//     try {
//         const { data: { image } } = await axiosInstance.get<IUser>("/me");
//         console.log(image);
//         return image;
//     } catch (error) {
//         if (axios.isAxiosError(error) && error.response?.status === 401) {
//             console.warn("Access token expired. Trying to refresh...");
//             await refresh();
//             // const newAccessToken = await refresh();
//
//             // if (newAccessToken) {
//             //     console.log('newAccessToken');
//             //     // Пробуем запрос еще раз с новым токеном
//             //     return getAuthUser();
//             // } else {
//             //     console.error("Failed to refresh token. Redirecting to login.");
//             //     return null; // Можно сделать редирект на страницу логина
//             // }
//         }
//
//         console.error("Error fetching user:", error);
//         return null;
//     }
// };


export const refresh = async () => {
    const refToken = getCookie('refreshToken');
    console.log(refToken);
    const {data} = await axiosInstance.post('/refresh', {refreshToken: refToken, expiresInMins: 2});
    const iTokens: ITokens = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
    }
    await setCookies(iTokens, false);
    console.log("Token refreshed successfully:", iTokens);
    return iTokens;
}

//
// export const getUser = async (id: string) => {
//     const {data} = await axiosInstance.get<IUser>('/users/' + id);
//     console.log(data);
//     return data;
// }
//

export const getResourcesUsers = async (page: string, limit: number) => {
    const skip: number = limit * (+page) - limit;
    console.log(skip);
    const {data: {users, total}} = await axiosInstance.get<IUsersResponse>('/users' + '?skip=' + skip);
    return {users, total};
}

//
// export const getRecipe = async (id: string) => {
//     const {data} = await axiosInstance.get<IRecipe>('/recipes/' + id);
//     console.log(data);
//     return data;
// }
//
//
// export const getResourcesRecipes = async (page: string, limit: number) => {
//     const skip: number = limit * (+page) - limit;
//     const {data: {recipes, total}} = await axiosInstance.get<IRecipesResponse>('/recipes?skip=' + skip + '&limit=' + limit);
//     return {recipes, total};
// }
//
//
// export const getRecipesTag = async (tagValue: string) => {
//     const {data: {recipes: tags}} = await axiosInstance.get<IRecipesResponse>('/recipes/tag/' + tagValue);
//     console.log(tags);
//     return tags;
// }
//
// export const getSearch = async (inputValue: string, page: string) => {
//     const{data} = await axiosInstance.get<ISearchResponse>('/' + page + '/search?q=' + inputValue);
//     if ('recipes' in data) {
//         console.log(data.recipes);
//         return data.recipes;
//     }
//
//     if ('users' in data) {
//         console.log(data.users);
//         return data.users;
//     }
//
//     return [];
// }
//
//
//
//
