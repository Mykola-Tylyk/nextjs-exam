import {IUser} from "@/models/IUser";
import {IRecipe} from "@/models/IRecipe";


export interface ISearchResponse {
    users?: IUser[];
    recipes?: IRecipe[];
    total: number;
    skip: number;
    limit: number;
}