// import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
// import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
// import {useSearchParams} from "react-router-dom";
// import {useEffect} from "react";
// import {refresh} from "../../services/api.service.ts";
// import {loadRecipes} from "../../redux/slices/recipeSlice/recipeSlice.ts";
// import RecipeSingleComponent from "../recipeSingleComponent/RecipeSingleComponent.tsx";
// import Pagination from "../pagination/Pagination.tsx";
// import Search from "../search/Search.tsx";
// import {resetSearchResults} from "../../redux/slices/searchSlice/searchSlice.ts";
//
//
// type RecipesListProps = {
//     userId?: number;
// };
//
//
// const RecipesList = async ({ userId }: RecipesListProps) => {
//
//     const {recipes, total} = useAppSelector(({recipeSlice}) => recipeSlice);
//     const dispatch = useAppDispatch();
//     const [query] = useSearchParams({page: '1'});
//     const limit = userId ? 0 : 10;
//     useEffect(() => {
//         dispatch(resetSearchResults());
//         const page = query.get('page');
//         if (page) {
//             dispatch(loadRecipes({page, limit}));
//             refresh()
//                 .then(() => dispatch(loadRecipes({page, limit})))
//                 .catch((error) => console.log(error));
//         }
//     }, [dispatch, query]);
//
//
//     const filteredRecipes = userId ? recipes.filter((recipe) => recipe.userId === userId) : recipes;


import {getResourcesRecipes} from "@/services/api.service";
import {IRecipe} from "@/models/IRecipe";
import RecipeSingleComponent from "@/components/recipeSingleComponent/RecipeSingleComponent";

const RecipesList = async ({ currentPage, limit }: { currentPage: number, limit: number }) => {
    const page = currentPage || 1;
    const data = await getResourcesRecipes(page, limit);



    return (
        <div>
            {/*{userId ? '' : <Search page={'recipe'}/>}*/}
            <hr/>
            {/*{*/}
            {/*    filteredRecipes.map((recipe) => (<RecipeSingleComponent key={recipe.id} item={recipe} userId={userId}/>))*/}
            {/*}*/}
            {
                data.recipes.map((recipe: IRecipe) => <RecipeSingleComponent key={recipe.id} item={recipe}/>)
            }

            {/*{userId ? '' : <Pagination totalPages={Math.ceil(total / limit)}/>}*/}
        </div>
    );
};

export default RecipesList;