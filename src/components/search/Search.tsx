import {joiResolver} from "@hookform/resolvers/joi";
import {useForm} from "react-hook-form";
import {ISearchProps} from "../../models/ISearchProps.ts";
import searchValidator from "../validators/search.validator.ts";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import RecipeSingleComponent from "../recipeSingleComponent/RecipeSingleComponent.tsx";
import UserSingleComponent from "../userSingleComponent/UserSingleComponent.tsx";
import {loadSearch} from "../../redux/slices/searchSlice/searchSlice.ts";


type SearchProps = {
    page: string;
}


const Search = ({page}: SearchProps) => {

    const dispatch = useAppDispatch();
    const {searchResults} = useAppSelector(({searchSlice}) => searchSlice);

    const {handleSubmit, register, formState: {errors, isValid}} = useForm<ISearchProps>({
        mode: 'all',
        resolver: joiResolver(searchValidator)
    });

    const handler = (formDataProps: ISearchProps) => {
        dispatch(loadSearch({inputValue: formDataProps.search, page}))
    };



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