import axios, {InternalAxiosRequestConfig} from "axios";
import {ITokensWithUser} from "@/models/ITokensWithUser";
import {setCookies, getCookiesAccessToken, getCookiesRefreshToken} from "@/server-actions/serverActions";
import {IUser} from "@/models/IUser";
import {ITokens} from "@/models/ITokens";
import {IUsersResponse} from "@/models/IUsersResponse";
import {IRecipesResponse} from "@/models/IRecipesResponse";
import {IRecipe} from "@/models/IRecipe";
import {ISearchResponse} from "@/models/ISearchResponse";
import {redirect} from "next/navigation";


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
        const token = await getCookiesAccessToken();
        requestObject.headers.Authorization = 'Bearer ' + token;
    }
    return requestObject;
})


export const login = async ({username, password, expiresInMins}: LoginProps): Promise<ITokensWithUser> => {
    const {data: tokenWithUser} = await axiosInstance.post('/login', {username, password, expiresInMins});
    console.log('LOGIN tokenWithUser:', tokenWithUser);
    await setCookies(tokenWithUser, true);
    return tokenWithUser;
}



export const getAuthUser = async () => {
    const {data: {image}} = await axiosInstance.get<IUser>('/me');
    return image;
}


export const refresh = async () => {
    try {
        const response = await axiosInstance.get('me');
        console.log('RESPONSE STATUS:', response.status);
        return response.status;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            try {
                const refToken = await getCookiesRefreshToken();

                const response = await axiosInstance.post('/refresh', {refreshToken: refToken, expiresInMins: 2});

                const status = response.status;
                console.log('REFRESH STATUS:', status);

                const iTokens: ITokens = {
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken,
                }
                await setCookies(iTokens, false);
                return iTokens;
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    console.error('Ошибка обновления токенов:', error.response.status);

                    if (error.response.status === 401 || error.response.status === 403) {
                        redirect('/login');
                    }
                    throw error.response;
                }else {
                    redirect('/login');
                }
            }
        }
    }
}


export const getUser = async (id: string): Promise<IUser> => {
    const {data} = await axiosInstance.get<IUser>('/users/' + id);
    return data;
}


export const getResourcesUsers = async (page: number, limit: number): Promise<IUsersResponse> => {
    const skip: number = limit * page - limit;
    const {data: data} = await axiosInstance.get<IUsersResponse>('/users?skip=' + skip + '&limit=' + limit);
    return data;
}


export const getRecipe = async (id: string): Promise<IRecipe> => {
    const {data} = await axiosInstance.get<IRecipe>('/recipes/' + id);
    return data;
}


export const getResourcesRecipes = async (page: number, limit: number): Promise<IRecipesResponse> => {
    const skip: number = limit * page - limit;
    const {data: data} = await axiosInstance.get<IRecipesResponse>('/recipes?skip=' + skip + '&limit=' + limit);
    return data;
}


export const getRecipesTag = async (tagValue: string): Promise<IRecipe[]> => {
    const {data: {recipes: tags}} = await axiosInstance.get<IRecipesResponse>('/recipes/tag/' + tagValue);
    return tags;
}

export const getSearch = async (inputValue: string, page: string): Promise<IRecipe[] | IUser[] | undefined> => {
    const {data} = await axiosInstance.get<ISearchResponse>('/' + page + '/search?q=' + inputValue);
    if ('recipes' in data) {
        return data.recipes;
    }

    if ('users' in data) {
        return data.users;
    }

    return [];
}

export const getSearchId = async (id: string, page: string): Promise<IRecipe[] | IUser[] | undefined> => {
    const {data} = await axiosInstance.get('/' + page + '/' + id);
    return data ? [data] : [];
}




