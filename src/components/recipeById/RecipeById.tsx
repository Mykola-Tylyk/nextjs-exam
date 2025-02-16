// import {Link, useParams} from "react-router-dom";
// import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
// import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
// import {useEffect} from "react";
// import {refresh} from "../../services/api.service.ts";
// import {recipeSliceAction} from "../../redux/slices/recipeSlice/recipeSlice.ts";
// import './RecipeById.css'
//
//
// const RecipeById = () => {
//
//     const {id} = useParams();
//
//     const recipe = useAppSelector(state => state.recipeSlice.recipe);
//     const dispatch = useAppDispatch();
//
//     useEffect(() => {
//         if (id) {
//             dispatch(recipeSliceAction.loadRecipe(id));
//             refresh()
//                 .then(() => dispatch(recipeSliceAction.loadRecipe(id)))
//                 .catch((error) => console.log(error))
//         }
//     }, [dispatch, id]);

import './RecipeById.css'
import {getRecipe} from "@/services/api.service";
import Link from "next/link";

const RecipeById = async ({id}: {id: string}) => {
    const recipe = await getRecipe(id);

    return (
        <div>
            {
                recipe &&
                <div>
                    <img className={'img-recipe'} src={recipe.image} alt={recipe.name}/>
                    <p><strong>id</strong> - {recipe.id}</p>
                    <p><strong>name</strong> - {recipe.name}</p>
                    <p><strong>ingredients</strong> - {recipe.ingredients.join(', ')}</p>
                    <p><strong>prep time minutes</strong> - {recipe.prepTimeMinutes}</p>
                    <p><strong>cook time minutes</strong> - {recipe.cookTimeMinutes}</p>
                    <p><strong>servings</strong> - {recipe.servings}</p>
                    <p><strong>difficulty</strong> - {recipe.difficulty}</p>
                    <p><strong>cuisine</strong> - {recipe.cuisine}</p>
                    <p><strong>calories per serving</strong> - {recipe.caloriesPerServing}</p>
                    <p><strong>tags</strong> - {recipe.tags.join(', ')}</p>
                    <p><strong>rating</strong> - {recipe.rating}</p>
                    <p><strong>review count</strong> - {recipe.reviewCount}</p>
                    <p><strong>meal type</strong> - {recipe.mealType.join(', ')}</p>
                    <p><Link href={`/user/users/${recipe.userId}`}><strong>view user of this recipe</strong> - {recipe.userId}</Link></p>
                </div>
            }
        </div>
    );
};

export default RecipeById;