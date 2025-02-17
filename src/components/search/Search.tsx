'use client'

import {joiResolver} from "@hookform/resolvers/joi";
import searchValidator from "@/validators/search.validator";
import {ISearchProps} from "@/models/ISearchProps";
import {useForm} from "react-hook-form";
import RecipeSingleComponent from "@/components/recipeSingleComponent/RecipeSingleComponent";
import UserSingleComponent from "@/components/userSingleComponent/UserSingleComponent";
import {getSearch, getSearchId} from "@/services/api.service";
import {useState} from "react";
import {IRecipe} from "@/models/IRecipe";
import {IUser} from "@/models/IUser";


type SearchProps = {
    page: string;
}


const Search = ({page}: SearchProps) => {

    const [searchResults, setSearchResults] = useState<IUser[] | IRecipe[]>([]);

    const {handleSubmit, register, formState: {errors, isValid}} = useForm<ISearchProps>({
        mode: 'all',
        resolver: joiResolver(searchValidator)
    });

    const handler = (formDataProps: ISearchProps) => {
        console.log('FORM',formDataProps);
        if (/^[a-zA-Z]+$/.test(formDataProps.search)){
            try {
                getSearch(formDataProps.search, page )
                    .then((results) => {
                        setSearchResults(results || []);
                    })
            } catch (error) {
                console.error("Search error:", error);
            }
        }else if(/^[0-9]+$/.test(formDataProps.search)){
            try {
                getSearchId(formDataProps.search, page )
                    .then((results) => {
                        setSearchResults(results || []);
                    })
            } catch (error) {
                console.error("Search error:", error);
            }
        }

    };

//   /^[a-zA-Z]+$/
//   /^[0-9]+$/

    return (
        <div>
            <form onSubmit={handleSubmit(handler)}>
                <label>
                    <input type="text" placeholder={'search'} {...register('search')}/>
                    {errors.search && <div>{errors.search.message}</div>}
                </label>
                <button disabled={!isValid}>search</button>
            </form>

            <div>
                {searchResults.map((item) =>
                    "ingredients" in item ? (
                        <RecipeSingleComponent key={item.id} item={item} />
                    ) : (
                        <UserSingleComponent key={item.id} item={item} />
                    )
                )}
            </div>
        </div>
    );
};

export default Search;


