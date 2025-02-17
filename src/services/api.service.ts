import axios, {InternalAxiosRequestConfig} from "axios";
import {ITokensWithUser} from "@/models/ITokensWithUser";
import {setCookies, getCookiesAccessToken, getCookiesRefreshToken} from "@/server-actions/serverActions";
import {IUser} from "@/models/IUser";
import {ITokens} from "@/models/ITokens";
import {IUsersResponse} from "@/models/IUsersResponse";
import {IRecipesResponse} from "@/models/IRecipesResponse";
import {IRecipe} from "@/models/IRecipe";
import {ISearchResponse} from "@/models/ISearchResponse";


type LoginProps = {
    username: string;
    password: string;
    expiresInMins: number;
}


const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com/auth',
    headers: {}
});


axiosInstance.interceptors.request.use(async (requestObject: InternalAxiosRequestConfig<unknown>): Promise<InternalAxiosRequestConfig<unknown>> => {
    if (requestObject.method?.toUpperCase() === 'GET') {
        const token = await getCookiesAccessToken(); // Твой токен
        console.log("Токен из куков в интерсепторс:", token); // Проверяем токен
        requestObject.headers.Authorization = 'Bearer ' + token;
    }
    return requestObject;
})


export const login = async ({username, password, expiresInMins}: LoginProps): Promise<ITokensWithUser> => {
    const {data: tokenWithUser} = await axiosInstance.post('/login', {username, password, expiresInMins});
    console.log('LOGIN tokenWithUser:',tokenWithUser);
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


export const refresh = async ():Promise<ITokens> => {
    const refToken = await getCookiesRefreshToken();
    console.log("refresh токен пришел",refToken);
    const {data} = await axiosInstance.post('/refresh', {refreshToken: refToken, expiresInMins: 60});
    console.log('DATA refresh:',data);
    const iTokens: ITokens = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
    }
    console.log('iTokens refresh:',iTokens);
    await setCookies(iTokens, false);
    console.log("Токены обновлены refresh", iTokens);
    return iTokens;
}


export const getUser = async (id: string):Promise<IUser> => {
    const {data} = await axiosInstance.get<IUser>('/users/' + id);
    console.log('getUser:',data);
    return data;
}



//AXIOS с 401----------------------------------------------------------------------------
// export const getResourcesUsers = async (page: string, limit: number) => {
//     const skip: number = limit * (+page) - limit;
//     console.log(skip);
//
//     try {
//         const response = await axiosInstance.get<IUsersResponse>('/users' + '?skip=' + skip);
//         return response.data;
//
//     } catch (error) {
//         if (error instanceof AxiosError) {
//             if (error.response && error.response.status === 401) {
//                 console.log("Токен истек, пробуем обновить");
//
//                 // Обновляем токен (функция refreshToken)
//                 const newToken = await refresh(); // Получаем новый токен
//                 console.log('newToken', newToken);
//                 // Сохраняем новый токен в куки
//                 // await setCookies({ accessToken: newToken });
//
//                 // Повторяем запрос с новым токеном
//                 const response = await axiosInstance.get<IUsersResponse>('/users' + '?skip=' + skip, {
//                     headers: {Authorization: `Bearer ${newToken}`},
//                 });
//
//                 return response.data;
//             }
//         }
//
//         throw error; // Другие ошибки выбрасываем дальше
//     }
// };


// AXIOS----------------------------------------------------------------------------
export const getResourcesUsers = async (page: number, limit: number):Promise<IUsersResponse> => {
    const skip: number = limit * page - limit;
    const {data: data} = await axiosInstance.get<IUsersResponse>('/users?skip=' + skip + '&limit=' + limit);
    console.log('getResourcesUsers:',data);
    return data;
}


// FETCH---------------------------------------------------------------------------
// export const getResourcesUsers = async (page: string, limit: number) => {
//     const skip = limit * (+page) - limit;
//     const token = await getCookies(); // Твой токен
//     console.log("Токен из куков:", token); // Проверяем токен
//     const response = await fetch(`https://dummyjson.com/auth/users?skip=${skip}`, {
//         method: 'GET',
//         headers: { Authorization: `Bearer ${token}` }
//     });
//
//     const data = await response.json();
//     console.log(data);
//     return data;
// };



export const getRecipe = async (id: string):Promise<IRecipe> => {
    const {data} = await axiosInstance.get<IRecipe>('/recipes/' + id);
    console.log('getRecipe:',data);
    return data;
}


export const getResourcesRecipes = async (page: number, limit: number):Promise<IRecipesResponse> => {
    const skip: number = limit * page - limit;
    const {data: data} = await axiosInstance.get<IRecipesResponse>('/recipes?skip=' + skip + '&limit=' + limit);
    return data;
}


export const getRecipesTag = async (tagValue: string):Promise<IRecipe[]> => {
    const {data: {recipes: tags}} = await axiosInstance.get<IRecipesResponse>('/recipes/tag/' + tagValue);
    console.log(tags);
    return tags;
}

export const getSearch = async (inputValue: string, page: string):Promise<IRecipe[] | IUser[] | undefined> => {
    const{data} = await axiosInstance.get<ISearchResponse>('/' + page + '/search?q=' + inputValue);
    if ('recipes' in data) {
        console.log('getSearch recipes:',data.recipes);
        return data.recipes;
    }

    if ('users' in data) {
        console.log('getSearch users:',data.users);
        return data.users;
    }

    return [];
}

export const getSearchId = async (id: string, page: string):Promise<IRecipe[] | IUser[] | undefined> => {
    const{data} = await axiosInstance.get('/' + page + '/' + id);
    console.log(data);
    return data ? [data] : [];
}




