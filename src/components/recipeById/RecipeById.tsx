import './RecipeById.css'
import {getRecipe} from "@/services/api.service";
import Link from "next/link";
import UpdateToken from "@/components/updateToken/UpdateToken";

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
            <UpdateToken/>
        </div>
    );
};

export default RecipeById;